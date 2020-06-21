<template>
  <div>
    <router-link to="/login">登录页</router-link>
    <router-link to="/register">注册页</router-link>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    // axios的使用方式
    this.$axios({
      // 请求地址
      url: "http://liangwei.tech:3000/post",
      // 请求方式
      method: "get",
      params: {
        id: 1
      }
      //   成功回调函数
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.list = res.data.data;
      }
    });
  }
};
</script>

<style>
</style>