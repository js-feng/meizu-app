<template>
  <div class="shopcart">
    <van-goods-action class="goodsActions">
      <van-goods-action-icon
        :icon="ifSave ? 'star' : 'star-o'"
        :text="ifSave ? '已收藏' : '收藏'"
        @click="isCollection"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="danger" @click="buyNow" text="立即购买" />
      <van-goods-action-button type="warning" text="加入购物车" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifSave: false
    }
  },
  methods: {
    buyNow() {
      this.$toast("该功能暂未开放")
    },
    isCollection() {
      this.ifSave = !this.ifSave
    }
  }
}
</script>

<style lang="less" scoped>
.goodsActions {
  z-index: 9999;
  cursor: pointer;
}
</style>