import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import dashboard from './dashboard'
import admin from './admin'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
  },
  ...dashboard,
  ...admin,
  { path: '/', redirect: { name: 'Login' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
