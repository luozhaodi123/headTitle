<template>
  <div>
    <homeHead @clickedLogin="$router.push('person')" @clickedSearch="$router.push('search')" />
    <van-tabs v-model="active">
      <van-tab v-for="item in tabData" :key="item.id" :title="item.name"></van-tab>
      <newsList :postList="postList" />
    </van-tabs>
  </div>
</template>

<script>
import homeHead from "@/components/homeHead";
import newsList from "@/components/newsList";
export default {
  components: {
    homeHead,
    newsList
  },
  data() {
    return {
      active: 0,
      tabData: null,
      postList: []
    };
  },
  watch: {
    // 监听tab栏中active活动的对应的栏目，加载对应栏目的内容
    active() {
      this.getPost();
    }
  },
  computed: {
    // 使用属性监听分类栏目的id
    categoryId() {
      // 拿到当前活动分类的Id
      const currentCategory = this.tabData[this.active];
      return currentCategory.id;
    }
  },
  methods: {
    // 获取tab栏目
    getTab() {
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.tabData = data;
        //当tab分类栏加载完毕后才发送获取文章列表的请求
        this.getPost();
      });
    },
    // 获取文章列表
    getPost() {
      // 发送请求
      this.$axios({
        url: "/post",
        params: {
          category: this.categoryId
        }
      }).then(res => {
        console.log(res.data);
        this.postList = res.data.data;
      });
    }
  },
  mounted() {
    this.getTab();
  }
};
</script>

<style lang="less" scoped>
/deep/.van-tab__text {
  font-size: 4.17vw;
  color: #333;
}
/deep/.van-tabs__wrap {
  position: fixed;
  z-index: 1000;
  margin-top: 13.89vw;
}
/deep/.van-tabs__content {
  padding-top: 26.11vw;
}
</style>