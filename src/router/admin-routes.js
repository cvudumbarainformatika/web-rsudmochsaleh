export default [
  {
    path: '',
    component: () => import('pages/admin/DashboardPage.vue')
  },
  {
    path: 'users',
    component: () => import('pages/admin/UsersPage.vue')
  },
  {
    path: 'settings',
    component: () => import('pages/admin/SettingsPage.vue')
  }
  // Tambahkan route admin lainnya di sini
]
