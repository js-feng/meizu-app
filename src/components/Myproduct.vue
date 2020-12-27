<template>
  <div class="product">
    <van-dropdown-menu>
      <van-dropdown-item disabled title="综合" />
      <van-dropdown-item v-model="value1" :options="option1" title="价格" />
      <van-dropdown-item
        v-model="value2"
        :options="filterCategory"
        title="分类"
      />
    </van-dropdown-menu>
    <van-empty v-if="isEmpty" description="没有找到相关产品" />
    <Product v-else :goodsList="goodsList" />
  </div>
</template>

<script>
//引入产品列表组件
import Product from './product.vue'
export default {
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      isEmpty: false
    }
  },
  props: ['goodsList', 'filterCategory'],
  components: {
    Product
  }
}
</script>

<style>
</style>