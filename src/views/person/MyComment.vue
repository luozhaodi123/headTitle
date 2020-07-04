<template>
  <div>
    <headBar textHead="我的跟帖" @clicked="goback" />
    <div class="itemBox">
      <div class="item" v-for="item in MyCommentList" :key="item.id">
        <div
          class="time"
        >{{item.create_date.split("T")[0]}} {{item.create_date.split(":")[1]+":"+item.create_date.split(":")[2].split(".")[0]}}</div>
        <div class="parent" v-if="item.parent">
          <div class="nickname">{{"回复: "+item.parent.user.nickname}}</div>
          <div class="parentContent">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="title">{{item.post.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";
export default {
  components: {
    headBar
  },
  data() {
    return {
      MyCommentList: []
    };
  },
  methods: {
    goback() {
      this.$router.back();
    }
  },
  mounted() {
    this.$axios({
      url: "/user_comments",
      method: "get"
    }).then(res => {
      console.log(res.data.data);
      this.MyCommentList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.itemBox {
  .item {
    padding: 0 5.56vw;
    font-size: 3.89vw;
    border-bottom: 1px solid #ccc;
    .time {
      padding-top: 5.56vw;
      color: #868686;
    }
    .parent {
      padding: 4.17vw 2.78vw;
      margin-top: 2.78vw;
      background-color: #eee;
      color: #777;
      font-size: 3.89vw;
      .nickname {
        margin-bottom: 2.78vw;
      }
    }
    .content {
      color: #333;
      padding: 4.17vw 0 2.78vw;
    }
    .title {
      padding: 2.78vw 0;
      font-size: 3.89vw;
      color: #888;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>