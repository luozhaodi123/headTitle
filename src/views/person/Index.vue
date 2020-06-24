<template>
  <!-- :src="'http://localhost:3000'+userData.head_img" -->
  <div>
    <div class="person" v-if="userData" @click="editClick">
      <img
        v-if="userData.head_img"
        :src="this.$axios.defaults.baseURL+userData.head_img"
        class="touxian"
        alt
      />
      <img v-else src="@/assets/logo.png" class="touxian" alt />
      <div class="decs">
        <span class="iconfont iconxingbienv" v-if="userData.gender==0"></span>
        <span class="iconfont iconxingbienan" v-else></span>
        {{userData.nickname}}
        <div class="time">{{userData.create_date.split("T")[0]}}</div>
      </div>
      <div class="iconfont iconjiantou1"></div>
    </div>
    <navBar textNavBarL="我的关注" textNavBarM="关注的用户" @clicked="attention" />
    <navBar textNavBarL="我的跟帖" textNavBarM="跟帖/回复" @clicked="comment" />
    <navBar textNavBarL="我的收藏" textNavBarM="文章/视频" />
    <navBar textNavBarL="退出" textNavBarM="注销用户" @clicked="logout" />
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  components: {
    navBar
  },
  data() {
    return {
      userData: ""
    };
  },
  methods: {
    editClick() {
      this.$router.push("edit");
    },
    attention() {
      this.$router.push("attent");
    },
    comment() {
      this.$router.push("comment");
    },
    logout() {
      console.log("父组件接收到子组件的触发事件了");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$toast("已退出，返回登录页");
      setTimeout(() => {
        this.$router.replace({ path: "/login" });
      }, 2000);
    }
  },
  mounted() {
    this.$axios({
      // url: "http://localhost:3000/user/" + localStorage.getItem("userId"),
      url: "/user/" + localStorage.getItem("userId"),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res.data);
      const { message, data } = res.data;
      if (message == "获取成功") {
        this.userData = data;
      } else if (res.data.statusCode == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.$router.replace("login");
      }
      // console.log(this.userData);
    });
  }
};
</script>

<style lang="less" scoped>
.person {
  display: flex;
  align-items: center;
  padding: 6.67vw;
  border-bottom: 4px solid #ccc;
  .touxian {
    width: 19.44vw;
    height: 19.44vw;
    border-radius: 50%;
  }
  .decs {
    flex: 1;
    padding-left: 2.78vw;
    font-size: 3.89vw;
    color: #333;
    .time {
      margin-top: 1.39vw;
      color: #ccc;
    }
  }
  .iconxingbienv {
    color: pink;
  }
  .iconxingbienan {
    color: skyblue;
  }
}
</style>