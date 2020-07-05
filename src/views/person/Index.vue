<template>
  <!-- :src="'http://localhost:3000'+userData.head_img" -->
  <div>
    <TopBar textHead="个人中心" @clicked="$router.back()" />
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
    <div class="list">
      <van-icon name="like-o" />
      <navBar class="itemList" textNavBarL="我的关注" textNavBarM="关注的用户" @clicked="attention" />
    </div>
    <div class="list">
      <van-icon name="comment-o" />
      <navBar class="itemList" textNavBarL="我的跟帖" textNavBarM="跟帖/回复" @clicked="comment" />
    </div>
    <div class="list">
      <van-icon name="star-o" />
      <navBar class="itemList" textNavBarL="我的收藏" textNavBarM="文章/视频" @clicked="star" />
    </div>
    <div class="list">
      <van-icon name="orders-o" />
      <navBar class="itemList" textNavBarL="我的栏目" textNavBarM="管理栏目" @clicked="manager" />
    </div>
    <btnDom btnText="退出登录" @clickBtn="logout" />
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import TopBar from "@/components/headBar";
import btnDom from "@/components/btnDom";
export default {
  components: {
    navBar,
    TopBar,
    btnDom
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
      this.$router.push("mycomment");
    },
    star() {
      this.$router.push("star");
    },
    manager() {
      this.$router.push("manager");
    },
    logout() {
      console.log("父组件接收到子组件的触发事件了");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$toast("已退出登录");
      setTimeout(() => {
        this.$router.replace({ path: "/" });
      }, 2000);
    }
  },
  mounted() {
    this.$axios({
      // url: "http://localhost:3000/user/" + localStorage.getItem("userId"),
      url: "/user/" + localStorage.getItem("userId"),
      method: "get"
      /* headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      } */
    }).then(res => {
      // console.log(res.data);
      const { message, data } = res.data;
      if (message == "获取成功") {
        this.userData = data;
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
  border-bottom: 4px solid #ddd;
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
  .iconjiantou1 {
    color: #333;
  }
  .iconxingbienv {
    color: pink;
  }
  .iconxingbienan {
    color: skyblue;
  }
}
.list {
  display: flex;
  align-items: center;
  margin-left: 20px;
  border-bottom: 1px solid #ccc;
  .itemList {
    flex: 1;
  }
  .van-icon {
    margin-right: 8px;
    font-size: 20px;
  }
}
.btnWrapper {
  margin: 0 20px;
}
</style>