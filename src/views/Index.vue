<template>
  <div>
    <homeHead @clicked="toLogin" />
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in tabData" :key="index" :title="item.name">内容:{{item.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import homeHead from "@/components/homeHead";
export default {
  components: {
    homeHead
  },
  data() {
    return {
      active: 0,
      tabData: null
    };
  },
  methods: {
    toLogin() {
      this.$router.push("login");
    }
  },
  mounted() {
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.tabData = data;
    });
  }
};
</script>

<style lang="less" scoped>
</style>