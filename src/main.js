import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 1、导入vant-ui组件库
import Vant from 'vant'
// 2、引入的组件的css文件
import 'vant/lib/index.css'
// 3、注册vant-ui组件库
Vue.use(Vant)

// 导入axios第三方包
import axios from 'axios'
//把axios绑定在vue的原型上
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
