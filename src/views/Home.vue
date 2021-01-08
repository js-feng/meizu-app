<template>
  <div class="home">
    <div v-if="$route.path == '/home'">
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
      <!--渲染频道列表-->
      <van-grid :column-num="5" class="channel">
        <van-grid-item
          :icon="item.icon_url"
          :text="item.name"
          v-for="item in channel"
          :key="item.id"
        />
      </van-grid>
      <!--品牌制造商相关内容-->
      <div class="title">品牌制造商直供</div>
      <ul>
        <li
          v-for="item in brandList"
          :key="item.id"
          @click="goToBrandDetail(item.id)"
        >
          <img :src="item.pic_url" alt="" />
          <h4>{{ item.name }}</h4>
          <span>{{ item.floor_price | filterMoney }}</span>
        </li>
      </ul>
    </div>
    <!--popup动画过度页面-->
    <transition name="van-slide-right">
      <router-view v-if="$route.path == '/home/popup'" />
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
      banners: [],
      //保存channel里面的数据
      channel: [],
      //品牌直供商
      brandList: []
    }
  },
  created() {
    getHomeData().then(res => {
      if (res.data.errno == 0) {
        console.log(res);
        this.banners = res.data.data.banner
        this.channel = res.data.data.channel
        this.brandList = res.data.data.brandList
        console.log(this.brandList);

      }
    }).catch(err => {
      console.log(err)
    })

  },
  methods: {
    skip() {
      this.$router.push('/home/popup')
    },
    goToBrandDetail(id) {
      this.$router.push('/branddetail?id=' + id)
      console.log(id);

    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: #efefef;
  .channel {
    margin-bottom: 0.2rem;
  }
  .title {
    text-align: center;
    padding: 0.16rem;
    background-color: #fff;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    li {
      width: 49.5%;
      margin: 0 0 0.03rem 0;
      height: 1rem;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      h4 {
        position: absolute;
        top: 0.12rem;
        left: 0.15rem;
        font-weight: normal;
        font-size: 0.15rem;
        color: #000;
      }
      span {
        position: absolute;
        top: 0.3rem;
        left: 0.15rem;
        color: darkred;
      }
    }
  }
}
</style>
