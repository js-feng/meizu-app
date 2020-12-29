<template>
  <div class="mypopup">
    <!--搜索框-->
    <van-search
      v-model="iptVal"
      show-action
      :placeholder="iptPlaceholder"
      @search="onSearch"
      @input="onInput"
      @cancel="onCancel"
    />
    <!--历史搜索和热门搜索单独抽离成立一个组件-->
    <History
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
      v-if="blockShow == 1"
      @tagClick="tagClick"
    />
    <!--推荐列表单独抽离成组件-->
    <Mylist v-else-if="blockShow == 2" :arr="listArr" @cellClick="cellClick" />
    <!--产品区块也单独抽离成组件-->
    <Myproduct
      v-else
      :goodsList="goodsList"
      :filterCategory="filterCategory"
      @categoryChange="categoryChange"
      @priceChange="priceChange"
    />
  </div>
</template>

<script>
//引入热门搜索和历史搜索
import History from '@/components/History.vue'
//引入产品区块组件
import Myproduct from '@/components/Myproduct.vue'
//引入推荐列表数据
import Mylist from '@/components/Mylist.vue'
//按需导入搜索窗口数据
import { getSearchData, getSearchShopData, getTimeData } from '@/request/api.js'

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
      filterCategory: [],
      order: 'desc',
      categoryId: 0,
      sort: "id",
      listArr: []

    }
  },
  components: {
    History, Myproduct, Mylist
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
    //根据分类检索结果
    categoryChange(val) {
      //先改id再触发搜索
      this.categoryId = val;
      this.onSearch()
    },
    //根据价格检索结果
    priceChange(val) {
      this.order = val;
      this.sort = "price";
      this.onSearch()
    },
    //开始搜索
    onSearch() {
      getSearchShopData({
        keyword: this.iptVal,

        //搜索条件参数，根据参数触发搜索，将显示不同结果
        page: 1,
        size: 20,
        order: this.order,            //价格排序
        categoryId: this.categoryId,        //分类排序
        sort: this.sort
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


        }

      }).catch(err => {
        console.log(err)
      })
    },
    //取消搜索
    onCancel() {
      this.$router.go(-1)
    },
    //内容实施变化数据
    onInput() {
      //输入框内容发生改变时跳转到2
      this.blockShow = 2
      getTimeData({
        keyword: this.iptVal
      }).then(res => {
        if (res.data.errno == 0) {
          //保存实施热搜数据
          this.listArr = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //点击标签进行搜索逻辑
    tagClick(val) {
      //改变输入框的iptval的值 ，然后再进行一次调用搜索方法即可 
      this.iptVal = val
      this.onSearch()
    },
    cellClick(val) {
      this.iptVal = val
      this.onSearch()
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