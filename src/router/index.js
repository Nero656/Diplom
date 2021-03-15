import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import adminPenal from '@/views/AdminPanel'
import adminPanelInd from '@/views/admin-panal/index'
import servesCreateForm from "@/views/admin-panal/serviceCreateForm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: adminPenal
  },
  {
    path: '/admin-panel',
    name: 'index',
    component: adminPanelInd
  }
]

const router = new VueRouter({
  routes
})

export default router
