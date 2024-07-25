<template>
  <div id="unicoreContainer">
    <div id="test" @click="clickFun">你可以将任意HTML元素固定在某处</div>
  </div>
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

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      // 将HTML元素定位在某一点上
      uniCore.tip.createHtmlTip("test", [113.12098820449636, 28.256150218457687, 50], false)



    },

    /**
     * test标签的点击事件
     */
    clickFun () {
      let r = parseInt(Math.random() * 255);
      let g = parseInt(Math.random() * 255);
      let b = parseInt(Math.random() * 255);
      let mixNum = 0.2;
      const testStyle = document.querySelector('#test').style;
      testStyle.color = `rgb(${r}, ${g},${b})`
      testStyle.backgroundColor = `rgb(${r * mixNum}, ${g * mixNum},${b * mixNum})`
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
#test {
  position: absolute;
  font-size: 20px;
  background: #fff;
  border-radius: 15px;
  padding: 5px 20px;
  cursor: pointer;
  user-select: none;
  z-index: 999;
}
</style>