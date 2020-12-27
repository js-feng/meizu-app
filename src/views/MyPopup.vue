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
      v-if="blockShow == 1"
    />
    <!--产品区块也单独抽离成组件-->
    <Myproduct v-else :goodsList="goodsList" :filterCategory="filterCategory" />
  </div>
</template>

<script>
//引入热门搜索和历史搜索
import History from '@/components/History.vue'
//引入产品区块组件
import Myproduct from '@/components/Myproduct.vue'
//按需导入搜索窗口数据
import { getSearchData, getSearchShopData } from '@/request/api.js'

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
      hotKeywordList: [],
      //1:代表历史记录与热门搜索区块
      //2：代表列表区块
      //3：代表产品区块
      blockShow: 1,
      //商品数据列表
      goodsList: [],
      //筛选分类数据
      filterCategory: []
    }
  },
  components: {
    History, Myproduct
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
      getSearchShopData({
        keyword: this.iptVal
      }).then(res => {
        if (res.data.errno == 0) {
          //跳转到产品区块
          this.blockShow = 3

          //改造分类数据字段
          let arr = JSON.parse(JSON.stringify(res.data.data.filterCategory)
            .replace(/name/g, 'text').replace(/id/g, 'value'));
          //保存商品分类数据
          this.goodsList = res.data.data.goodsList
          //保存筛选分类数据


          this.filterCategory = arr
          console.log(this.goodsList)
          console.log(this.filterCategory)

        }

      }).catch(err => {
        console.log(err)
      })
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