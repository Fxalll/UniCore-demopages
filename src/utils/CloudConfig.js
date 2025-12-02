// src/utils/CloudConfig.js

import * as Cesium from 'cesium'
// 导入着色器代码：现在我们从 .glsl.js 文件导入一个字符串
import VolumetricCloudsShader from '../shaders/VolumetricClouds.glsl.js'

/**
 * 默认云层配置
 */
const DEFAULT_CLOUD_CONFIG = {
  cloudCover: 0.55,       // 云量 (0.0 - 1.0)
  cloudBase: 3000,        // 云底高度 (米)
  cloudTop: 6000,         // 云顶高度 (米)
  currentWindVectorWC: new Cesium.Cartesian3(50, 0, 0) // 风速风向
};

/**
 * 初始化体积云后处理阶段
 * @param {Cesium.Viewer} viewer Cesium Viewer 实例
 * @param {Object} [options] 覆盖默认配置的选项
 * @returns {Cesium.PostProcessStage} 创建的 PostProcessStage 实例
 */
export function initializeVolumetricClouds (viewer, options = {}) {
  const config = { ...DEFAULT_CLOUD_CONFIG, ...options };

  // 预计算半径
  const earthRadius = 6378137.0;
  config.cloudBaseRadius = earthRadius + config.cloudBase;
  config.cloudTopRadius = earthRadius + config.cloudTop;

  // 1. 创建 PostProcessStage
  const cloudsStage = new Cesium.PostProcessStage({
    // 直接使用导入的 JavaScript 字符串
    fragmentShader: VolumetricCloudsShader,
    uniforms: {
      realPlanetRadius: earthRadius,
      cloudCover: config.cloudCover,
      cloudBaseRadius: config.cloudBaseRadius,
      cloudTopRadius: config.cloudTopRadius,
      windVector: config.currentWindVectorWC
    }
  });

  // 2. 添加到场景
  viewer.scene.postProcessStages.add(cloudsStage);

  // 开启地形深度检测，确保云不会穿透山体
  viewer.scene.globe.depthTestAgainstTerrain = true;

  // 3. 实时更新 Uniforms 的逻辑
  viewer.scene.preUpdate.addEventListener(() => {
    if (!cloudsStage.enabled) return;

    cloudsStage.uniforms.windVector = config.currentWindVectorWC;
    cloudsStage.uniforms.cloudCover = config.cloudCover;
  });

  return cloudsStage;
}