<template>
  <div class="bar" @click="handleClick">
    <div class="bar-l">{{this.textNavBarL}}</div>
    <div class="bar-m">{{this.textNavBarM}}</div>
    <div class="iconfont iconjiantou1"></div>
  </div>
</template>

<script>
export default {
  props: ["textNavBarL", "textNavBarM"],
  methods: {
    handleClick() {
      console.log("子组件被点击了");
      this.$emit("clicked");
    }
  }
};
</script>

<style lang="less" scoped>
.bar {
  display: flex;
  align-items: center;
  padding: 5.56vw 0 5.56vw 0;
  margin: 0 6.67vw;
  font-size: 3.89vw;
  border-bottom: 1px solid #ccc;
  .bar-l {
    color: #333;
  }
  .bar-m {
    flex: 1;
    text-align: right;
    padding-right: 1.39vw;
    color: #ccc;
  }
}
</style>