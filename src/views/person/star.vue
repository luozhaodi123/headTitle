<template>
  <div>
    <TopBar textHead="我的收藏" @clicked="$router.back()" />
    <newList :postList="postList" @clicked="toArticleDetail" />
  </div>
</template>

<script>
import TopBar from "@/components/headBar";
import newList from "@/components/newsList";
export default {
  components: {
    TopBar,
    newList
  },
  data() {
    return {
      postList: null
    };
  },
  created() {
    this.$axios({
      url: "/user_star"
    }).then(res => {
      console.log(res.data);
      this.postList = res.data.data;
    });
  },
  methods: {
    toArticleDetail(id) {
      this.$router.push("/articledetail/" + id);
    }
  }
};
</script>

<style>
</style>