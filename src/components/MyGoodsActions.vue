<template>
  <div class="shopcart">
    <van-goods-action class="goodsActions">
      <van-goods-action-icon
        :icon="ifSave ? 'star' : 'star-o'"
        :text="ifSave ? '已收藏' : '收藏'"
        @click="isCollection"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="badge"
        v-model="badge"
      />
      <van-goods-action-button type="danger" @click="buyNow" text="立即购买" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
    </van-goods-action>
  </div>
</template>

<script>
//获取购物车数量

import { GetCartNum } from '@/request/api.js'
export default {
  data() {
    return {
      ifSave: false,
      //徽章数

    }
  },
  methods: {
    buyNow() {
      this.$toast("该功能暂未开放")
    },
    isCollection() {
      this.ifSave = !this.ifSave
    },
    addToCart() {
      //通过$emit传给父级,让父级可以使用这个方法
      this.$emit('addToCart')
    }
  },
  created() {

  },
  props: ["badge"]
}
</script>

<style lang="less" scoped>
.goodsActions {
  z-index: 9999;
  cursor: pointer;
}
</style>