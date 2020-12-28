<template>
  <div class="product">
    <van-dropdown-menu>
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item
        v-model="priceVal"
        :options="priceArr"
        title="价格"
        @change="priceChange"
      />
      <van-dropdown-item
        v-model="categoryVal"
        :options="filterCategory"
        title="分类"
        @change="categoryChange"
      />
    </van-dropdown-menu>
    <van-empty v-if="goodsList.length == 0" description="没有找到相关产品" />
    <Product v-else :goodsList="goodsList" />
  </div>
</template>

<script>
//引入产品列表组件
import Product from './product.vue'
export default {
  data() {
    return {
      priceVal: 0,
      categoryVal: '',
      //价格下拉的当前项
      priceArr: [
        { text: '价格由高到低', value: "desc" },
        { text: '价格由低到高', value: "asc" },

      ],

      isEmpty: false
    }
  },
  props: ['goodsList', 'filterCategory'],
  components: {
    Product
  },
  methods: {

    categoryChange(value) {
      //把value传到父组件mypopup里面
      this.$emit('categoryChange', value)
    },
    priceChange(value) {
      this.$emit('priceChange', value)
    }
  },
  mounted() {
    //遍历整个数组选中项，让其选中值等于跟后端数据一致，动态切换
    this.filterCategory.map((val, index) => {
      if (val.checked) {
        this.categoryVal = val.value;
      }
    })
  }
}
</script>

<style>
</style>