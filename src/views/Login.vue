<template>
  <div>
    <div class="login">
      <div class="iconfont iconicon-test"></div>
      <div class="iconfont iconnew"></div>
      <form action>
        <label class="text">用户:</label>
        <InputDom
          textType="text"
          @InputVal="inputUser"
          textPlaceholder="用户名/手机号码"
          rule="^\d{3,11}$"
          errMsg="请输入正确的手机号"
        ></InputDom>
        <br />
        <label class="text">密码:</label>
        <InputDom
          textType="password"
          @InputVal="inputPwd"
          textPlaceholder="密码"
          rule="^.{3,9}$"
          errMsg="请输入3到9位的密码"
        ></InputDom>
        <br />
      </form>
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
      passWord: ""
    };
  },
  components: {
    InputDom,
    btnDom
  },
  methods: {
    login() {
      this.$axios({
        url: "http://localhost:3000/login",
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
          this.$toast("登录成功，两秒后跳转到首页");
          localStorage.setItem("token", res.data.data.token);
          setTimeout(() => {
            location.href = "/index";
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
    font-size: 7.5vw;
  }
  .iconnew {
    text-align: center;
    font-size: 35vw;
    color: #cc3300;
  }
  .text {
    display: inline-block;
    width: 11.11vw;
    height: 10vw;
    font-size: 4.44vw;
    line-height: 10vw;
  }
  .tips {
    text-align: center;
    line-height: 40px;
    margin-top: 20px;
    color: skyblue;
  }
}
</style>