
<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'


export default {


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

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      /**
       * 小别墅1号示例
       */
      let options = {
        id: '小别墅1号示例',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

        uniCore.flat.init(cityLeft, {
          flatHeight: -50
        })
        let positions = [
          uniCore.position.axis2cartesian3([113.13541705128938, 28.259461504616047, 0]),
          uniCore.position.axis2cartesian3([113.10809430954443, 28.259684588881398, 0]),
          uniCore.position.axis2cartesian3([113.10814275877508, 28.25013870333492, 0]),
          uniCore.position.axis2cartesian3([113.13643819418477, 28.250298392202364, 0])
        ]

        uniCore.flat.addRegion({
          positions: positions,
          id: new Date().getTime()
        })

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