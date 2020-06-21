<template>
  <!-- :class="isFlag?'success':'error'" -->
  <input
    :type="textType"
    :placeholder="textPlaceholder"
    v-model="inputVal"
    :class="{
    error: !isFlag
  }"
    @blur="showTips"
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
    showTips() {
      if (!this.isFlag) {
        // alert(this.errMsg);
        this.$toast(this.errMsg);
      }
    }
  },
  watch: {
    inputVal(newVal) {
      this.$emit("InputVal", newVal);
      const regExp = new RegExp(this.rule);
      this.isFlag = regExp.test(newVal);
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