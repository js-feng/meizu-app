<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//引入axios
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    let qq = qs.stringify({ num: 123 })
    axios.post('/postdata', {
      data: qq
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
