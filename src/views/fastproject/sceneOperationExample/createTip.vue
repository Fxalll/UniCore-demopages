<!--
 * @Author: 卢佳康 ljk3079960656@outlook.com
 * @Date: 2024-07-11 14:35:19
 * @LastEditors: 卢佳康 ljk3079960656@outlook.com
 * @LastEditTime: 2024-07-11 14:35:26
 * @FilePath: \vue-uni-demo\src\views\fastproject\sceneOperationExample\createTip.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

      // 加入普通标签
      uniCore.tip.createTip('标签组', "普通标签", [113.12380548015745, 28.255758831850005, 100], null, '#0361f3', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])

      // 加入带有点击事件的标签
      uniCore.tip.createTip('标签组', "可点击标签-1", [113.12390548015745, 28.255568831850005, 100], () => { alert("你点击了 可点击标签-1") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
      uniCore.tip.createTip('标签组', "可点击标签-2", [113.12374548015745, 28.256758831850005, 100], () => { alert("可点击标签-2 被你点击到了~") }, '#f3125f', 1, [250, 1.0, 550, 1.0], [250000, 1.0, 5500000, 0.0])
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