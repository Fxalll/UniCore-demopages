const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack');

const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    output: {
      sourcePrefix: ''
    },
    optimization: {

      runtimeChunk: "single",
      splitChunks: {
        maxSize: 1024 * 2560, // chunk 自动分割
        cacheGroups: {
          async: {
            chunks: "async",
            minChunks: 1, // 代码块至少被引用的次数
            maxInitialRequests: 3, // 设置最大的请求数
            minSize: 0, // 设置每个 chunk 最小的大小 (默认30000)，这里设置为 0，以方便测试
            automaticNameDelimiter: '~',
            priority: 9
          },
          vendors: {
            chunks: "all", // 使用 all 模式
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 下的模块
            name: "vendors", // 包命名，最终的命名要结合 output 的 chunkFilename
            minChunks: 1,
            minSize: 30000,
            priority: 10 // 设置优先级
          }
        }
      },
      usedExports: true,

      minimizer: [
        new TerserPlugin({
          parallel: true,//使用多进程并发运行以提高构建速度 Boolean|Number 默认值： true  
          terserOptions: {
            compress: {
              drop_console: true,//移除所有console相关代码；
              drop_debugger: true,//移除自动断点功能；
              pure_funcs: ["console.log", "console.error"],//配置移除指定的指令，如console.log,alert等
            },
            format: {
              comments: false,//删除注释
            },
          },
          extractComments: false,//是否将注释剥离到单独的文件中
        })
      ]
    },

    resolve: {
      alias: {},
      fallback: {
        //其他的如果不启用可以用 keyname :false，例如：crypto:false, 
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "https": false, "zlib": false, "http": false, "url": false
      },
      mainFiles: ['index', 'Cesium']
    },
    plugins: [new NodePolyfillPlugin(),
    //   new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    //   Popper: ["popper.js", "default"]
    // }),
    new CompressionPlugin({
      algorithm: 'gzip', // 使用gzip压缩
      test: /\.js$|\.html$|\.css$/, // 匹配文件名
      filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
      minRatio: 0.8, // 压缩率小于0.8才会压缩
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    }),
    // Copy Cesium Assets, Widgets, and Workers to a static directory
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
        { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' }
      ]
    }),
    new webpack.DefinePlugin({
      // Define relative base path in cesium for loading assets
      CESIUM_BASE_URL: JSON.stringify('./')
    }),

    ],
    module: {
      unknownContextRegExp: /^('|')\.\/.*?\1$/,
      unknownContextCritical: false
    },
    amd: {
      toUrlUndefined: true
    },
  }
})