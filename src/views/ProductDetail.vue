<template>
  <div class="productdetail">
    <!--渲染轮播图区域数据-->
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" alt="" style="width: 100%; display: block" />
      </van-swipe-item>
    </van-swipe>
    <!--抽离售后服务组件-->
    <MyTips />
    <!--产品信息-->
    <div class="info">
      <h4>{{ info.retail_price | filterMoney }}</h4>
      <p>{{ info.goods_brief }}</p>
      <span>{{ info.name }}</span>
    </div>
    <!--展示弹出层-->
    <van-cell class="popup" title="展示弹出层" is-link></van-cell>

    <!--商品参数-->
    <div class="goods-info">
      <h4>商品参数</h4>
      <div
        id="size"
        class="infodetail van-ellipsis"
        v-for="(item, index) in attribute"
        :key="index"
      >
        <span>{{ item.name }}</span>
        {{ item.value }}
      </div>
    </div>

    <!--产品描述信息 v-html可以解析后端返回过来的前端代码数据 遇到样式不管用时,在所需要解析的面前加/deep/即可-->

    <div class="goods_desc" v-html="goods_desc" style="overflow: hidden"></div>
    <!--常见问题模块-->
    <div class="text">
      <span>常见问题</span>
    </div>

    <ul class="question">
      <li v-for="(item, index) in issue" :key="index">
        <h5>{{ item.question }}</h5>
        <span>{{ item.answer }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
//引入产品详情数据请求
import { GetGoodsDetail } from '@/request/api.js'
//引入tips组件
import MyTips from '@/components/tips.vue'
export default {
  data() {
    return {
      gallery: [],
      info: {},
      //商品参数信息
      attribute: [],
      goods_desc: "",
      issue: []
    }
  },
  mounted() {

  },
  created() {
    GetGoodsDetail(
      { id: this.$route.query.id }
    ).then(res => {
      if (res.data.errno == 0) {
        console.log(res);
        //保存轮播图数据
        this.gallery = res.data.data.gallery
        //保存info里面的数据
        this.info = res.data.data.info
        //保存商品参数信息
        this.attribute = res.data.data.attribute
        //保存产品描述信息(图片介绍)
        this.goods_desc = res.data.data.info.goods_desc
        //保存常见问题数据
        this.issue = res.data.data.issue
        console.log(this.issue);


      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    MyTips
  }
}
</script>

<style lang="less" scoped>
.info {
  background-color: #fff;
  h4 {
    color: orange;
    font-weight: normal;
    font-size: 0.22rem;
    padding: 0.1rem 0 0.1rem 0.1rem;
  }
  p {
    font-size: 0.16rem;
    padding-left: 0.08rem;
    padding-bottom: 0.06rem;
  }
  span {
    display: inline-block;
    color: #bababb;
    padding-left: 0.08rem;
    padding-bottom: 0.08rem;
  }
}
.popup {
  margin-bottom: 0.2rem;
}
.goods-info {
  background-color: #fff;
  h4 {
    padding: 0.23rem;
  }
  .infodetail {
    background-color: #efefef;
    width: 88%;
    height: 0.4rem;
    margin: 0 auto;
    border-radius: 0.1rem;
    margin-bottom: 0.1rem;
    span {
      display: inline-block;
      width: 0.6rem;
      height: 100%;
      text-align: right;
      line-height: 0.4rem;
      color: rgb(155, 154, 154);
      padding-right: 0.2rem;
    }
  }
}
/deep/ .goods_desc {
  width: 100%;
  margin-bottom: 0.2rem;
  p {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }
}
.text {
  width: 100%;
  background-color: #fff;
  height: 0.5rem;
  position: relative;
  &::before {
    content: '';
    width: 50%;
    height: 2px;
    background-color: #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span {
    width: 30%;
    background-color: #fff;
    z-index: 2;
    display: block;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 0.5rem;
    font-size: 0.16rem;
    font-weight: bold;
  }
}
.question {
  padding: 0.15rem 4%;
  position: relative;
  li {
    h5 {
      font-size: 0.15rem;

      margin-bottom: 0.1rem;
    }
    span {
      font-size: 0.14rem;
      color: rgb(187, 185, 185);
      margin-bottom: 0.1rem;
      display: block;
      padding-left: 0.05rem;
    }
    &::before {
      content: '';
      width: 5px;
      height: 5px;

      background-color: darkred;
      position: absolute;
      left: 1%;
    }
  }
}
</style>