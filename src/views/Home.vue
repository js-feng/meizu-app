<template>
  <div class="home">
    <van-search
      v-model="searchValue"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @click="skip"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="purple">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img
          :src="item.image_url"
          style="width: 100%; height: 100%; display: block"
        />
      </van-swipe-item>
    </van-swipe>
    <!--popup动画过度页面-->
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

//引入axios
import axios from 'axios'
//按需引入首页数据请求模块
import { getHomeData } from '@/request/api.js'
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      searchValue: "",
      banners: []
    }
  },
  created() {
    getHomeData().then(res => {
      if (res.data.errno == 0) {
        this.banners = res.data.data.banner

      }
    }).catch(err => {
      console.log(err)
    })

  },
  methods: {
    skip() {
      this.$router.push('/home/popup')
    }
  }
}
</script>
