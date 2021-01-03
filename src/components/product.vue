<template>
  <ul>
    <li v-for="item in goodsList" :key="item.id" @click="goToDetail(item.id)">
      <img :src="item.list_pic_url" alt="" style="display: block" />
      <p class="van-ellipsis">{{ item.name }}</p>
      <span>{{ item.retail_price | filterMoney }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: require('@/assets/logo.png')
    }
  },
  props: ['goodsList'],
  created() {

  },
  methods: {
    //跳转到产品详情页面
    goToDetail(id) {
      this.$router.push('/productdetail?id=' + id)
    }
  }

}
</script>

<style lang="less" scoped>
ul {
  padding: 0.1rem 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  li {
    width: 49%;
    background-color: #fff;
    text-align: center;
    margin-bottom: 0.1rem;
    img {
      width: 100%;
    }
    p {
      margin-bottom: 0.1rem;
    }
    span {
      color: darkred;
      margin-top: 0.1rem;
    }
  }
}
</style>