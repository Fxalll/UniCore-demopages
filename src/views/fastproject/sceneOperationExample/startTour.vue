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

      this.$message({
        showClose: true,
        message: '使用键盘控制第一视角漫游，模型姿态：↑：抬头;↓：低头;←：左转;→：右转;9：顺时针旋转;0：逆时针旋转;1：加速;2：减速;3：停止运行;4：切换视角;5：模型显隐',
        duration: 0
      });

      // 初始化UniCore

      // 目前采用Cesium的地形&底图数据，这里配置Cesium的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");


      // 定义漫游参数对象
      let aircrafRoamParam = {
        // 模型路径
        modelPath: "../../../../assets/gltf/Cesium_Air.glb",
        // 模型是否显示
        modelShow: true,
        // 模型缩放比例
        modelScale: 1.0,
        // 起始位置
        startPosition: [113.12248820449636, 28.254150218457687, 500],
        // 初始漫游速度
        speed: 50,
      };

      // 执行开始飞行方法
      uniCore.tour.start(aircrafRoamParam);
      // 更改飞行视角方法（或按4键），value为'first'为第一视角，'none'为取消视角跟随
      uniCore.tour.changeView('first');
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