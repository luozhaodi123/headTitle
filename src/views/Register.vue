<template>
  <div>
    <div class="register">
      <div class="iconfont iconicon-test"></div>
      <div class="iconfont iconnew"></div>
      <form action>
        <label for class="text">用户:</label>
        <InputDom
          textType="text"
          @InputVal="inputUser"
          textPlaceholder="用户名/手机号码"
          rule="^\d{3,11}$"
          errMsg="请输入正确的手机号"
        ></InputDom>
        <label for class="text">昵称:</label>
        <InputDom
          textType="text"
          @InputVal="inputNickName"
          textPlaceholder="昵称"
          rule="\w{5,11}"
          errMsg="请输入正确的昵称"
        ></InputDom>
        <label for class="text">密码:</label>
        <InputDom
          textType="password"
          @InputVal="inputPwd"
          textPlaceholder="密码"
          rule="^.{3,9}$"
          errMsg="请输入3到9位的密码"
        ></InputDom>
      </form>
      <btnDom btnText="注册" @clickBtn="register"></btnDom>
    </div>
  </div>
</template>

<script>
import InputDom from "../components/InputDom";
import btnDom from "../components/btnDom";
export default {
  components: {
    InputDom,
    btnDom
  },
  data() {
    return {
      userName: "",
      nickName: "",
      password: ""
    };
  },
  methods: {
    register() {
      console.log("父组件的事件被触发了");
    },
    inputUser(user) {
      this.userName = user;
    },
    inputPwd(pwd) {
      this.password = pwd;
    },
    inputNickName(nickname) {
      this.nickName = nickname;
    }
  }
};
</script>

<style lang="less" scoped>
.register {
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