<template>
  <div class="btnWrapper">
    <button class="btn" @click="btnClick">{{btnText}}</button>
  </div>
</template>

<script>
export default {
  props: ["btnText"],
  methods: {
    btnClick() {
      console.log("子组件的事件被触发了");
      this.$emit("clickBtn");
    }
  }
};
</script>

<style>
.btn {
  width: 100%;
  height: 13.33vw;
  border: 0;
  font-size: 5vw;
  background-color: #cc3300;
  color: #fff;
  margin-top: 8.33vw;
  border-radius: 6.67vw;
}
</style>