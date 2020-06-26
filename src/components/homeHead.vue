<template>
  <div>
    <div class="head">
      <div class="iconfont iconnew"></div>
      <div class="search">
        <div class="iconfont iconsearch">搜索新闻</div>
      </div>
      <div class="iconfont iconwode" @click="handleClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
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
  padding: 0 4.17vw;
  background-color: #ff0000;
  .iconnew {
    font-size: 15vw;
    color: #fff;
  }
  .search {
    flex: 1;
    height: 11.11vw;
    line-height: 11.11vw;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 0 4.17vw 0 1.39vw;
    border-radius: 6.94vw;
    font-size: 5vw;
    color: #fff;
  }
  .iconwode {
    font-size: 6.94vw;
    color: #fff;
  }
}
</style>