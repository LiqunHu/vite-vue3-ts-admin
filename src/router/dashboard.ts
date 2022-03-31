export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Dashboard/Home/Home.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
]
