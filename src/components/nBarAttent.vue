<template>
  <div>
    <div v-if="data&&data.length!=0">
      <div class="bar" v-for="(item,index) in data" :key="item.id">
        <div class="img">
          <img
            v-if="item.head_img"
            :src="$axios.defaults.baseURL+item.head_img"
            class="touxian"
            alt
          />
          <img v-else src="@/assets/logo.png" class="touxian" alt />
        </div>
        <div class="desc">
          <div class="title">{{item.nickname}}</div>
          <div class="time">{{item.create_date.split("T")[0]}}</div>
        </div>
        <div class="cancel" v-if="data[index].fullow" @click="unfullow({id:item.id,index})">取消关注</div>
        <div class="confirm" v-else @click="fullow({id:item.id,index})">关注</div>
      </div>
    </div>
    <div v-else class="tip">暂时还没有关注的哟</div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    unfullow(obj) {
      this.$emit("cancel", obj);
    },
    fullow(obj) {
      this.$emit("confirm", obj);
    }
  }
};
</script>

<style lang="less" scoped>
.bar {
  display: flex;
  align-items: center;
  padding: 5.56vw 6.67vw;
  border-bottom: 1px solid #ccc;
  .img {
    width: 11.11vw;
    height: 11.11vw;
    border-radius: 50%;
    background-color: #ccc;
  }
  .touxian {
    width: 11.11vw;
    height: 11.11vw;
    border-radius: 50%;
  }
  .desc {
    flex: 1;
    padding-left: 5.56vw;
    .title {
      font-size: 4.44vw;
      color: #333;
    }
    .time {
      font-size: 3.89vw;
      color: #ccc;
    }
  }
  .cancel {
    padding: 1.39vw 2.78vw;
    background-color: #ddd;
    font-size: 3.33vw;
    border-radius: 4.17vw;
  }
  .confirm {
    width: 18.89vw;
    height: 7.22vw;
    line-height: 7.22vw;
    text-align: center;
    font-size: 3.33vw;
    border-radius: 4.17vw;
    background-color: #f24e4d;
    color: #fff;
  }
}
.tip {
  height: 13.89vw;
  line-height: 13.89vw;
  text-align: center;
  font-size: 5vw;
  color: #f24e4d;
}
</style>