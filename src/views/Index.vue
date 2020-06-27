<template>
  <div>
    <homeHead @clickedLogin="$router.push('login')" @clickedSearch="$router.push('search')" />
    <van-tabs v-model="active">
      <van-tab v-for="item in tabData" :key="item.id" :title="item.name">
        <div v-for="post in postList" :key="post.id">
          <!-- 单图片的组件(img<3) -->
          <div class="singleImg" v-if="post.type==1&&post.cover.length<3">
            <div class="info">
              <div class="title">{{post.title}}</div>
              <div class="user">
                <span class="userInfo">{{post.user.nickname}}</span>
                {{post.comment_length}}跟帖
              </div>
            </div>
            <img :src="post.cover[0].url" alt class="imgUrl" />
          </div>
          <!-- 多图片的组件(img>=3) -->
          <div class="moreImg" v-if="post.type==1&&post.cover.length>=3">
            <div class="title">{{post.title}}</div>
            <div class="imgUrl">
              <img :src="post.cover[0].url" alt />
              <img :src="post.cover[1].url" alt />
              <img :src="post.cover[2].url" alt />
            </div>
            <div class="user">
              <span class="userInfo">{{post.user.nickname}}</span>
              {{post.comment_length}}跟帖
            </div>
          </div>
          <!-- 视频组件 -->
          <div class="video" v-if="post.type==2&&post.cover.length>=1">
            <div class="title">{{post.title}}</div>
            <img src alt class="videoImg" />
            <div class="user">
              <span class="userInfo">{{post.user.nickname}}</span>
              {{post.comment_length}}跟帖
            </div>
          </div>
        </div>
      </van-tab>
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
.singleImg {
  display: flex;
  padding: 3.33vw 2.78vw;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 1;
    .title {
      font-size: 4.44vw;
      margin: 0 0 2.78vw;
    }
    .user {
      font-size: 3.61vw;
      color: #868686;
      .userInfo {
        margin-right: 2.78vw;
      }
    }
  }
  .imgUrl {
    width: 31.11vw;
    height: 20.56vw;
  }
}
.moreImg {
  padding: 3.33vw 2.78vw;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 4.44vw;
    color: #333;
  }
  .imgUrl {
    display: flex;
    justify-content: space-between;
    padding: 1.39vw 0 2.78vw;
    img {
      width: 33%;
      height: 20.56vw;
    }
  }
  .user {
    font-size: 3.61vw;
    color: #868686;
    .userInfo {
      margin-right: 2.78vw;
    }
  }
}
.video {
  padding: 3.33vw 2.78vw;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 4.44vw;
    color: #333;
  }
  .videoImg {
    display: block;
    width: 100%;
    height: 47.22vw;
    margin: 3.33vw 0;
  }
  .user {
    font-size: 3.61vw;
    color: #868686;
    .userInfo {
      margin-right: 2.78vw;
    }
  }
}
</style>