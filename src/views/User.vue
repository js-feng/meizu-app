<template>
  <div class="user">
    <van-row>
      <van-col span="6">
        <img :src="avatarSrc" alt="" />
      </van-col>
      <van-col span="10" @click="onLogin">点击登录</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!--表单弹框区域-->
    <van-dialog v-model="show" title="标题" show-cancel-button>
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
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarSrc: require('@/assets/logo.png'),
      show: false,
      username: '',
      password: '',
    }
  },
  methods: {
    onLogin() {
      this.show = true
    },
    onSubmit(values) {
      console.log('submit', values);
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
</style>