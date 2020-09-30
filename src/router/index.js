import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 
  {
    path: '/',
    redirect:"/home"
  },
  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/login.vue")
  },
  // 主页
  {
    path:"/home",
    name:"Home",
    component:()=>import("../views/home.vue")
  },
  // 个人中心
  {
    path: "/user",
    name: "User",
    component: () => import("../views/users/user.vue")
  },
  // 个人信息
  {
    path: "/info",
    name: "Info",
    component: () => import("../views/users/info.vue")
  },
  // 版本信息
  {
    path: "/version",
    name: "Version",
    component: () => import("../views/users/version.vue")
  },
  //客户列表页
  {
    path: "/custlist",
    name: "CustList",
    component: () => import("../views/cust/custlist.vue")
  },
  //客户主页
  {
    path: "/cust/:id",
    name: "Cust",
    component: () => import("../views/cust/cust.vue")
  },
  //修改或新增客户  动态参数加问号 代表可有可无 没有问号就是跳转必须携带参数过去
  {
    path: "/cust-edit/:id?",
    component: () => import("../views/cust/cust-edit.vue")
  },
  //客户详情页
  {
    path: "/custinfo/:id",
    component: () => import("../views/cust/cust-info.vue")
  },
  // 获取走访列表信息详情
  {
    path: "/visit-list/:custId?/:custName?",
    component: () => import("../views/visit/visit-list.vue")
  },
  // 新增走访客户信息
  {
    path: "/visit-edit/:custId?/:custName?",
    component: () => import("../views/visit/visit-edit.vue")
  },
  // 获取走访 id 信息详情
  {
    path: "/visit-info/:id",
    component: () => import("../views/visit/visit-info.vue")
  },
  // 消息中心列表
  {
    path: "/message-list",
    component: () => import("../views/message/message-list.vue")
  },
  // 消息中心详情
  {
    path: "/message-info/:id",
    component: () => import("../views/message/message-info.vue")
  },
  // 跳转404页面
  {
    path: '/404',
    component: () => import("../views/404.vue")
  },
  // 统配用户输入的不存在的地址重定向到404页面
  {
    path:"/*",
    redirect:"/404"
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let token=localStorage.getItem("token")
  // 如果是去往登录页 或者 没有本地token就重定向到登录页
  if(to.fullPath=="/login"){
    next()
  } else if (!token){
    next("/login")
  }

  // 其他有token的情况下就不阻碍
  next()
})


export default router
