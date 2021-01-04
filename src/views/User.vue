<template>
  <div class="user">
    <van-row @click="openModal">
      <van-col span="6">
        <img :src="avatarSrc" alt="" />
      </van-col>
      <van-col span="10" @click="onLogin">{{ nickName }}</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!--表单弹框区域-->

    <!--九宫格布局-->
    <van-grid square :column-num="3">
      <van-grid-item icon="orders-o" text="我的订单" @click="iconClick" />
      <van-grid-item icon="gold-coin-o" text="优惠券" @click="iconClick" />
      <van-grid-item icon="credit-pay" text="礼品卡" @click="iconClick" />
      <van-grid-item icon="star-o" text="我的收藏" @click="iconClick" />
      <van-grid-item icon="eye-o" text="我的足迹" @click="iconClick" />
      <van-grid-item icon="medal-o" text="会员福利" @click="iconClick" />
      <van-grid-item icon="location-o" text="地址管理" @click="iconClick" />
      <van-grid-item
        icon="browsing-history-o"
        text="账号安全"
        @click="iconClick"
      />
      <van-grid-item icon="service-o" text="联系客服" @click="iconClick" />
      <van-grid-item icon="question-o" text="帮助中心" @click="iconClick" />
      <van-grid-item icon="records" text="意见反馈" @click="iconClick" />
    </van-grid>

    <!--弹出层-->
    <div class="login" v-if="show">
      <div class="opcity" @click="showLogin"></div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>

//导入登录接口获取token
import { goLogin } from '@/request/api.js'
export default {
  data() {
    return {
      avatarSrc: require('@/assets/logo.png'),
      show: false,
      username: '',
      password: '',
      //用户民
      nickName: "点击登录"

    }
  },
  created() {
    let token = localStorage.getItem('token')
    if (token) {
      let userInfo = localStorage.getItem('userInfo')
      let newUserInfo = JSON.parse(userInfo);
      this.avatarSrc = newUserInfo.avatar
      this.nickName = newUserInfo.username
    }
  },
  methods: {
    onLogin() {
      this.show = true
    },
    onSubmit(values) {

      //调用接口获取token ，然后将token存到localstorage中
      goLogin({
        username: values['用户名'],
        pwd: values['密码']
      }).then(res => {

        //将token和userinfo存到localStorage中
        if (res.data.errno == 0) {
          let { token, userInfo } = res.data.data;
          let newUserInfo = JSON.stringify(userInfo);
          localStorage.setItem('token', token)
          localStorage.setItem('userInfo', newUserInfo)
          this.$toast.success('登录成功')
          //修改用户头像和昵称
          this.avatarSrc = userInfo.avatar
          this.nickName = userInfo.username
          setTimeout(() => {
            this.show = false
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showLogin() {
      this.show = false
    },
    //点击打开模态框
    openModal() {
      //获取token
      let token = localStorage.getItem('token');
      if (!token) {
        this.show = true
      } else {
        this.show = false
      }
    },
    iconClick() {
      this.$toast.success('该功能开发中....')
    }
  }
}
</script>

<style lang="less" scoped>
.van-row {
  width: 100%;
  background-color: #183f64f3;

  .van-col {
    padding: 0.2rem 4%;
    color: #fff;

    line-height: 0.8rem;
    img {
      width: 0.8rem;
      border-radius: 50%;
      background-color: rgb(28, 247, 46);
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.login {
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .opcity {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
  }
  .van-form {
    position: absolute;
    top: 40vh;
    background-color: #fff;
    width: 90%;
    border-radius: 0.16rem;
    padding: 0.1rem;
  }
}
</style>