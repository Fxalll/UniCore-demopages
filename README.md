# UniCore 示例项目

<p align="center">
  <img src="src/assets/logo.png" width="200" alt="UniCore Logo" />
</p>

<h3 align="center">UniCore 通用图形引擎示例项目</h3>

<p align="center">
  基于 UniCore SDK 构建的 GIS+BIM 融合应用示例
</p>

---

## 简介

这是一个基于 [UniCore 通用图形引擎](https://github.com/fxalll/UniCore) 构建的示例项目，展示了如何在 Vue.js 项目中集成和使用 UniCore SDK 来创建强大的 GIS+BIM 融合应用。

UniCore 是一个专为 GIS（地理信息系统）和 BIM（建筑信息模型）应用而设计的 Web 端图形引擎，能够无缝融合 BIM 场景与 GIS 场景，提供高性能、可视化的 3D 地理空间解决方案。

## 功能特性

### 🌍 GIS+BIM 融合

- 同时支持 BIM 模型和 GIS 场景的加载与展示
- 实现两个系统的深度集成和数据互通

### 📦 3D 模型支持

- 支持多种 3D 模型格式（3D Tiles, glTF/GLB 等）
- 模型加载、位置调整、缩放等操作
- 模型动画和粒子效果

### 🎨 可视化组件

- 标签系统（普通标签、图片标签、HTML 标签）
- 线条和墙体绘制
- 材质和着色器自定义

### 🧭 交互功能

- 鼠标点击、右键菜单交互
- 模型属性查看
- 视角控制和相机漫游

### ⚙️ 工具组件

- 图层管理
- 底图切换和分屏对比
- 模型切割和平面展示
- 地形裁剪

## 项目结构

```
src/
├── components/           # 可复用的 UI 组件
├── views/               # 页面视图
│   └── fastproject/     # 各类功能示例
├── assets/              # 静态资源
└── utils/               # 工具函数
```

## 快速开始

### 环境要求

- Node.js >= 12.0.0
- npm 或 yarn

### 安装依赖

```bash
yarn install
# 或者
npm install
```

### 启动开发服务器

```bash
yarn serve
# 或者
npm run serve
```

默认访问地址: http://localhost:8091

### 构建生产版本

```bash
yarn build
# 或者
npm run build
```

## 使用说明

项目启动后，可以通过 URL 参数 `id` 来访问不同的功能示例：

- 默认主页: `/`
- 模型加载示例: `/?id=addGltf`
- 动画效果示例: `/?id=createFire`
- 场景操作示例: `/?id=dig`
- 其他更多示例请查看 `src/views/fastproject/` 目录

## 核心技术栈

- [Vue.js 2.x](https://vuejs.org/)
- [UniCore SDK](https://github.com/fxalll/UniCore)
- [Element UI](https://element.eleme.io/)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)

## 示例功能列表

1. **模型操作**

   - 3D Tiles 模型加载 (`addGltf`, `createTileset`)
   - 模型位置调整 (`changeModelPos`, `change3DTilesPos`)
   - 模型切割和压平 (`cutModel`, `flat`)

2. **动画效果**

   - 粒子系统 (`createFire`, `createSmoke`, `createSnow`)
   - 模型运动动画 (`updatePosition`)
   - 爆炸效果 (`createBoom`)

3. **场景交互**

   - 标签系统 (`createTip`, `createImgTip`, `createHtmlTip`)
   - 绘制工具 (`paintLine`, `paintWall`)
   - 地形操作 (`dig`, `createTerrainClip`)

4. **可视化设置**

   - 光照效果 (`enableLighting`)
   - 阴影控制 (`shadowChange`)
   - 分辨率调节 (`resolutionScale`)

5. **高级功能**
   - 相机漫游 (`startTour`, `startTweensTour`)
   - 地下模式 (`undergroundMode`)
   - 性能监控 (`debugShowFramesPerSecond`)

## 开发指南

### 添加新示例

1. 在 `src/views/fastproject/` 下创建新的目录
2. 创建 Vue 组件文件实现功能
3. 通过路由参数 `id` 访问新示例

### 自定义配置

- UniCore 配置文件: `unicore-sdk/unicore.config.js`
- Cesium 访问令牌在 `DemoShow.vue` 中配置

## 许可证

MIT License

---

## English

# UniCore Sample Project

## Introduction

This is a sample project based on the [UniCore Universal Graphics Engine](https://github.com/fxalll/UniCore), demonstrating how to integrate and use the UniCore SDK in a Vue.js project to create powerful GIS+BIM fusion applications.

UniCore is a web-based graphics engine specifically designed for GIS (Geographic Information System) and BIM (Building Information Modeling) applications. It seamlessly integrates BIM scenes with GIS scenes, providing high-performance, visualized 3D geospatial solutions.

## Key Features

### 🌍 GIS+BIM Integration

- Support for both BIM models and GIS scenes loading and display
- Deep integration and data interoperability between the two systems

### 📦 3D Model Support

- Support for multiple 3D model formats (3D Tiles, glTF/GLB, etc.)
- Model loading, positioning, scaling and other operations
- Model animations and particle effects

### 🎨 Visualization Components

- Label system (regular labels, image labels, HTML labels)
- Line and wall drawing
- Material and shader customization

### 🧭 Interactive Features

- Mouse click and right-click menu interactions
- Model property inspection
- View control and camera roaming

### ⚙️ Utility Components

- Layer management
- Base map switching and split-screen comparison
- Model cutting and planar display
- Terrain clipping

## Getting Started

### Prerequisites

- Node.js >= 12.0.0
- npm or yarn

### Install Dependencies

```bash
yarn install
# or
npm install
```

### Start Development Server

```bash
yarn serve
# or
npm run serve
```

Default access address: http://localhost:8091

### Build for Production

```bash
yarn build
# or
npm run build
```

## Usage

After starting the project, you can access different functional examples through the `id` URL parameter:

- Default home page: `/`
- Model loading example: `/?id=addGltf`
- Animation effect example: `/?id=createFire`
- Scene operation example: `/?id=dig`
- More examples can be found in the `src/views/fastproject/` directory

## Core Technologies

- [Vue.js 2.x](https://vuejs.org/)
- [UniCore SDK](https://github.com/fxalll/UniCore)
- [Element UI](https://element.eleme.io/)
- [CesiumJS](https://cesium.com/platform/cesiumjs/)

## License

MIT License
