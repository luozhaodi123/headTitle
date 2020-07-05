<template>
  <div>
    <homeHead @clickedLogin="$router.push('person')" @clickedSearch="$router.push('search')" />
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="category in categoryList" :key="category.id" :title="category.name">
        <!-- 使用list组件将文章包裹起来 -->
        <!-- 当页面拉到底的时候，就会触发一个事件load -->
        <!-- 
          loading是否在加载中，如果为false，那么拉到底就会发出下一页的请求，自动变为true然后等待
          finished是否已经全部加载完毕，如果为true，那么就会消失结束文字，再也不会发生下一页的请求
          :immediate-check="false" 表示禁用vant组件第一次进入页面自动加载的功能
        -->
        <van-list
          v-model="category.loading"
          :finished="category.finished"
          @load="loadMoreArticle"
          :immediate-check="false"
          finished-text="没有更多了"
        >
          <!-- <newsList  :postList="category.article" @clicked="toArticleDetail" /> -->
          <newsList
            :post="postList"
            v-for="postList in category.article"
            @clicked="toArticleDetail"
            :key="postList.id"
          />
        </van-list>
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
      // 先从本地获取栏目
      const myList = localStorage.getItem("myList");
      if (myList) {
        const res = {
          data: {
            data: JSON.parse(myList)
          }
        };
        this.makeArticle(res);
        return;
      }
      // 本地若没有就向后台发送请求
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        // console.log(res.data);
        this.makeArticle(res);
      });
    },
    // 配置获取tab栏以及文章
    makeArticle(res) {
      const { data } = res.data;
      // this.categoryList = data;
      // 分栏目管理文章列表
      // 主要是通过挂上一个空数组用来管理栏目自己的文章
      const newData = data.map(item => {
        return {
          ...item,
          article: [],
          pageIndex: 1,
          pageSize: 5,
          loading: false,
          finished: false
        };
      });
      this.categoryList = newData;
      // console.log(this.categoryList);
      //当tab分类栏加载完毕后才发送获取文章列表的请求
      this.getPost();
    },
    loadMoreArticle() {
      console.log("进入了加载下一页");
      const currentCategory = this.categoryList[this.active];
      currentCategory.pageIndex += 1;
      this.getPost();
    },
    // 获取文章列表
    getPost() {
      const currentCategory = this.categoryList[this.active];
      // 发送请求
      this.$axios({
        url: "/post",
        params: {
          category: this.categoryId,
          pageIndex: currentCategory.pageIndex, //当前页数
          pageSize: currentCategory.pageSize //当前页的文章数
        }
      }).then(res => {
        console.log(res.data.data);
        // this.postList = res.data.data;
        // 当活动tab是把当前的文章追加对应的tab栏目的article数组中
        // currentCategory.article = res.data.data;

        // 以前我们获取文章列表之后，是直接将之前的数组替换掉，其实我们需要的是将下一页跟上一页的拼接起来
        currentCategory.article = [
          ...currentCategory.article,
          ...res.data.data
        ];

        //这里加载完文章数据之后，需要手动将当前栏目的加载状态改为false，也就是没有正在加载
        // 这样才能在下一次的拉到底的时候重新触发加载下一页
        currentCategory.loading = false;

        //最后如果发现数据已经到了头，需要告诉组件已经完毕，禁止再次发生请求
        if (res.data.data.length < currentCategory.pageSize) {
          currentCategory.finished = true;
        }
      });
    },
    // 跳转到文章详情页
    toArticleDetail(id) {
      this.$router.push("/articleDetail/" + id);
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
</style>