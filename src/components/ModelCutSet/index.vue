<template>
  <div>
    <!-- 模型剖切组件 -->
    <el-card class="box-card" v-show="isShow">
      <div
        id="move-layer"
        class="title"
        @mousedown="mousedown"
        @mouseup="mouseup"
      >
        模型剖切
      </div>
      <hr />

      <div class="block">
        <span class="demonstration">从前向后</span>
        <el-slider v-model="value1" @input="setData"></el-slider>
        <span class="demonstration">从后向前</span>
        <el-slider v-model="value2" @input="setData"></el-slider>
        <span class="demonstration">从左向右</span>
        <el-slider v-model="value3" @input="setData"></el-slider>
        <span class="demonstration">从右向左</span>
        <el-slider v-model="value4" @input="setData"></el-slider>
        <span class="demonstration">从上向下</span>
        <el-slider v-model="value5" @input="setData"></el-slider>
        <span class="demonstration">从下向上</span>
        <el-slider v-model="value6" @input="setData"></el-slider>
        <span class="demonstration">切割边缘宽度</span>
        <el-slider v-model="edgeWidth" @input="setData"></el-slider>
      </div>
    </el-card>
  </div>
</template>

<script type="text/javascript">

export default {

  data () {
    return {
      isShow: false,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0,
      value6: 0,
      edgeWidth: 0,
    }
  },

  methods: {

    init (uniCore, tileset) {
      window.uniCore = uniCore;
      this.tileset = tileset;
      this.isShow = true;
    },

    setData () {
      try {
        let option = { "fb": this.value1 / 100, "bf": this.value2 / 100, "lr": this.value3 / 100, "rl": this.value4 / 100, "tb": this.value5 / 100, "bt": this.value6 / 100, }
        window.uniCore.model.digModel(this.tileset, option, this.edgeWidth)
      } catch (error) {
        console.log(error);
      }
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

  .block {
    padding: 0px 20px;
  }

  span {
    color: #ccc;
  }
}
</style>