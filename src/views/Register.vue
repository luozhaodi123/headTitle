<template>
  <div>
    <div class="register">
      <div class="iconfont iconicon-test close" @click="closeRegister"></div>
      <div class="iconfont iconnew"></div>
      <form action>
        <label class="text">用户:</label>
        <InputDom
          textType="text"
          @InputVal="inputUser"
          textPlaceholder="用户名/手机号码"
          :rule="ruleUser"
          errMsg="请输入正确的手机号"
        ></InputDom>
        <label class="text">昵称:</label>
        <InputDom textType="text" @InputVal="inputNickName" textPlaceholder="昵称"></InputDom>
        <label for class="text">密码:</label>
        <InputDom
          textType="password"
          @InputVal="inputPwd"
          textPlaceholder="密码"
          :rule="rulePwd"
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
      passWord: "",
      ruleUser: "^\\d{3,11}$",
      rulePwd: "^.{3,9}$"
    };
  },
  methods: {
    closeRegister() {
      this.$router.back();
    },
    register() {
      // console.log("父组件的事件被触发了");
      if (!this.userName || !this.nickName || !this.passWord) {
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
        // url: "http://localhost:3000/register",
        url: "/register",
        method: "post",
        data: {
          username: this.userName,
          password: this.passWord,
          nickname: this.nickName
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200 && !res.data.statusCode) {
          this.$toast("注册成功，两秒后跳转到登录页,请销后...");
          setTimeout(() => {
            this.$router.back();
          }, 2000);
        } else {
          this.$toast("该用户名已注册，请重新输入");
        }
      });
    },
    inputUser(user) {
      this.userName = user;
    },
    inputPwd(pwd) {
      this.passWord = pwd;
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
  .close {
    width: 27px;
    height: 27px;
  }
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