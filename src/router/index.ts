import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Dashboard/Home/Home.vue')
      },
    ],
  },
  { path: '/', redirect: { name: 'Login' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
