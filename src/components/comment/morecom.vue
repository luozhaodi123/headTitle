<template>
  <div>
    <headBar textHead="更多跟帖" @clicked="$router.back()" />
    <!-- 精彩跟帖 -->
    <div class="comMain" v-if="commentList.length>0">
      <div class="user" v-for="item in commentList" :key="item.id">
        <div class="userInfo">
          <img class="touxian" src="@/assets/logo.png" alt />
          <div class="info">
            <div class="nickname">{{item.user.nickname}}</div>
            <div class="time">2小时前</div>
          </div>
          <div class="reply">回复</div>
        </div>
        <Comment :comment="item" />
      </div>
    </div>
    <div v-else class="tips">暂时还没有跟帖哦</div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import Comment from "@/components/comment/Index";
export default {
  components: {
    headBar,
    Comment
  },
  data() {
    return {
      commentList: []
    };
  },
  created() {
    this.$axios({
      url: "/post_comment/" + this.$route.params.id
    }).then(res => {
      console.log(res.data);
      this.commentList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.comMain {
  margin-top: 5.56vw;
  .headTitle {
    padding: 6.94vw 5.56vw;
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
}
.tips {
  text-align: center;
  margin: 5.56vw 0;
  color: #f24e4d;
}
</style>