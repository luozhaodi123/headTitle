<template>
  <div>
    <div class="head">
      <div class="iconfont iconjiantou2" @click="goBack"></div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索关键词" v-model="textValue" />
      </div>
      <div class="searchBtn" @click="search">搜索</div>
    </div>
    <div class="suggestion" v-if="postList.length == 0">
      <div class="history">
        <div class="histBox">
          <div class="title">历史记录</div>
          <div class="clear right" @click="showTip = true">
            <img class="trash" src="@/assets/trash.png" alt />
          </div>
        </div>
        <div class="histWord">
          <div
            class="word"
            @click="sendSuggestion(item)"
            v-for="(item,index) in hostoryList"
            :key="index"
          >{{item}}</div>
        </div>
      </div>
      <div class="hot">
        <div class="histBox">
          <div class="title">热门搜索</div>
          <div class="flash right" @click="switchList">
            换一换
            <img src="@/assets/flash.png" alt />
          </div>
        </div>
        <div class="hotWord">
          <div
            class="words"
            @click="sendSuggestion(item.hotWord)"
            v-for="(item,index) in hotList"
            :key="index"
          >
            <div class="rank">{{index+1}}</div>
            <div class="cont">{{item.hotWord}}</div>
            <!-- <div class="number">{{item.number+"万"}}</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <newList @clicked="toArticleDetail" :post="item" v-for="item in postList" :key="item.id" />
    </div>
    <!-- 删除历史记录提示框 -->
    <van-dialog
      v-model="showTip"
      title="提示"
      message="是否要清空历史记录？"
      show-cancel-button
      @confirm="clearList"
    ></van-dialog>
  </div>
</template>

<script>
import newList from "@/components/newsList";
export default {
  components: {
    newList
  },
  data() {
    return {
      textValue: "",
      postList: [],
      hostoryList: [],
      hotList: [
        { hotWord: "华为首发计算战略", number: 491 },
        {
          hotWord: "双语阅读耿直！",
          number: 474
        },
        { hotWord: "阿信分享《说好不哭》幕后故事", number: 456 },
        { hotWord: "美女一首《亲爱的姑娘我爱你》", number: 441 },
        { hotWord: "关晓彤，下雨了回家收衣服吧", number: 411 },
        { hotWord: "王祖贤在就餐时被拍", number: 398 }
      ],
      showTip: false
    };
  },
  created() {
    // 获取本地存储中历史搜索记录
    // console.log(localStorage.getItem("history"));
    if (localStorage.getItem("history")) {
      const history = localStorage.getItem("history");
      this.hostoryList = JSON.parse(history);
    }
  },
  watch: {
    // 监听textValue的变化
    textValue(newVal) {
      if (newVal == "") {
        this.postList = [];
      }
    }
  },
  methods: {
    // 搜索
    search() {
      if (!this.textValue) {
        this.$toast("请输入关键字");
        return;
      }
      // 判断关键词是否已经在hostoryList中
      if (!this.hostoryList.includes(this.textValue)) {
        this.hostoryList.push(this.textValue);
      }
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.textValue
        }
      }).then(res => {
        // console.log(res.data.data);
        if (res.data.data.length > 0) {
          this.postList = res.data.data;
          // 将搜索记录存储在本地存储中，防止下次刷新原来的记录不见了
          localStorage.setItem("history", JSON.stringify(this.hostoryList));
        } else {
          this.$toast("没有搜索到你想要的文章");
        }
      });
    },
    // 返回上一层
    goBack() {
      if (this.postList.length > 0) {
        this.postList = [];
        this.textValue = "";
      } else {
        this.$router.back();
      }
    },
    // 点击搜索记录发送搜索请求搜索数据
    sendSuggestion(value) {
      this.textValue = value;
      this.search();
    },
    // 清空当前的历史记录
    clearList() {
      this.hostoryList = [];
      localStorage.removeItem("history");
    },
    // 跳转到文章详情页
    toArticleDetail(id) {
      this.$router.push("/articleDetail/" + id);
    },
    // 刷新热点搜索
    switchList() {
      console.log("刷新热点搜索");
      let newHotList = [];
      const length = this.hotList.length;
      let listIndex = Math.floor(Math.random() * length);
      while (newHotList.length < length) {
        if (!newHotList.includes(this.hotList[listIndex])) {
          newHotList.push(this.hotList[listIndex]);
        } else {
          listIndex = Math.floor(Math.random() * length);
        }
      }
      // console.log(newHotList);
      this.hotList = newHotList;
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2.78vw 5.56vw;
  box-sizing: border-box;
  background-color: #fff;
  // z-index: 9999;
  .search {
    display: flex;
    align-items: center;
    flex: 1;
    border-radius: 4.44vw;
    border: 1px solid #ccc;
    margin: 0 10px;
    padding: 10px 4.44vw;
    .iconsearch {
      padding-right: 1.39vw;
      font-size: 4.17vw;
    }
    input {
      border: 0;
      flex: 1;
      &::placeholder {
        font-size: 4.17vw;
        color: #333;
      }
    }
  }
  .searchBtn {
    font-size: 3.89vw;
    color: #333;
  }
}
.suggestion {
  margin: 55px 5.56vw 0;
  .histBox {
    display: flex;
    align-items: center;
    padding: 2.78vw 0;
    .title {
      flex: 1;
      font-size: 3.89vw;
      font-weight: 700;
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 3.61vw;
      color: #868686;
      img {
        width: 3.61vw;
        height: 3.61vw;
        margin-left: 2px;
      }
      .trash {
        width: 6.67vw;
        height: 6.67vw;
      }
    }
  }
  .history {
    margin-bottom: 2.78vw;
    border-bottom: 1px solid #ccc;
    .histWord {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0 10px;
      .word {
        margin: 1.11vw 1.39vw;
        padding: 2.22vw 4.17vw;
        background-color: #f1f3f4;
        font-size: 3.33vw;
        color: #333;
        border-radius: 5.56vw;
      }
    }
  }
  .hot {
    .title {
      font-size: 3.89vw;
      font-weight: 700;
    }
    .hotWord {
      & > div:nth-child(1) .rank {
        background-color: red;
      }
      & > div:nth-child(2) .rank {
        background-color: orangered;
      }
      & > div:nth-child(3) .rank {
        background-color: orange;
      }
      .words {
        display: flex;
        align-items: center;
        padding: 4.17vw 0;
        border-bottom: 1px solid #ccc;
        font-size: 3.89vw;
        .rank {
          width: 4.17vw;
          height: 4.17vw;
          line-height: 4.17vw;
          text-align: center;
          background-color: skyblue;
          color: #fff;
        }
        .cont {
          flex: 1;
          color: blue;
          margin-left: 2.78vw;
        }
        .number {
          color: #333;
        }
      }
    }
  }
}
.content {
  margin-top: 16.67vw;
}
</style>