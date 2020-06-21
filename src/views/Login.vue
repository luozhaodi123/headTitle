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
      console.log("父组件的事件被触发了");
      // console.log(this.userName, this.passWord);
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
}
</style>