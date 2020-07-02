<template>
  <div class="head">
    <div class="iconfont iconjiantou2" @click="backPerson"></div>
    <div class="text">{{textHead}}</div>
  </div>
</template>

<script>
export default {
  props: ["textHead"],
  methods: {
    backPerson() {
      this.$emit("clicked");
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  height: 13.89vw;
  padding: 0 6.67vw;
  background-color: #f24e4d;
  font-weight: 700;
  color: #fff;
  .text {
    flex: 1;
    text-align: center;
  }
}
</style>