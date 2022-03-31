export default [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: 'auth/SystemApiControl',
        name: 'SystemApiControl',
        component: () => import('@/views/Dashboard/Admin/Auth/SystemApiControl.vue'),
        meta: {
          title: '系统菜单维护',
        },
      },
    ],
  },
]
