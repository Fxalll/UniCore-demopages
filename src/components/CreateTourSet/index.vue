<template>
  <div>
    <!-- 路径漫游控制组件 -->
    <el-card class="box-card">
      <div
        id="move-layer"
        class="title"
        @mousedown="mousedown"
        @mouseup="mouseup"
      >
        路径漫游控制组件
      </div>
      <hr />

      <div class="button mainButton" @click="startTour()">开始漫游</div>
      <div class="button subButton" @click="stopTour()">停止漫游</div>
      <div class="button subButton" @click="createTour()">生成路径</div>
      <div class="button" @click="outputTour()">导出路径</div>

      <el-table
        v-loading="loading"
        :data="tableData"
        :empty-text="emptyText"
        style="width: 100%; min-width: 270px"
        max-height="300px"
        highlight-current-row
        @row-dblclick="onClickRow"
      >
        <el-table-column
          label="路径名称"
          width="120"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium';

export default {

  data () {
    return {
      loading: false,
      emptyText: "暂无数据",
      tableData: [
        {
          "id": 0,
          "name": "小别墅正面",
          "lon": 113.11940255508391,
          "lat": 28.249212898163776,
          "het": 532.8610511960225,
          "heading": 0.02850198957495298,
          "pitch": -0.4866616106659656,
          "duration": 0
        },
        {
          "id": 1,
          "name": "小别墅阳台视角",
          "lon": 113.11990308228883,
          "lat": 28.25464649548724,
          "het": 170.42446096639392,
          "heading": 6.237156069448395,
          "pitch": -0.09690652304761138,
          "duration": 1
        },
        {
          "id": 2,
          "name": "小别墅楼梯间",
          "lon": 113.12039448852497,
          "lat": 28.257689305860808,
          "het": 166.45812243735554,
          "heading": 0.2685914701879204,
          "pitch": -0.15537064253674449,
          "duration": 1
        },
        {
          "id": 3,
          "name": "小别墅楼梯转向1",
          "lon": 113.12096816732621,
          "lat": 28.2577485736514,
          "het": 188.955476357591,
          "heading": 5.990164993475264,
          "pitch": -0.29828238688909736,
          "duration": 0.5
        },
        {
          "id": 4,
          "name": "小别墅楼梯转向2",
          "lon": 113.12053844001098,
          "lat": 28.25892654583714,
          "het": 114.98477429817669,
          "heading": 5.990164993734689,
          "pitch": -0.2982823840919808,
          "duration": 1
        },
        {
          "id": 5,
          "name": "小别墅楼梯转向3",
          "lon": 113.12026972769263,
          "lat": 28.259116681502093,
          "het": 124.29187525333185,
          "heading": 3.3112069923551575,
          "pitch": -0.7205216738741891,
          "duration": 1
        },
        {
          "id": 6,
          "name": "小别墅全景",
          "lon": 113.10390073265695,
          "lat": 28.28497380057851,
          "het": 2350.3451327117814,
          "heading": 2.749557781138876,
          "pitch": -0.4802634927980689,
          "duration": 3
        }
      ],
    }
  },

  methods: {

    /**
     * 开始漫游
     */
    startTour () {
      uniCore.tour.startTweensTour(this.tableData);
    },

    /**
     * 停止漫游
     */
    stopTour () {
      uniCore.tour.stopTweensTour();
    },

    /**
     * 生成路径
     */
    createTour () {

      let currentCameraSet = uniCore.position.getCurrentCameraSet();

      if (!!currentCameraSet) {
        // 创建输入框
        let ret = prompt("请输入路径内容");
        if (ret !== null && ret !== "") {

          let viewData = {};

          if (this.tableData.length === 0) {
            viewData.duration = 0;
          } else {
            let ret2 = prompt("请输入动画时间");
            ret2 = parseFloat(ret2)
            if (!isNaN(ret2) && ret2 !== null && ret2 !== "") {
              viewData.duration = ret2;
            }
          }
          viewData.id = this.tableData.length;
          viewData.name = ret;
          viewData.lon = currentCameraSet.lon;
          viewData.lat = currentCameraSet.lat;
          viewData.het = currentCameraSet.het;
          viewData.heading = currentCameraSet.heading;
          viewData.pitch = currentCameraSet.pitch;

          this.tableData.push(viewData);

        }
      }


    },

    /**
     * 删除路径
     * @param {*} index 
     * @param {*} row 
     */
    handleDelete (index, row) {
      this.loading = true;
      this.tableData.splice(index, 1)
      this.loading = false;
    },

    /**
     * 双击表格栏
     * @param {*} val 
     */
    onClickRow (val) {
      window.viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(val.lon, val.lat, val.het),
        orientation: {
          heading: val.heading, // 方向
          pitch: val.pitch, // 倾斜角度
          roll: 0
        },
        duration: 0
      });
    },

    /**
     * 导出路径
     */
    outputTour () {
      this.$message(
        { message: "所需路径已在控制台打印，使用F12查看" }
      )

      let outputData = [];
      this.tableData.forEach(e => { outputData.push(e) })
      console.log(outputData);
      return outputData;
    },










    /**
 * 鼠标与窗口拖动相关
 */
    mousedown (event, id) {
      if (document.elementFromPoint(event.clientX, event.clientY).id === 'move-layer') {
        this.selectElement = document.elementFromPoint(event.clientX, event.clientY).parentNode.parentNode;
        document.querySelectorAll('.box-card').forEach((e) => {
          e.style.zIndex = 1000;
        })
        this.selectElement.style.zIndex = 1001;
        var div1 = this.selectElement
        this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var distanceX = event.clientX - this.selectElement.offsetLeft
        var distanceY = event.clientY - this.selectElement.offsetTop
        console.log(div1);
        document.onmousemove = function (ev) {
          var oevent = ev || event
          div1.style.left = oevent.clientX - distanceX + 'px'
          div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          div1.style.cursor = 'default'
        }
      }

    },
    //鼠标抬起
    mouseup () {
      this.isMove = false;
      this.selectElement = "null"
    }



  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-card__body {
  padding: 20px 0px 0 0px;
}
::v-deep .box-card {
  position: absolute;
  top: 3%;
  left: 3%;
  width: 300px;
  z-index: 1;
  background: rgb(26 26 26 / 83%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 24px 54px 0px rgba(35, 41, 50, 0.5);
  border-radius: 15px;
  padding: 0 24px 12px 24px;
  margin-bottom: 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: none;
  user-select: none;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #fefeff;
    display: block;
    margin-left: 24px;
    margin-bottom: 10px;
    user-select: none;
    overflow: hidden;
    cursor: move;
  }

  hr {
    margin-left: 24px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #ffffff1a;
  }

  .el-table {
    border-radius: 15px;
  }

  .button {
    display: inline-flex;
    margin: 5px 10px;
    color: white;
    background: #4d4d4dd1;
    border-radius: 10px;
    padding: 7px 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .mainButton {
    background: #105bc5;
    font-weight: 700;
    padding: 7px 40px;
  }

  .subButton {
    background: #979797cc;
  }

  .mainButton:hover {
    background: #009fff;
    box-shadow: 0px 0px 54px 0px #009fffa8;
  }

  .subButton:hover {
    background: #d7d7d7cc;
    box-shadow: 0px 0px 54px 0px #d7d7d7a8;
  }
}
</style>