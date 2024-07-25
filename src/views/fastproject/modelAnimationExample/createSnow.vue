<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import * as Cesium from 'cesium'

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
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 7000], -20, -45, 1);

      // 设置雪花参数
      let parameter = {
        axiz: [113.12248820449636, 28.254150218457687, 26],// 位置，必填
        image: "../../../static/img/axis/x.png",// 粒子图片资源，必填
        area: [10000, 10000, 10000],// 雪花粒子范围（长宽高），必填
        snowParticleSize: 12.0,
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 1.0,
        startScale: 0.5,
        endScale: 1.0,
        emissionRate: 7000,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0)
      }
      // 创建雪花
      let snowParticlePrimitives = uniCore.particle.createSnow(parameter);

      setTimeout(() => {
        this.$message(
          { message: "执行销毁雪花程序" }
        )
        uniCore.particle.deleteParticle(snowParticlePrimitives);
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
  background: black;
}
</style>