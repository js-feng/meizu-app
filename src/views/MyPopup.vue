<template>
  <div class="mypopup">
    <!--搜索框-->
    <van-search
      v-model="iptVal"
      show-action
      :placeholder="iptPlaceholder"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!--历史搜索和热门搜索单独抽离成立一个组件-->
    <History
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
    />
  </div>
</template>

<script>
//引入热门搜索和历史搜索
import History from '@/components/History.vue'
//按需导入搜索窗口数据
import { getSearchData } from '@/request/api.js'

export default {
  components: { History },
  data() {
    return {
      iptVal: "",
      //默认的搜索框数据
      iptPlaceholder: "",
      //历史搜索数据
      historyKeywordList: [],
      //热门搜索数据
      hotKeywordList: []
    }
  },
  component: {
    History
  },
  created() {
    getSearchData().then(res => {
      if (res.data.errno == 0) {
        //保存placeHolder里面的默认数据
        this.iptPlaceholder = res.data.data.defaultKeyword.keyword
        //保存历史搜索数据
        this.historyKeywordList = res.data.data.historyKeywordList
        //保存热门搜索数据
        this.hotKeywordList = res.data.data.hotKeywordList
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    //开始搜索
    onSearch() {

    },
    //取消搜索
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="less" scoped>
.mypopup {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #efefef;
}
</style>