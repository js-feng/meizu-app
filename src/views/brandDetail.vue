<template>
  <div class="branddetail">品牌详情列表啊</div>
</template>

<script>
//加载brandDetail进来
import { brandDetail } from '@/request/api.js'
export default {
  data() {
    return {

    }
  },
  created() {
    brandDetail({
      id: this.$route.query.id
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style>
</style>