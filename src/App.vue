<template>
  <div id="app">
    <router-view />
    <Mytabbar v-if="$route.meta.ifShowTabbar == true" />
  </div>
</template>


<script>
//引入tabbar组件
import Mytabbar from '@/components/Mytabbar.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    Mytabbar
  },
  created() {

  }
}
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100%;
  background: #efefef;
}
html,
body {
  height: 100%;
}
html {
  font-size: 100px;
}
body {
  font-size: 0.14rem;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
