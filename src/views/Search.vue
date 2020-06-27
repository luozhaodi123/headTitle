<template>
  <div>
    <div class="head">
      <div class="iconfont iconjiantou2" @click="$router.back()"></div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索关键词" />
      </div>
      <div class="searchBtn">搜索</div>
    </div>
    <div class="history">
      <div class="title">历史记录</div>
      <div class="histWord">
        <div class="word">美女</div>
        <div class="word">帅哥</div>
        <div class="word">小姐姐</div>
        <div class="word">小哥哥</div>
      </div>
    </div>
    <div class="hot">
      <div class="title">热门搜索</div>
      <div class="hotWord">
        <div class="word">办公室小野否认解散</div>
        <div class="word">办公室小野否认解散</div>
        <div class="word">办公室小野否认解散</div>
        <div class="word">办公室小野否认解散</div>
        <div class="word">办公室小野否认解散</div>
        <div class="word">办公室小野否认解散</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  .search {
    flex: 1;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    border: 1px solid #ccc;
    margin: 0 10px;
    padding: 2px 16px;
    .iconsearch {
      padding-right: 5px;
      font-size: 15px;
    }
    input {
      border: 0;
      &::placeholder {
        font-size: 15px;
        color: #333;
      }
    }
  }
  .searchBtn {
    font-size: 14px;
    color: #333;
  }
}
.history {
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .histWord {
    overflow: hidden;
    .word {
      float: left;
      margin: 8px 10px 8px 0;
      font-size: 13px;
      color: #333;
    }
  }
}
.hot {
  padding: 20px;
  .title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .hotWord {
    width: 100%;
    overflow: hidden;
    .word {
      float: left;
      width: 50%;
      margin: 8px 0;
      font-size: 13px;
      color: #333;
    }
  }
}
</style>