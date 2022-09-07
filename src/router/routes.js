
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/Admin/v2/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: () => import(/* webpackChunkName: "admin.dashboard" */'pages/Admin/Dashboard/IndexPage.vue')
      },
      {
        path: '/admin/settings',
        name: 'admin.settings',
        component: () => import(/* webpackChunkName: "admin.settings" */'pages/Admin/Settings/IndexPage.vue')
      },
      {
        path: '/admin/berita',
        component: () => import(/* webpackChunkName: "admin.berita" */'pages/Admin/Berita/IndexPage.vue'),
        children: [
          { path: '', name: 'admin.berita', component: () => import('pages/Admin/Berita/TablePage.vue') },
          {
            path: '/admin/berita/form/:id?',
            component: () => import(/* webpackChunkName: "admin.berita-slug" */ 'pages/Admin/Berita/FormPage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Web/WebLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', redirect: '/beranda' },
      { path: '/beranda', name: 'beranda', component: () => import('pages/Web/v1/Home/IndexPage.vue') },
      {
        path: '/berita',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', name: 'berita', component: () => import('src/pages/Web/v1/Berita/IndexPage.vue') },
          {
            path: 'page/berita/:slug',
            // meta: { carousel: false },
            component: () => import(/* webpackChunkName: "page-slug" */ 'src/pages/Web/v1/Berita/PageSlug.vue')
          }
        ]
      }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
