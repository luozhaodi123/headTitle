<template>
  <!-- :class="isFlag?'success':'error'" -->
  <input
    :type="textType"
    :placeholder="textPlaceholder"
    v-model="inputVal"
    :class="{
    error: !isFlag
  }"
    @blur="missBlur"
  />
</template>

<script>
export default {
  props: ["textType", "textPlaceholder", "rule", "errMsg"],
  data() {
    return {
      inputVal: "",
      isFlag: true
    };
  },
  methods: {
    missBlur() {
      if (!this.isFlag) {
        alert("当前输入的内容不合法，请重新输入");
      }
    }
  },
  watch: {
    inputVal(newVal) {
      // console.log(newVal);
      this.$emit("InputVal", newVal);
      const regExp = new RegExp(this.rule);
      this.isFlag = regExp.test(newVal);
      // console.log(this.isFlag);
      if (!this.isFlag) {
        console.log(this.errMsg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
input {
  width: 74.44vw;
  height: 10vw;
  border: 1px solid #ccc;
  border-radius: 5vw;
  margin: 1.39vw 0;
  padding-left: 2.78vw;
  outline: none;
}
input.error {
  border-color: red;
}
</style>