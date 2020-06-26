import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 1、导入vant-ui组件库
import Vant, { Toast, Dialog, ActionSheet, Uploader } from 'vant'
// 2、引入的组件的css文件
import 'vant/lib/index.css'
// 3、注册vant-ui组件库
Vue.use(Vant, Dialog, ActionSheet, Uploader)
// Vue.use(Dialog)
// Vue.use(ActionSheet)

// 导入axios第三方包
import axios from 'axios'
//把axios绑定在vue的原型上
Vue.prototype.$axios = axios

// 设置全局的axios默认的基准路径
axios.defaults.baseURL = "http://localhost:3000"

// 设置axios请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  if (!config.headers.Authorization && localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config
})

// 设置axios响应拦截器
axios.interceptors.response.use(res => {
  // console.log(res.data);
  const { message, statusCode } = res.data
  if (statusCode == 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    Toast.fail(message)
    router.replace("login")
  }
  return res
})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

// 页面权限访问控制-全局路由守卫
// 主要是防止用户在没有登录权限的情况下进入到个人中心页
router.beforeEach((to, from, next) => {
  // console.log("to", to);
  // console.log("from", from);
  // 若进入的目标路径是个人中心页
  if (to.path === "/index") {
    const token = localStorage.getItem("token");
    // 是否有token
    if (token) {
      return next()
    } else {
      return router.push("/login").catch(err => { })
    }
  }
  // 若不是，则直接调用next放行函数
  console.log("进入了路由守卫");
  next()
})
