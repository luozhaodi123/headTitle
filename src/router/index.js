import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Person from '../views/person/Index.vue'
import Edit from '../views/person/Edit.vue'
import Attent from '../views/person/Attent.vue'
import Comment from '../views/person/Comment.vue'
import Index from '@/views/Index.vue'
import Search from '@/views/Search.vue'
import Test from "@/views/Test.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    component: Test
  },
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/person',
    component: Person
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/attent',
    component: Attent
  },
  {
    path: '/comment',
    component: Comment
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: "/search",
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
