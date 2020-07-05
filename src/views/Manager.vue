<template>
  <div>
    <headBar textHead="我的栏目" @clicked="$router.back()" />
    <div class="removeList list">
      <div class="title">点击删除以下频道</div>
      <div class="listBox">
        <div
          class="lanmu"
          @click="removeList(index)"
          v-for="(item,index) in myList"
          :key="item.id"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="addList list">
      <div class="title">点击添加以下频道</div>
      <div class="listBox">
        <div
          class="lanmu"
          @click="addList(index)"
          v-for="(item,index) in allList"
          :key="item.id"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from "@/components/headBar";
export default {
  components: {
    headBar
  },
  data() {
    return {
      allList: [],
      myList: []
    };
  },
  created() {
    if (!localStorage.getItem("allList") && !localStorage.getItem("myList")) {
      this.getList();
    } else {
      this.allList = JSON.parse(localStorage.getItem("allList"));
      this.myList = JSON.parse(localStorage.getItem("myList"));
    }
  },
  watch: {
    // 监听两个栏目列表的变化
    allList(newVal) {
      localStorage.setItem("allList", JSON.stringify(newVal));
    },
    myList(newVal) {
      localStorage.setItem("myList", JSON.stringify(newVal));
    }
  },
  methods: {
    // 添加频道
    addList(index) {
      this.myList.push({ name: this.allList[index].name });
      this.allList.splice(index, 1);
    },
    // 删除频道
    removeList(index) {
      if (this.myList.length == 1) {
        return;
      } else {
        this.allList.push(this.myList[index]);
        this.myList.splice(index, 1);
      }
    },
    getList() {
      //  获取栏目
      this.$axios({
        url: "/category"
      }).then(res => {
        console.log(res.data.data);
        this.myList = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  padding: 0 5.56vw;
  .title {
    padding: 2.78vw 0;
    font-size: 3.89vw;
    color: #777;
  }
  .listBox {
    display: flex;
    flex-wrap: wrap;
    .lanmu {
      padding: 2.78vw 4.17vw;
      border: 1px solid #ccc;
      border-radius: 2.78vw;
      margin: 1.39vw;
    }
  }
}
</style>