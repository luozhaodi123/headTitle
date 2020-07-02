<template>
  <div>
    <Parent
      :parentLength="parentLength-1"
      :parentData="parentData.parent"
      v-if="parentData.parent"
      @replyParent="replyModule"
    />
    <div class="parentDom">
      <div class="user">
        <div class="nickname">{{parentLength+1}} {{parentData.user.nickname}}</div>
        <div class="time">2小时前</div>
        <div class="reply" @click="replyParent({id:parentData.id,user:parentData.user.nickname})">回复</div>
      </div>
      <div class="content">{{parentData.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parentData"],
  name: "Parent",
  methods: {
    replyParent(userObj) {
      // console.log(userObj);
      this.$emit("replyParent", userObj);
    },
    replyModule(userObj) {
      this.$emit("replyParent", userObj);
    }
  },
  computed: {
    parentLength() {
      let depth = 0;
      let current = this.parentData;
      while (current.parent) {
        depth += 1;
        current = current.parent;
      }
      return depth;
    }
  }
};
</script>

<style lang="less" scoped>
.parentDom {
  padding: 2.78vw;
  border: 1px solid #ccc;
  margin-bottom: -1px;
  .user {
    display: flex;
    align-items: center;
    .time {
      flex: 1;
      font-size: 3.33vw;
      color: #868686;
    }
    .nickname {
      font-size: 3.89vw;
      margin-right: 2.78vw;
    }
    .reply {
      font-size: 3.33vw;
      color: #868686;
    }
  }
  .content {
    padding: 4.17vw 0 2.22vw;
  }
}
</style>