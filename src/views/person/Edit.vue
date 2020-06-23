<template>
  <div>
    <div class="edit" v-if="userData">
      <div class="head">
        <div class="iconfont iconjiantou2" @click="backPerson"></div>
        <div class="text">编辑资料</div>
      </div>
      <img
        v-if="userData.head_img"
        class="touxian"
        :src="'http://localhost:3000'+userData.head_img"
        alt
        ref="imgDom"
      />
      <img v-else src="@/assets/logo.png" class="touxian" alt />
      <input type="file" name="userPic" id="InputFile" @change="selectImg" />
      <label for="InputFile" class="submitImg">
        <img src="@/assets/uploads_icon.jpg" style="width:30px;" alt />
      </label>
    </div>
    <navBar textNavBarL="昵称" :textNavBarM="userData.nickname" />
    <navBar textNavBarL="密码" :textNavBarM="userData.password" />
    <navBar textNavBarL="性别" v-if="userData.gender==1" textNavBarM="男" />
    <navBar textNavBarL="性别" v-else textNavBarM="女" />
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
    backPerson() {
      this.$router.back();
    },
    selectImg(e) {
      // console.log(e.target.files[0]);
      // 通过URL.createObjectURL生成一个临时的可访问的图片地址
      const file = URL.createObjectURL(e.target.files[0]);
      const ImgDom = this.$refs.imgDom;
      ImgDom.setAttribute("src", file);
    }
  },
  mounted() {
    this.$axios({
      url: "http://localhost:3000/user/" + localStorage.getItem("userId"),
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res.data);
      const { message, data } = res.data;
      if (message == "获取成功") {
        this.userData = data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.edit {
  padding: 20px 24px 0;
  .head {
    display: flex;
    align-items: center;
    .text {
      flex: 1;
      text-align: center;
      font-size: 14px;
    }
  }
  .touxian {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 10px auto;
  }
  #InputFile {
    font-size: 12px;
    padding: 0 25%;
    display: none;
  }
  .submitImg {
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
}
</style>