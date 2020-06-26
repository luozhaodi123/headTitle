<template>
  <div>
    <div class="attent">
      <headBar textHead="我的关注" @clicked="goback" />
    </div>
    <nBarAttent :data="attantData" @cancel="cancelAttent" />
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
  data() {
    return {
      attantData: null
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    attentEvent() {
      this.$axios({
        // url: "http://localhost:3000/user_follows",
        url: "/user_follows",
        method: "get"
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
      }).then(res => {
        // console.log(res.data);
        const { data } = res.data;
        console.log(data);
        this.attantData = data;
      });
    },
    backPerson() {
      this.$router.back();
    },
    cancelAttent(Id) {
      this.$axios({
        // url: "http://localhost:3000/user_unfollow" + Id,
        url: "/user_unfollow/" + Id,
        method: "get"
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
      }).then(res => {
        console.log(res.data);
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