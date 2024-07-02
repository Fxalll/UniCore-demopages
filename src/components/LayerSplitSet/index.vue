<template>
  <div>
    <div id="slider"></div>
  </div>
</template>

<script type="text/javascript">
import * as Cesium from 'cesium'

export default {

  methods: {

    init (imageryProvider) {
      viewer.imageryLayers.addImageryProvider(imageryProvider);

      viewer.imageryLayers._layers[viewer.imageryLayers._layers.length - 1].splitDirection = 0.5



      // Sync the position of the slider with the split position
      const slider = document.getElementById("slider");
      window.viewer.scene.splitPosition =
        slider.offsetLeft / slider.parentElement.offsetWidth;

      const handler = new Cesium.ScreenSpaceEventHandler(slider);

      let moveActive = false;

      function move (movement) {
        if (!moveActive) {
          return;
        }

        const relativeOffset = movement.endPosition.x;
        const splitPosition =
          (slider.offsetLeft + relativeOffset) /
          slider.parentElement.offsetWidth;
        slider.style.left = `${100.0 * splitPosition}%`;
        window.viewer.scene.splitPosition = splitPosition;
      }

      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START);

      handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END);
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}

#slider:hover {
  cursor: ew-resize;
}
</style>