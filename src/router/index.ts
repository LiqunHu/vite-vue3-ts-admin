import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue')
  },
  { path: '/', redirect: { name: 'Login' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router