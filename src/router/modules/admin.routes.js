export default {
  path: '/setset',
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
        { path: '', name: 'admin.berita', component: () => import('pages/Admin/Berita/IndexTable.vue') },
        {
          path: '/admin/berita/form/:id?',
          component: () => import(/* webpackChunkName: "admin.berita-form" */ 'pages/Admin/Berita/FormPage.vue')
        }
      ]
    },
    // ... sisanya dari admin routes
    {
      path: '/admin/pelayanan',
      component: () => import(/* webpackChunkName: "admin.pelayanan" */'pages/Admin/Pelayanan/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.pelayanan', component: () => import('src/pages/Admin/Pelayanan/TablePage.vue') },
        {
          path: '/admin/pelayanan/submenu/:id?',
          component: () => import('src/pages/Admin/Pelayanan/Submenu/IndexPage.vue')
        },
        {
          path: '/admin/pelayanan/form/:id?',
          component: () => import('pages/Admin/Pelayanan/FormPage.vue')
        }
      ]
    },
    {
      path: '/admin/pokja',
      component: () => import('pages/Admin/Pokja/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.pokja', component: () => import('src/pages/Admin/Pokja/TablePage.vue') },
        {
          path: '/admin/pokja/submenu/:id?',
          name: 'submenu.pokja',
          component: () => import('src/pages/Admin/Pokja/Submenu/IndexPage.vue')
        },
        {
          path: '/admin/pokja/form/:id?',
          name: 'form.pokja',
          component: () => import('pages/Admin/Pokja/FormPage.vue')
        }
      ]
    },
    {
      path: '/admin/pengaduan',
      component: () => import('pages/Admin/Pengaduan/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.pengaduan', component: () => import('src/pages/Admin/Pengaduan/TablePage.vue') },
        {
          path: '/admin/pengaduan/submenu/:id?',
          name: 'submenu.pengaduan',
          component: () => import('src/pages/Admin/Pengaduan/Submenu/IndexPage.vue')
        },
        {
          path: '/admin/pengaduan/form/:id?',
          name: 'form.pengaduan',
          component: () => import('pages/Admin/Pengaduan/FormPage.vue')
        }
      ]
    },
    {
      path: '/admin/ppid',
      component: () => import('pages/Admin/Ppid/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.ppid', component: () => import('src/pages/Admin/Ppid/TablePage.vue') },
        {
          path: '/admin/ppid/form/:id?',
          component: () => import('pages/Admin/Ppid/FormPage.vue')
        },
        {
          path: '/admin/ppid/submenu/:id?',
          name: 'submenu.ppid',
          component: () => import('pages/Admin/Ppid/Submenu/IndexPage.vue')
        }
      ]
    },
    {
      path: '/admin/profil',
      component: () => import(/* webpackChunkName: "admin.profil" */'pages/Admin/Profil/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.profil', component: () => import('src/pages/Admin/Profil/IndexTable.vue') },
        {
          path: '/admin/profil/form/:id?',
          component: () => import(/* webpackChunkName: "admin.profil-form" */ 'pages/Admin/Profil/FormPage.vue')
        }
      ]
    },
    {
      path: '/admin/gallery_animasi',
      component: () => import('pages/Admin/Lottie/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.gallery_animasi', component: () => import('pages/Admin/Lottie/IndexTable.vue') }
        // {
        //   path: '/admin/berita/form/:id?',
        //   component: () => import( 'pages/Admin/Berita/FormPage.vue')
        // }
      ]
    },
    {
      path: '/admin/user',
      component: () => import(/* webpackChunkName: "admin.user" */'pages/Admin/User/IndexPage.vue'),
      children: [
        { path: '', name: 'admin.user', component: () => import('src/pages/Admin/User/IndexTable.vue') },
        {
          path: '/admin/user/form/:id?',
          component: () => import(/* webpackChunkName: "admin.user-form" */ 'pages/Admin/User/FormPage.vue')
        }
      ]
    }
  ]
}
