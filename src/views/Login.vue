<template>
  <div>
    <div class="login">
      <div class="iconfont iconicon-test" @click="close"></div>
      <div class="iconfont iconnew"></div>
      <div class="user">
        <img src="@/assets/user.png" alt />
        <InputDom
          textType="text"
          @InputVal="inputUser"
          textPlaceholder="用户名/手机号码"
          :rule="ruleUser"
          errMsg="请输入正确的手机号"
        ></InputDom>
      </div>
      <div class="user pwd">
        <img src="@/assets/pwd.png" alt />
        <InputDom
          textType="password"
          @InputVal="inputPwd"
          textPlaceholder="密码"
          :rule="rulePwd"
          errMsg="请输入3到9位的密码"
        ></InputDom>
      </div>
      <btnDom btnText="登录" @clickBtn="login"></btnDom>
      <div class="tips">
        <router-link to="/register">没有账号？跳转到注册页面</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import InputDom from "../components/InputDom";
import btnDom from "../components/btnDom";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      ruleUser: "^\\d{3,11}$",
      rulePwd: "^.{3,9}$"
    };
  },
  components: {
    InputDom,
    btnDom
  },
  methods: {
    close() {
      this.$router.back();
    },
    login() {
      // 在发送axios请求前，对数据进行校验
      if (!this.userName || !this.passWord) {
        this.$toast("亲，请输入完整信息...");
        return;
      }
      var regExpUser = new RegExp(this.ruleUser);
      if (!regExpUser.test(this.userName)) {
        this.$toast("用户名格式错误");
        return;
      }
      var regExpPwd = new RegExp(this.rulePwd);
      if (!regExpUser.test(this.passWord)) {
        this.$toast("密码格式错误");
        return;
      }
      this.$axios({
        // url: "http://localhost:3000/login",
        url: "/login",
        method: "post",
        data: {
          username: this.userName,
          password: this.passWord
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200 && !res.data.statusCode) {
          // alert("登录成功");
          // console.log(res.data.data.token);
          this.$toast("登录成功");
          const { data } = res.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          setTimeout(() => {
            // location.href = "/person";
            // this.$router.push("person"); //如果用户登录后到个人中心页又返回登录页，这样不好
            this.$router.replace({ path: "/person" });
          }, 2000);
        } else {
          // alert("用户名不存在或密码错误");
          this.$toast("用户不存在或密码错误");
        }
      });
    },
    inputUser(user) {
      this.userName = user;
    },
    inputPwd(pwd) {
      this.passWord = pwd;
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 5.56vw;
  box-sizing: border-box;
  .iconicon-test {
    width: 27px;
    height: 27px;
    font-size: 7.5vw;
  }
  .iconnew {
    text-align: center;
    font-size: 35vw;
    color: #f24e4d;
  }
  .user {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }

  .tips {
    text-align: center;
    line-height: 11.11vw;
    margin-top: 5.56vw;
    color: skyblue;
  }
}
</style>