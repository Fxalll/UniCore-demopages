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
      })




      // 设置烟雾参数
      let parameter = {
        axiz: [113.12098820449636, 28.256000218457685, 230], // 位置，必填
        image: "../../../static/img/label/smoke.png", // 粒子图片资源，必填
        startColor: [0.3, 0.3, 0.3, 1], //开始颜色 rgba（1最大），必填
        endColor: [0, 0, 0, 0],//结束颜色 rgba（1最大），必填
        emissionRate: 5,
        gravity: 0.0,//设置重力参数
        minimumParticleLife: 1,
        maximumParticleLife: 6,
        minimumSpeed: 1.0,//粒子发射的最小速度
        maximumSpeed: 4.0,//粒子发射的最大速度
        startScale: 0.0,
        endScale: 15.0,
        particleSize: 25.0
      }
      // 创建烟雾
      let smokeParticlePrimitives = uniCore.particle.createSmoke(parameter);

      setTimeout(() => {
        this.$message(
          { message: "执行销毁烟雾程序" }
        )
        uniCore.particle.deleteParticle(smokeParticlePrimitives);
      }, 15000)


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