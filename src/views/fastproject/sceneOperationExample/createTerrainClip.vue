<!--
 * @Author: 卢佳康 ljk3079960656@outlook.com
 * @Date: 2024-07-11 14:34:19
 * @LastEditors: 卢佳康 ljk3079960656@outlook.com
 * @LastEditTime: 2024-07-11 14:34:29
 * @FilePath: \vue-uni-demo\src\views\fastproject\sceneOperationExample\createTerrainClip.vue
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
      uniCore.position.buildingPosition(uniCore.viewer, [113.33725358682781, 28.631879047649946, 1700], -20, -45, 1);

      let earthPositionList = [
        uniCore.position.axis2cartesian3([113.3344684928246, 28.651326795339365, 172.87746956986445]),
        uniCore.position.axis2cartesian3([113.32630694203719, 28.648432900572512, 323.33026536760207]),
        uniCore.position.axis2cartesian3([113.32534692375877, 28.641073331311016, 215.12468698546806]),
        uniCore.position.axis2cartesian3([113.33192954275, 28.639634525064086, 222.32523043801942]),
        uniCore.position.axis2cartesian3([113.33780681708383, 28.642851075420573, 151.94046698273897]),
      ]
      uniCore.terrainClip.init(uniCore.viewer, {
        height: 100,
        splitNum: 1000,
        bottomImg: '../../assets/img/side.jpeg',
        wallImg: '../../assets/img/side2.jpeg'
      })
      uniCore.terrainClip.createTerrainClip(earthPositionList)

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