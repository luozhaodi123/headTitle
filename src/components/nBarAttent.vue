<template>
  <div v-if="data">
    <div class="bar" v-for="(item,index) in data" :key="index">
      <div class="img">
        <img v-if="item.head_img" :src="$axios.defaults.baseURL+item.head_img" class="touxian" alt />
        <img v-else src="@/assets/logo.png" class="touxian" alt />
      </div>
      <div class="desc">
        <div class="title">{{item.nickname}}</div>
        <div class="time">{{item.create_date.split("T")[0]}}</div>
      </div>
      <div class="cancel" @click="handleClick(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    handleClick(id) {
      this.$emit("cancel", id);
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