<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 引入loginDom组件
import loginDom from "./views/Login";
import RegisterDom from "./views/Register";
export default {
  components: {
    loginDom,
    RegisterDom
  }
};
</script>

<style lang="less">
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
// 重置公共样式
* {
  padding: 0;
  margin: 0;
}
a {
  color: inherit;
}
a:hover {
  text-decoration: none;
}
ul,
li,
ol {
  list-style: none;
}
</style>
