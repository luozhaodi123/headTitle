<template>
  <div>
    <div class="attent">
      <div class="iconfont iconjiantou2" @click="backPerson"></div>
      <div class="text">我的关注</div>
    </div>
    <nBarAttent @clicked="cancel" />
    <nBarAttent @clicked="cancel" />
    <nBarAttent @clicked="cancel" />
  </div>
</template>

<script>
import nBarAttent from "@/components/nBarAttent";
export default {
  components: {
    nBarAttent
  },
  methods: {
    attentEvent() {
      this.$axios({
        url: "http://localhost:3000/user_follows",
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
      });
    },
    backPerson() {
      this.$router.back();
    },
    cancel(attentId) {
      this.$axios({
        url: "http://localhost:3000/user_unfollow" + attentId,
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res.data);
        const { message } = res.data;
        if (message == "取消关注成功") {
          this.attentEvent();
        }
      });
    }
  },
  mounted() {
    this.attentEvent();
  }
};
</script>

<style lang="less" scoped>
.attent {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  .text {
    flex: 1;
    font-size: 14px;
    text-align: center;
  }
}
</style>