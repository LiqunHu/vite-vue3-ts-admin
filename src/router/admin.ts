export default [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/Dashboard.vue'),
    children: [
      {
        path: 'auth/SystemApiControl',
        name: 'SystemApiControl',
        component: () => import('@/views/Admin/Auth/SystemApiControl.vue'),
        meta: {
          title: '系统菜单维护',
        },
      },
    ],
  },
]
