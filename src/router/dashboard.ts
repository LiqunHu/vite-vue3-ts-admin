export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layout/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]
