<template>
  <div class="footer">
    <div class="ftDisable" v-if="!isShowTextarea">
      <input
        type="text"
        :placeholder="placeholderText"
        :value="textValue"
        class="inputbox"
        @focus="showEvent"
      />
      <div class="icon">
        <div class="box" @click="goMoreComment">
          <div class="commlength">{{comment}}</div>
          <div class="iconfont iconpinglun-"></div>
        </div>
        <div
          class="iconfont iconshoucang"
          :class="{star: articleDetail.has_star}"
          @click="handleStar"
        ></div>
        <div class="iconfont iconfenxiang"></div>
      </div>
    </div>
    <div class="ftEnable" v-if="isShowTextarea">
      <div>
        <textarea
          class="textInput"
          @blur="hideEvent"
          :placeholder="placeholderText"
          v-model="textValue"
          ref="textArea"
        ></textarea>
      </div>
      <div class="btnComment" @click="sendComment">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["articleDetail", "comment"],
  data() {
    return {
      isShowTextarea: false,
      textValue: "",
      parentObj: ""
    };
  },
  computed: {
    placeholderText() {
      if (this.parentObj.user) {
        return "回复:@" + this.parentObj.user;
      } else {
        return "写评论";
      }
    }
  },
  methods: {
    // 去更多跟帖页
    goMoreComment() {
      this.$router.push("/morecom/" + this.$route.params.id).catch(err => {});
    },
    // 点击收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.$route.params.id
      }).then(res => {
        console.log(res.data);
        if (res.data.message == "收藏成功") {
          this.articleDetail.has_star = true;
        } else {
          this.articleDetail.has_star = false;
        }
      });
    },
    // 展示输入框
    showEvent(userObj) {
      this.isShowTextarea = true;
      //debug nextTick是vue中处理在数据变化之后等待vue完成更新Dom，该回调函数将在Dom更新完成后被调用
      this.$nextTick(() => {
        this.$refs.textArea.focus();
      });
      this.parentObj = userObj;
    },
    // 隐藏输入框
    hideEvent() {
      //debug 点击发表的时候，输入框失去焦点触发隐藏事件，导致click事件无法触发
      //使用延时器，避免在发布评论请求时，请求未发出，评论内容就不见了
      setTimeout(() => {
        this.isShowTextarea = false;
      }, 100);
    },
    // 发表评论
    sendComment() {
      // 判断评论内容是否为空
      if (this.textValue.trim() == "") {
        // console.log("回复内容为空哦，请输入");
        this.$toast("评论失败，请重新评论");
        return;
      }
      let data = {
        content: this.textValue
      };
      if (this.parentObj) {
        data.parent_id = this.parentObj.id;
      }
      this.$axios({
        url: "/post_comment/" + this.$route.params.id,
        method: "post",
        data: data
      }).then(res => {
        console.log(res.data);
        if (res.data.message == "评论发布成功") {
          this.textValue = "";
          this.isShowTextarea = false;
          this.$toast("评论成功");
          this.$emit("flashComment");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.78vw 5.56vw 2.78vw;
  box-sizing: border-box;
  background-color: #f2f2f2;
  .ftDisable {
    display: flex;
    align-items: center;
    .inputbox {
      flex: 1;
      height: 30px;
      line-height: 30px;
      padding-left: 15px;
      margin-right: 10px;
      border: 0;
      outline: none;
      font-size: 14px;
      background-color: #ccc;
      border-radius: 15px;
    }
    .icon {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 23px;
        margin: 0 10px;
      }
      .star {
        color: red;
      }
      .box {
        position: relative;
        .commlength {
          position: absolute;
          top: -5px;
          left: 18px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          padding: 0 5px;
          background-color: #f24e4d;
          border-radius: 8px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
  .ftEnable {
    position: relative;
    // display: none;
    .textInput {
      width: 66.67vw;
      height: 25vw;
      padding: 2.78vw;
      box-sizing: border-box;
      border-radius: 2.78vw;
      border: 0;
      background-color: #ccc;
      font-size: 16px;
      color: #333;
    }
    .btnComment {
      position: absolute;
      bottom: 0;
      right: 2.78vw;
      width: 16.67vw;
      height: 7.22vw;
      line-height: 7.22vw;
      text-align: center;
      background-color: #f24e4d;
      color: #fff;
      font-size: 3.33vw;
      border-radius: 3.61vw;
    }
  }
}
</style>