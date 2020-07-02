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
    <!-- 精彩跟帖 -->
    <div class="comMain">
      <div class="headTitle">精彩跟帖</div>
      <div v-if="commentList.length>0">
        <div class="user" v-for="item in commentList" :key="item.id">
          <div class="userInfo">
            <img class="touxian" :src="$axios.defaults.baseURL+item.user.head_img" alt />
            <div class="info">
              <div class="nickname">{{item.user.nickname}}</div>
              <div class="time">2小时前</div>
            </div>
            <div class="reply" @click="reply({id:item.id,user:item.user.nickname})">回复</div>
          </div>
          <Comment :comment="item" @replyModule="replyModule" />
        </div>
      </div>
      <div v-else class="tips">暂无跟帖，抢占沙发</div>
    </div>
    <!-- 更多跟帖 -->
    <div class="moreComment">
      <div class="btn" @click="$router.push('/morecom/'+$route.params.id)">更多跟帖</div>
    </div>
    <!-- 发表组件 -->
    <CommentInput
      ref="comment"
      :comment="comment"
      :articleDetail="articleDetail"
      @flashComment="flashComment"
    />
  </div>
</template>

<script>
import Comment from "@/components/comment/Index";
import CommentInput from "@/components/commentInput";
export default {
  components: {
    Comment,
    CommentInput
  },
  data() {
    return {
      articleDetail: "",
      commentList: [],
      comment: ""
    };
  },
  created() {
    // 文章详情
    this.$axios({
      url: "/post/" + this.$route.params.id
    }).then(res => {
      // console.log(res.data);
      this.articleDetail = res.data.data;
    });
    // 加载跟帖
    this.getComment();
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
    },
    // 封装获取跟帖列表
    getComment() {
      this.$axios({
        url: "/post_comment/" + this.$route.params.id
      }).then(res => {
        console.log(res.data.data);
        this.comment = res.data.data.length;
        if (res.data.data.length >= 3) {
          res.data.data.length = 3;
        }
        this.commentList = res.data.data;
      });
    },
    // 刷新跟帖列表
    flashComment() {
      this.getComment();
    },
    // 主评论
    reply(userobj) {
      this.$refs.comment.showEvent(userobj);
    },
    // 中间评论
    replyModule(userObj) {
      this.$refs.comment.showEvent(userObj);
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5.56vw;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10000;
  .iconjiantou2 {
    font-size: 4.17vw;
    margin-right: 1.39vw;
  }
  .iconnew {
    flex: 1;
    font-size: 15vw;
  }
  .cancelfullowBtn,
  .fullowBtn {
    width: 17.22vw;
    height: 7.22vw;
    line-height: 7.22vw;
    text-align: center;
    font-size: 3.33vw;
    border-radius: 3.61vw;
    border: 1px solid #ccc;
  }
  .fullowBtn {
    border-color: #f24e4d;
    background-color: #f24e4d;
    color: #fff;
  }
}
.picture {
  padding: 0 5.56vw;
  margin-top: 60px;
  .title {
    font-size: 5vw;
    font-weight: 700;
  }
  .info {
    display: flex;
    font-size: 3.61vw;
    align-items: center;
    padding: 2.78vw 0 6.94vw;
    color: #868686;
    .user {
      margin-right: 2.78vw;
    }
  }
  .mainContent {
    line-height: 6.94vw;
    font-size: 3.89vw;
    /deep/img {
      max-width: 100%;
      object-fit: cover;
    }
  }
}
.video {
  padding: 0 5.56vw;
  margin-top: 60px;
  .box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.78vw;
    .player {
      width: 100%;
    }
    .iconshipin {
      position: absolute;
      width: 11.11vw;
      height: 11.11vw;
      line-height: 11.11vw;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 8.33vw;
    }
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 4.44vw;
    .user {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 3.61vw;
      color: #868686;
      img {
        width: 6.94vw;
        height: 6.94vw;
        border-radius: 50%;
        margin-right: 1.39vw;
      }
    }
    .cancelfullowBtn,
    .fullowBtn {
      width: 17.22vw;
      height: 7.22vw;
      line-height: 7.22vw;
      text-align: center;
      font-size: 3.33vw;
      border-radius: 3.61vw;
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
  padding: 8.33vw 5.56vw 5.56vw;
  border-bottom: 1.11vw solid #ccc;
  .dianzan,
  .weixin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21.94vw;
    height: 7.22vw;
    font-size: 3.61vw;
    border: 1px solid #333;
    border-radius: 3.61vw;
  }
  .iconfont {
    margin-right: 1.39vw;
    &.iconweixin {
      color: #00c800;
    }
  }
  .colRed {
    color: red;
  }
}
.comMain {
  .headTitle {
    padding: 6.94vw 5.56vw 0;
    text-align: center;
    font-size: 5vw;
    color: #333;
  }
  .user {
    padding: 0 5.56vw;
    margin-bottom: 5.56vw;
    border-bottom: 1px solid #ccc;
    .userInfo {
      display: flex;
      align-items: center;
      .touxian {
        width: 9.72vw;
        height: 9.72vw;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-left: 2.78vw;
        .nickname {
          font-size: 3.89vw;
          color: #333;
          margin-bottom: 0.83vw;
        }
        .time {
          font-size: 3.33vw;
          color: #868686;
        }
      }
      .reply {
        font-size: 3.33vw;
        color: #868686;
      }
    }
  }
  .tips {
    text-align: center;
    margin: 5.56vw 0;
    color: #f24e4d;
    font-size: 14px;
  }
}
.moreComment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 19.44vw;
  .btn {
    text-align: center;
    padding: 2.22vw 11.11vw;
    border: 1px solid #ccc;
    font-size: 3.61vw;
    color: #333;
    border-radius: 5.56vw;
  }
}
</style>