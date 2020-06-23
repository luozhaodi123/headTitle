<template>
  <div class="bar">
    <div class="img">
      <img src="@/assets/logo.png" class="touxian" alt />
    </div>
    <div class="desc">
      <div class="title">火星新闻播报</div>
      <div class="time">2019-10-10</div>
    </div>
    <div class="cancel" @click="handleClick(1)">取消关注</div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(id) {
      this.$emit("clicked", id);
    }
  }
};
</script>

<style lang="less" scoped>
.bar {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #ccc;
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
  }
  .touxian {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .desc {
    flex: 1;
    padding-left: 20px;
    .title {
      font-size: 16px;
      color: #333;
    }
    .time {
      font-size: 14px;
      color: #ccc;
    }
  }
  .cancel {
    padding: 5px 10px;
    background-color: #ddd;
    font-size: 12px;
    border-radius: 15px;
  }
}
</style>