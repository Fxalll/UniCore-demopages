<!--
 * @Author: 卢佳康 ljk3079960656@outlook.com
 * @Date: 2024-07-11 14:49:11
 * @LastEditors: 卢佳康 ljk3079960656@outlook.com
 * @LastEditTime: 2024-07-11 14:49:18
 * @FilePath: \vue-uni-demo\src\views\fastproject\localComponentsExample\ModelTreeSet.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="unicoreContainer">
    <!-- 信息树窗口卡片开始 -->
    <mtSet ref="mtSetId"></mtSet>
    <!-- 信息树窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import mtSet from '@/components/ModelTreeSet/index.vue'; //模型信息树组件


export default {

  components: {
    mtSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();
  },

  // 方法集合
  methods: {

    /**
    * 通用图形引擎初始化
    */
    init () {

      // 初始化UniCore

      // 目前采用Cesium的地形&底图数据，这里配置Cesium的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      window.uniCore = uniCore;
      let viewer = uniCore.viewer;

      // 视角初始化
      uniCore.position.buildingPosition(viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      let options = {
        id: '小别墅1号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        // 绑定信息树（配合ModelTreeSet组件使用
        options.tileset = cityLeft;
        if (!!!window.nodesList) {
          window.nodesList = [];
        }
        window.nodesList.push(options)

        // 原本设计是作为开关调用的，这里使用定时器先展示功能
        setTimeout(() => {
          // 信息树初始化
          this.$refs.mtSetId.nodes = [];
          this.$refs.mtSetId.initNodes();
        }, 1000)


      })

    }

  }

}
</script>
<style scoped>
#unicoreContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
}
</style>