<template>
  <div class="tabbar">
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      route
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/topic">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  }
}
</script>

<style>
</style>