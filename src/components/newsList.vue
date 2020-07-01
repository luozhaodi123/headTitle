<template>
  <!-- <div v-for="post in postList" :key="post.id"> -->
  <div v-if="post">
    <!-- 单图片的组件(1<=img<3) 处理没图片的文章-->
    <div
      class="singleImg"
      v-if="post.type==1&&1<=post.cover.length<3"
      @click="handleClick(post.id)"
    >
      <div class="info">
        <div class="title">{{post.title}}</div>
        <div class="user">
          <span class="userInfo">{{post.user.nickname}}</span>
          {{commentLength}}跟帖
        </div>
      </div>
      <img :src="post.cover[0].url | fixImgUrl" alt class="imgUrl" />
    </div>
    <!-- 多图片的组件(img>=3) -->
    <div class="moreImg" v-if="post.type==1&&post.cover.length>=3" @click="handleClick(post.id)">
      <div class="title">{{post.title}}</div>
      <div class="imgUrl">
        <img :src="post.cover[0].url | fixImgUrl" alt />
        <img :src="post.cover[1].url | fixImgUrl" alt />
        <img :src="post.cover[2].url | fixImgUrl" alt />
      </div>
      <div class="user">
        <span class="userInfo">{{post.user.nickname}}</span>
        {{commentLength}}跟帖
      </div>
    </div>
    <!-- 视频组件 -->
    <div class="video" v-if="post.type==2&&post.cover.length>=1" @click="handleClick(post.id)">
      <div class="title">{{post.title}}</div>
      <div class="videoImg">
        <img :src="post.cover[0].url | fixImgUrl" alt class="img" />
        <div class="iconfont iconshipin"></div>
      </div>
      <div class="user">
        <span class="userInfo">{{post.user.nickname}}</span>
        {{commentLength}}跟帖
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  // 局部过滤器，主要是处理图片不全的问题
  // 后台发出来的数据，有可能是完整的，也有可能是相对路径
  /* filters: {
    fixImgUrl(url) {
      const fullUrlReg = /^http/;
      if (fullUrlReg.test(url)) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    }
  } */
  methods: {
    handleClick(id) {
      // console.log(id);
      this.$emit("clicked", id);
    }
  },
  computed: {
    commentLength() {
      if (this.post.comments) {
        return this.post.comments.length;
      } else if (this.post.comment_length) {
        return this.post.comment_length;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
    object-fit: cover;
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
      object-fit: cover;
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3.33vw 0;
    .img {
      width: 100%;
      height: 47.22vw;
      object-fit: cover;
    }
    .iconshipin {
      position: absolute;
      width: 12.78vw;
      height: 12.78vw;
      font-size: 12.78vw;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      border-radius: 50%;
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
</style>