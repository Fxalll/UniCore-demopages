<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import * as Cesium from 'cesium'

// 引入云配置和集成函数
import { initializeVolumetricClouds } from '@/utils/CloudConfig'

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
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");
      let viewer = uniCore.viewer;

      // --- 核心修改部分：只调用集成函数 ---
      // 可以在第二个参数中传递自定义配置，例如：
      // initializeVolumetricClouds(viewer, { cloudCover: 0.8, cloudBase: 5000 });
      initializeVolumetricClouds(viewer);

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 16700], -20, -45, 1);
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