<template>
  <div>
    <div class="attent">
      <headBar textHead="我的关注" @clicked="goback" />
    </div>
    <nBarAttent @clicked="cancel" />
    <nBarAttent @clicked="cancel" />
    <nBarAttent @clicked="cancel" />
  </div>
</template>

<script>
import headBar from "@/components/headBar";
import nBarAttent from "@/components/nBarAttent";
export default {
  components: {
    headBar,
    nBarAttent
  },
  methods: {
    goback() {
      this.$router.back();
    },
    attentEvent() {
      this.$axios({
        url: "http://localhost:3000/user_follows",
        method: "get"
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
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
  padding: 20px 24px;
}
</style>