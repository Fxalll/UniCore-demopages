<template>
  <div id="unicoreContainer">
    <!-- 模型编辑组件开始 -->
    <amSet ref="amSetId"></amSet>
    <!-- 模型编辑组件结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import amSet from '@/components/AdjustModelSet/index.vue'; // 模型编辑组件

export default {
  components: {
    amSet
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

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      // 模型示例1
      let options = {
        id: '小别墅'
      }
      //加载3dtiles
      uniCore.model.createTileset('../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json', options).then(cityLeft => {
        uniCore.model.changeModelPos(cityLeft, [113.12099164460524, 28.256201272470424, 83])
      })

      // 模型示例2
      uniCore.model.addGltf({
        lon: 0,
        lat: 0,
        height: 0
      }, {
        id: "小别墅",
        name: null,
        url: '../../../assets/gltf/小别墅.glb',
        scale: 1.0,
        property: null
      }).then(cityModel => {
        uniCore.model.changeModelPos(cityModel, [113.12098820449636, 28.256150218457687, 50], [90, 0, 0])
      })

      this.$refs.amSetId.init(uniCore);

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