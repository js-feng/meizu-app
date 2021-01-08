<template>
  <div class="cart">
    <van-checkbox v-model="checked">
      <van-card
        class="van-card"
        num="2"
        tag="标签"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        origin-price="10.00"
      />
    </van-checkbox>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  },
  methods: {
    onSubmit() {
      console.log(1);
    },
    onClickEditAddress() {
      console.log(修改地址);
    }
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
  bottom: 0.5rem;
}
.van-card {
  display: inline-block;
  width: 100%;
}
</style>