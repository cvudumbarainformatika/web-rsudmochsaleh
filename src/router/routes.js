
const routes = [
  {
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
            component: () => import(/* webpackChunkName: "admin.berita-slug" */ 'pages/Admin/Berita/FormPage.vue')
          }
        ]
      },
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
        component: () => import('pages/Admin/Pelayanan/IndexPage.vue'),
        children: [
          { path: '', name: 'admin.pokja', component: () => import('src/pages/Admin/Pelayanan/TablePage.vue') },
          {
            path: '/admin/pokja/submenu/:id?',
            name: 'submenu.pokja',
            component: () => import('src/pages/Admin/Pelayanan/Submenu/IndexPage.vue')
          },
          {
            path: '/admin/pokja/form/:id?',
            name: 'form.pokja',
            component: () => import('pages/Admin/Pelayanan/FormPage.vue')
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
          // { path: '', name: 'berita', component: () => import(/* webpackChunkName: "index-berita" */'src/pages/Web/v1/Berita/IndexPage.vue') },
          {
            path: '',
            redirect: to => ({
              name: 'berita',
              params: { page: 'all' }
            })
          },
          {
            path: '/berita/:page?',
            name: 'berita',
            component: () => import(/* webpackChunkName: "page-berita" */ 'src/pages/Web/v1/Berita/PageBerita.vue')
          }
        ]
      },
      {
        path: '/pelayanan',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', redirect: '/pelayanan/all' },
          {
            path: '/pelayanan/:page?',
            name: 'pelayanan',
            component: () => import('src/pages/Web/v1/Pelayanan/PagePelayanan.vue')
          },
          {
            path: '/pelayanan/submenu/:page?',
            component: () => import('src/pages/Web/v1/Pelayanan/PageSubmenu.vue')
          }
        ]
      },
      {
        path: '/pokja',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', redirect: '/pokja/all' },
          {
            path: '/pokja/:page?',
            name: 'pokja',
            component: () => import('src/pages/Web/v1/Pelayanan/PagePelayanan.vue')
          },
          {
            path: '/pokja/submenu/:page?',
            component: () => import('src/pages/Web/v1/Pelayanan/PageSubmenu.vue')
          }
        ]
      },
      {
        path: '/ppid',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', redirect: '/ppid/all' },
          {
            path: '/ppid/:page?',
            name: 'ppid',
            component: () => import('src/pages/Web/v1/Ppid/PagePpid.vue')
          }
        ]
      },
      {
        path: '/profil',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', redirect: '/profil/all' },
          {
            path: '/profil/:page',
            name: 'profil',
            component: () => import('src/pages/Web/v1/Profil/PageProfil.vue')
          }
        ]
      },
      {
        path: '/buku-tamu',
        component: () => import('pages/Web/TemplateIndex.vue'),
        children: [
          { path: '', redirect: '/buku-tamu/public' },
          {
            path: '/buku-tamu/:page?',
            name: 'buku-tamu',
            component: () => import(/* webpackChunkName: "page-buku-tamu" */ 'src/pages/Web/v1/BukuTamu/PageBukuTamu.vue')
          }
        ]
      }
    ]
  },

  // login
  {
    path: '/setset/login',
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
