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
  .text {
    flex: 1;
    text-align: center;
    font-size: 3.89vw;
  }
}
</style>