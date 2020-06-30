<template>
  <div>
    <div class="head">
      <div class="iconfont iconnew"></div>
      <div class="search" @click="handleClickSearch">
        <div class="iconfont iconsearch">搜索新闻</div>
      </div>
      <div class="iconfont iconwode" @click="handleClickLogin"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClickLogin() {
      this.$emit("clickedLogin");
    },
    handleClickSearch() {
      this.$emit("clickedSearch");
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 13.89vw;
  padding: 0 4.17vw;
  box-sizing: border-box;
  background-color: #f24e4d;
  color: #fff;
  .iconnew {
    font-size: 15vw;
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
  }
  .iconwode {
    font-size: 6.94vw;
    opacity: 0.6;
  }
}
</style>