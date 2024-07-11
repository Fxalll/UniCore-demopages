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
      window.uniCore = uniCore;

      // // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      // 示例底面模型
      let options = {
        id: '城市白膜',
        url: '../../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json'
      }
      //加载3dtiles
      uniCore.model.createTileset(options.url, options).then(entity => {
        uniCore.model.changeModelPos(entity, [113.12098820449636, 28.256150218457687, 35])
      })

      // 使该模型运动
      uniCore.model.addGltf({
        lon: 0,
        lat: 0,
        height: 0
      }, {
        id: "车",
        name: null,
        url: '../../../assets/gltf/CesiumMilkTruck.glb',
        property: null
      }).then(carModel => {
        let axis = [[113.12022464274082, 28.25619028746274], [113.12161934465712, 28.256137318482835], [113.12091905012934, 28.256699622636106], [113.1209893840498, 28.25591814354084]];
        uniCore.animation.updatePosition(axis, (resAxis, index) => {
          // 根据实时坐标修改路径和偏转角
          uniCore.model.changeModelPos(carModel, resAxis, [uniCore.animation.caluRealTimeRotate(axis, index), 0, 0]);
        }, () => { console.log("finish!") }, 5, 0.01, [carModel])
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
}
</style>