<template>
  <div>
    <div class="edit" v-if="userData">
      <headBar textHead="编辑资料" @clicked="goback" />
      <div class="imgbox">
        <img
          v-if="userData.head_img"
          class="touxian"
          :src="this.$axios.defaults.baseURL+userData.head_img"
          alt
        />
        <img v-else src="@/assets/logo.png" class="touxian" alt />
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <navBar textNavBarL="昵称" :textNavBarM="userData.nickname" @clicked="showNick=true" />
    <navBar textNavBarL="密码" textNavBarM="*****" @clicked="showPwd=true" />
    <navBar textNavBarL="性别" :textNavBarM="userData.gender==1?'男':'女'" @clicked="showGender=true" />

    <!-- 弹出输入框组件 -->
    <van-dialog
      v-model="showNick"
      title="编辑昵称"
      show-cancel-button
      @confirm="nickName!=''?editProile({nickname:nickName}):tips('昵称')"
    >
      <van-field v-model="nickName" placeholder="请输入新昵称"></van-field>
    </van-dialog>
    <van-dialog
      v-model="showPwd"
      title="编辑密码"
      show-cancel-button
      @confirm="passWord!=''?editProile({password:passWord}):tips('密码')"
    >
      <van-field v-model="passWord" placeholder="请输入新密码" type="password"></van-field>
    </van-dialog>
    <!-- ActionSheet动作面板 -->
    <van-action-sheet v-model="showGender" :actions="genders" @select="setGender" cancel-text="取消" />
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import headBar from "@/components/headBar";
export default {
  components: {
    navBar,
    headBar
  },
  data() {
    return {
      userData: "",
      showNick: false,
      showPwd: false,
      showGender: false,
      nickName: "",
      passWord: "",
      genders: [
        {
          name: "小哥哥",
          gender: 1
        },
        {
          name: "小姐姐",
          gender: 0
        }
      ]
    };
  },
  methods: {
    // 修改失败错误提示
    tips(name) {
      this.$toast(name + "格式不正确，请重新修改");
    },
    // 封装加载新数据的函数
    loadPage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("userId"),
        method: "get"
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
      }).then(res => {
        console.log(res.data);
        const { message, data } = res.data;
        if (message == "获取成功") {
          this.userData = data;
        }
      });
    },
    goback() {
      this.$router.back();
    },
    // 封装修改数据请求的函数
    editProile(data) {
      this.$axios({
        url: "/user_update/" + localStorage.getItem("userId"),
        method: "post",
        data: data
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        } */
      }).then(res => {
        console.log(res.data);
        const { message } = res.data;
        if (message == "修改成功") {
          this.loadPage();
        }
      });
    },
    setGender(item) {
      console.log(item);
      const genderObj = {
        gender: item.gender
      };
      this.editProile(genderObj);
      this.showGender = false;
    },
    // 1、修改图片要先发送ajax请求上传图片
    // 2、上传图片后根据返回的图片地址在发送请求修改图片
    afterRead(fileObj) {
      // console.log(fileObj.file);
      const data = new FormData();
      data.append("file", fileObj.file);
      this.$axios({
        url: "/upload",
        method: "post",
        /* headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }, */
        data: data
      }).then(res => {
        // console.log(res.data);
        const { data } = res.data;
        this.editProile({ head_img: data.url });
      });
    }
  },
  mounted() {
    this.loadPage();
  }
};
</script>

<style lang="less" scoped>
.edit {
  padding: 5.56vw 6.67vw 0;
  .imgbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .touxian {
      display: block;
      width: 19.44vw;
      height: 19.44vw;
      border-radius: 50%;
      margin: 10px 0;
    }
    .van-uploader {
      position: absolute;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      opacity: 0;
    }
  }
}
</style>