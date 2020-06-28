<template>
  <div>
    <headBar textHead="我的关注" @clicked="goback" />
    <nBarAttent :data="attantData" @cancel="cancelAttent" @confirm="confirmAttent" />
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
    // 获取到的关注列表
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
        // this.attantData = data;
        /* 取消关注撤销功能 */
        // 给获取到的数据写入一个标记属性fullow:true,当取消关注的时候fullow:false，
        // 但不更新页面数据，单独修改这个用户，然后判断显示按钮
        // 当刷新/下次进来，就会真的消失了
        const fullowData = data.map(item => {
          return { ...item, fullow: true };
        });
        this.attantData = fullowData;
        console.log(this.attantData);
      });
    },
    backPerson() {
      this.$router.back();
    },
    // 取消关注
    cancelAttent(obj) {
      this.$axios({
        // url: "http://localhost:3000/user_unfollow" + id,
        url: "/user_unfollow/" + obj.id,
        method: "get"
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
      }).then(res => {
        console.log(res.data);
        const { message } = res.data;
        if (message == "取消关注成功") {
          // this.attentEvent();
          // 修改关注用户中标记的属性
          this.attantData[obj.index].fullow = false;
        }
      });
    },
    // 关注
    confirmAttent(obj) {
      this.$axios({
        url: "/user_follows/" + obj.id
      }).then(res => {
        console.log(res);
        if (res.data.message == "关注成功") {
          this.attantData[obj.index].fullow = true;
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
</style>