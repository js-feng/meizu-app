import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
//解决vue-router升级导致的Uncaught(in promise) navigator问题

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location,onResolve,onReject){
  if(onResolve || onReject) return originalPush.call(this,location,onResolve,onReject)
    return originalPush.call(this,location).catch(err => err)
  
}


const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta:{
      ifShowTabbar:true
    },
    component: Home,
    children:[
      {
        path:'popup',
        name:'MyPopup',
        component: () => import('@/views/MyPopup.vue')
      }
    ]
  },
  //专题路由
  {
    path:'/topic',
    name:'Topic',
    meta:{
      ifShowTabbar:true
    },
    component:() => import('@/views/Topic.vue')
  },
  //分类路由
  {
    path:'/category',
    name:'Category',
    meta:{
      ifShowTabbar:true
    },
    component:() => import('@/views/Category.vue')
  },
  //购物车路由
  {
    path:'/cart',
    name:'Cart',
    meta:{
      ifShowTabbar:true
    },
    component:() => import('@/views/Cart.vue')
  },
  //我的路由
  {
    path:'/user',
    name:'User',
    meta:{
      ifShowTabbar:true
    },
    component:() => import('@/views/User.vue')
  },
  //产品详情路由
  {
    path:'/productdetail',
    name:'ProductDetail',
    component:() => import('@/views/ProductDetail.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]


const router = new VueRouter({
  routes
})


//to代表即将进入的路由
//from代表即将离开的路由
//next() ,每一个导航守卫至少搭配一个next()
//导航守卫
router.beforeEach((to,from,next) =>{
   //想要进入购物车页面
   let token = localStorage.getItem('token')
   if(to.path == '/cart'){
      if(token){
        next()
      }else{
        //路由中无this => undefined
        Vue.prototype.$toast('请先登录')
        setTimeout(() => {
          next('/user')
        },1000)
      }
      return 
   }
   next()
})

export default router
