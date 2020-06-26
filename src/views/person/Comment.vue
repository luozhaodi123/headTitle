<template>
  <div>
    <headBar textHead="我的跟帖" @clicked="goback" />
    <div></div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";
export default {
  components: {
    headBar
  },
  methods: {
    goback() {
      this.$router.back();
    }
  },
  mounted() {
    this.$axios({
      url: "/user_comments",
      method: "get"
    }).then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style>
</style>