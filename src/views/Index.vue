<template>
  <div>
    <homeHead @clickedLogin="$router.push('person')" @clickedSearch="$router.push('search')" />
    <van-tabs v-model="active">
      <van-tab v-for="category in categoryList" :key="category.id" :title="category.name">
        <newsList :postList="category.article" />
      </van-tab>
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
      categoryList: null
      // postList: []
    };
  },
  watch: {
    // 监听tab栏中active活动的对应的栏目，加载对应栏目的内容
    active() {
      // 活动tab发送请求前，判断categoryList.article这个数组的长度是否已经有数据
      // 如果有就不发请求，没有就发请求
      const currentCategory = this.categoryList[this.active];
      if (currentCategory.article.length == 0) {
        this.getPost();
      }
    }
  },
  computed: {
    // 使用属性监听分类栏目的id
    categoryId() {
      // 拿到当前活动分类的Id
      const currentCategory = this.categoryList[this.active];
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
        // console.log(res.data);
        const { data } = res.data;
        // this.categoryList = data;
        // 分栏目管理文章列表
        // 主要是通过挂上一个空数组用来管理栏目自己的文章
        const newData = data.map(item => {
          return {
            ...item,
            article: []
          };
        });
        this.categoryList = newData;
        console.log(this.categoryList);
        //当tab分类栏加载完毕后才发送获取文章列表的请求
        this.getPost();
      });
    },
    // 获取文章列表
    getPost() {
      // 发送请求之前，对
      // 发送请求
      this.$axios({
        url: "/post",
        params: {
          category: this.categoryId
        }
      }).then(res => {
        // console.log(res.data.data);
        // this.postList = res.data.data;
        // 当活动tab是把当前的文章追加对应的tab栏目的article数组中
        const currentCategory = this.categoryList[this.active];
        currentCategory.article = res.data.data;
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