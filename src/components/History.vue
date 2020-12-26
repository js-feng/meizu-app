<template>
  <div>
    <!--热门搜索与历史搜索-->
    <div class="history">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete-o" />
      </div>
      <div class="down">
        <van-tag
          type="default"
          v-for="(item, index) in historyKeywordList"
          :key="index"
          >{{ item }}</van-tag
        >
      </div>
    </div>

    <div class="history">
      <div class="top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag
          :type="item.is_hot == 1 ? 'danger' : 'default'"
          v-for="(item, index) in hotKeywordList"
          :key="index"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['historyKeywordList', 'hotKeywordList'],
  methods: {

  },

}
</script>

<style lang="less" scoped>
.history {
  padding: 0 2%;
  background-color: #fff;
  margin-bottom: 0.3rem;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    align-items: center;
    h4 {
      font-weight: normal;
    }
  }
  .down {
    .van-tag {
      font-size: 0.14rem;
      margin-right: 0.1rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>