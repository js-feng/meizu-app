import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vantui/index.js'
import '@/assets/css/reset.css'

Vue.config.productionTip = false
//过滤器
Vue.filter('filterMoney',function(val){
  let newVal = Number(val)
  return '￥ ' + newVal.toFixed(2) + ' 元'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
