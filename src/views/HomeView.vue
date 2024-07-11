<template>
  <components :is="componentName"></components>
</template>

<script>

let paramValue = new URLSearchParams(location.search).get('id');
paramValue = paramValue === null ? 'DemoShow' : paramValue;
let componentName = paramValue;

// 仅引入当前需要的动态组件
const components = require.context(
  "@/views/fastproject", //组件所在目录的相对路径
  true, //是否查询其子目录
  /\w+.vue$/ //匹配基础组件文件名的正则表达式
);
const comObj = {};
components.keys().forEach(fileName => {
  // 获取文件名
  let names = fileName.split("/").pop().replace(/.\w+$/, "");
  if (names === componentName) {
    // 获取组件配置
    const comp = components(fileName);
    // 若该组件是通过"export default"导出的，优先使用".default"，否则退回到使用模块的根
    comObj[names] = comp.default || comp;
  }
});

export default {
  data () {
    return {
      componentName: componentName
    }
  },
  components: comObj
}
</script>