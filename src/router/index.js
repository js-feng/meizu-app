import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
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
    component:() => import('@/views/Topic.vue')
  },
  //分类路由
  {
    path:'/category',
    name:'Category',
    component:() => import('@/views/Category.vue')
  },
  //购物车路由
  {
    path:'/cart',
    name:'Cart',
    component:() => import('@/views/Cart.vue')
  },
  //我的路由
  {
    path:'/user',
    name:'User',
    component:() => import('@/views/User.vue')
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

export default router
