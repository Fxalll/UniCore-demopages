<template>
  <div id="unicoreContainer">
    <!-- BIM视图盒子组件开始 -->
    <bcSet ref="bcSetId"></bcSet>
    <!-- BIM视图盒子组件结束 -->
    <!-- 属性窗口组件窗口卡片开始 -->
    <mpInfo ref="mpInfoId"></mpInfo>
    <!-- 属性窗口组件窗口卡片结束 -->
  </div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'

import bcSet from '@/components/BimCubeSet/index.vue'; //BIM视图盒子组件
import mpInfo from '@/components/modelPropertyInfo/index'; //属性窗口组件

export default {
  components: {
    bcSet, mpInfo
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

      // 初始化unicore
      let uniCore = new UniCore(config);
      uniCore.initOnlyBimMode("unicoreContainer", async () => {
        let options = {
          id: '小别墅',
          url: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/tileset.json',
          propertysURL: '../../assets/3Dtiles/sample3_方法2_小别墅属性(1)/01 小别墅.json'
        }
        //加载3dtiles
        let tileset = await uniCore.model.createTileset(options.url, options).then(cityModel => {
          this.$refs.bcSetId.show(uniCore, uniCore.position.cartesian3_2axis(cityModel.boundingSphere.center), cityModel.boundingSphere.radius * 3)

          // 开启右键菜单、点击高亮、属性property
          uniCore.interact.setTilesRightClickMenu([options], (property) => this.$refs.mpInfoId.showProps(property));
          return cityModel;
        })
        return tileset;


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