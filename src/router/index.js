import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Person from '../views/person/Index.vue'
import Edit from '../views/person/Edit.vue'
import Attent from '../views/person/Attent.vue'
import MyComment from '../views/person/MyComment.vue'

import Index from '@/views/Index.vue'
import Search from '@/views/Search.vue'
import Test from "@/views/Test.vue"
import Manager from "@/views/Manager.vue"

import Star from "@/views/person/star.vue"
import ArticleDetail from "@/views/articleDetail.vue"
import Morecom from "@/components/comment/morecom.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path: '/',
    name: "indexPage",
    component: Index
  },
  {
    path: '/login',
    name: "loginPage",
    component: Login
  },
  {
    path: '/register',
    name: "registerPage",
    component: Register
  },
  {
    path: '/person',
    name: "personPage",
    component: Person
  },
  {
    path: '/edit',
    name: "editPage",
    component: Edit
  },
  {
    path: '/attent',
    name: "attentPage",
    component: Attent
  },
  {
    path: '/star',
    name: "starPage",
    component: Star
  },
  {
    path: '/mycomment',
    name: "myCommentPage",
    component: MyComment
  },
  {
    path: '/index',
    name: "indexPage",
    component: Index
  },
  {
    path: "/search",
    name: "searchPage",
    component: Search
  },
  {
    // 设置动态传参的方式
    path: "/articledetail/:id",
    name: "articleDetailPage",
    component: ArticleDetail
  },
  {
    path: "/morecom/:id",
    name: "moreComPage",
    component: Morecom
  },
  {
    path: "/manager",
    name: "managerPage",
    component: Manager
  }
]

const router = new VueRouter({
  routes
})

export default router
