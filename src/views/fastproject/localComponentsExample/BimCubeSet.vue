<template>
  <div id="unicoreContainer">
    <!-- BIM视图盒子组件开始 -->
    <bcSet ref="bcSetId"></bcSet>
    <!-- BIM视图盒子组件结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import bcSet from '@/components/BimCubeSet/index.vue'; //BIM视图盒子组件

export default {
  components: {
    bcSet
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();
    setTimeout(() => {
      // 提示
      this.$message({
        showClose: true,
        message: '请点击模型，右键点击切换到 BIM 场景，以查看 BIM 视图盒子组件',
        duration: 0
      });
    }, 3000)
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

      // 模型示例1
      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 50])

        // 飞行定位
        uniCore.viewer.flyTo(cityLeft);
      })

      // 模型示例2
      options = {
        id: '小别墅2'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.257150218457687, 50])
      })

      // 开启右键菜单、点击高亮、属性property
      uniCore.interact.setTilesRightClickMenu([{
        id: '小别墅',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }, {
        id: '小别墅2',
        url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
        propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
      }], (property) => console.log(property), (pickObj) => console.log(pickObj), (pickObj) => this.$refs.bcSetId.show(uniCore, uniCore.position.cartesian3_2axis(pickObj.tileset.boundingSphere.center), pickObj.tileset.boundingSphere.radius * 3), () => this.$refs.bcSetId.hide());

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