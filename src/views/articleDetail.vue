<template>
  <div>
    <!-- head部分 -->
    <div class="head">
      <div class="iconfont iconjiantou2" @click="$router.back()"></div>
      <div class="iconfont iconnew"></div>
      <div
        class="cancelfullowBtn"
        @click="handleFullow(articleDetail.user.id)"
        v-if="articleDetail.type==1&&articleDetail.has_follow"
      >取消关注</div>
      <div
        v-else-if="articleDetail.type==1&&!articleDetail.has_follow"
        class="fullowBtn"
        @click="handleFullow(articleDetail.user.id)"
      >关注</div>
    </div>
    <!-- main部分 -->
    <!--第一部分 图片 -->
    <div class="picture" v-if="articleDetail.type==1">
      <div class="title">{{articleDetail.title}}</div>
      <div class="info">
        <div class="user">{{articleDetail.user.nickname}}</div>
        <div class="time">{{articleDetail.create_date.split("T")[0]}}</div>
      </div>
      <div class="mainContent" v-html="articleDetail.content"></div>
    </div>
    <!-- 第二部分 视频 -->
    <div class="video" v-if="articleDetail.type==2">
      <div class="box">
        <video
          poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
          controls
          class="player"
          ref="videoDom"
          @play="hidePlay"
          @pause="showPlay"
          src="https://video.pearvideo.com/mp4/adshort/20200421/cont-1670293-15098199_adpkg-ad_hd.mp4"
        ></video>
        <div class="iconfont iconshipin" @click="clickPlay"></div>
      </div>
      <div class="info">
        <div class="user">
          <img :src="articleDetail.cover[0].url" alt />
          {{articleDetail.user.nickname}}
        </div>
        <div
          class="cancelfullowBtn"
          v-if="articleDetail.has_follow"
          @click="handleFullow(articleDetail.user.id)"
        >取消关注</div>
        <div
          class="fullowBtn"
          v-if="!articleDetail.has_follow"
          @click="handleFullow(articleDetail.user.id)"
        >关注</div>
      </div>
      <div class="title">{{articleDetail.title}}</div>
    </div>
    <!-- 点赞/微信 -->
    <div class="make">
      <div class="dianzan" @click="handleGive(articleDetail.id)">
        <div class="iconfont icondianzan" ref="dianzan"></div>
        {{articleDetail.like_length}}
      </div>
      <div class="weixin">
        <div class="iconfont iconweixin"></div>微信
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleDetail: ""
    };
  },
  created() {
    this.$axios({
      url: "/post/" + this.$route.params.id
    }).then(res => {
      console.log(res.data);
      this.articleDetail = res.data.data;
    });
  },
  methods: {
    // 关注
    handleFullow(id) {
      if (this.articleDetail.has_follow) {
        this.$axios({
          url: "/user_unfollow/" + id
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "取消关注成功") {
            this.articleDetail.has_follow = false;
            this.$toast("取消关注成功");
          }
        });
      } else {
        this.$axios({
          url: "/user_follows/" + id
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "关注成功") {
            this.articleDetail.has_follow = true;
            this.$toast("关注成功");
          }
        });
      }
    },
    // 点赞
    handleGive(id) {
      this.$axios({
        url: "/post_like/" + id
      }).then(res => {
        console.log("点赞了哦");
        console.log(res.data);
        if (res.data.message == "点赞成功") {
          this.articleDetail.like_length += 1;
          console.log(this.$refs.dianzan);
          this.$refs.dianzan.classList.add("colRed");
        } else {
          this.articleDetail.like_length -= 1;
          this.$refs.dianzan.classList.remove("colRed");
        }
      });
    },
    // 点击播放
    clickPlay() {
      this.$refs.videoDom.play();
      this.$refs.videoDom.nextElementSibling.setAttribute(
        "style",
        "display:none"
      );
    },
    // 展示播放
    showPlay() {
      this.$refs.videoDom.nextElementSibling.setAttribute(
        "style",
        "display:block"
      );
    },
    // 隐藏播放
    hidePlay() {
      this.$refs.videoDom.nextElementSibling.setAttribute(
        "style",
        "display:none"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  padding: 0 20px;
  .iconjiantou2 {
    font-size: 15px;
    margin-right: 5px;
  }
  .iconnew {
    flex: 1;
    font-size: 54px;
  }
  .cancelfullowBtn,
  .fullowBtn {
    width: 62px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    border-radius: 13px;
    border: 1px solid #ccc;
  }
  .fullowBtn {
    border-color: #f24e4d;
    background-color: #f24e4d;
    color: #fff;
  }
}
.picture {
  padding: 0 20px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .info {
    display: flex;
    font-size: 13px;
    align-items: center;
    padding: 10px 0 25px;
    color: #868686;
    .user {
      margin-right: 10px;
    }
  }
  .mainContent {
    line-height: 25px;
    font-size: 14px;
    /deep/img {
      max-width: 100%;
      object-fit: cover;
    }
  }
}
.video {
  padding: 0 20px;
  .box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    .player {
      width: 100%;
    }
    .iconshipin {
      position: absolute;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 30px;
    }
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .user {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #868686;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    .cancelfullowBtn,
    .fullowBtn {
      width: 62px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 12px;
      border-radius: 13px;
      border: 1px solid #ccc;
    }
    .fullowBtn {
      border-color: #f24e4d;
      background-color: #f24e4d;
      color: #fff;
    }
  }
  .title {
    color: #333;
  }
}
.make {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 20px 20px;
  border-bottom: 4px solid #ccc;
  .dianzan,
  .weixin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 79px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #333;
    border-radius: 13px;
  }
  .iconfont {
    margin-right: 5px;
    &.iconweixin {
      color: #00c800;
    }
  }
  .colRed {
    color: red;
  }
}
</style>