<template>
  <div>
    <comment :comment="item" v-for="item in commentList" :key="item.id" />
  </div>
</template>

<script>
import comment from "@/components/comment/Index";
export default {
  components: {
    comment
  },
  data() {
    return {
      commentList: [
        {
          content: "这个文章可以呀",
          parent: {
            content: "你觉得这个文章怎么样？"
          }
        },
        {
          content: "666",
          parent: {
            content: "这栋楼多少钱"
          }
        },
        {
          content: "这有是啥玩意",
          parent: {
            content: "爱的魔力转圈圈",
            parent: {
              content: "想跳什么舞呢？"
            }
          }
        }
      ]
    };
  }
};
</script>