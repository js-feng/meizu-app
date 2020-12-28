<template>
  <div>
    <!--热门搜索与历史搜索-->
    <div class="history" v-if="isHistory">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete-o" @click="clearFn" />
      </div>
      <div class="down">
        <van-tag
          type="default"
          v-for="(item, index) in historyKeywordList"
          :key="index"
          @click="tagClick(item)"
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
          @click="tagClick(item.keyword)"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
//导入清除历史记录的数据
import { clearHistory } from '@/request/api.js'
export default {
  data() {
    return {
      isHistory: true
    }
  },
  props: ['historyKeywordList', 'hotKeywordList'],
  methods: {
    tagClick(item) {
      //进行子传父
      this.$emit('tagClick', item)
    },
    //清除历史记录
    clearFn() {
      //发送请求清除历史记录数据
      clearHistory().then(res => {
        if (res.data.errno == 0) {
          this.$toast.success('清除成功')
          setTimeout(() => {
            this.isHistory = false
          }, 500)
        }
      }).catch(err => {
        console.log(err)
      })

    }
  },
  created() {

  }

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