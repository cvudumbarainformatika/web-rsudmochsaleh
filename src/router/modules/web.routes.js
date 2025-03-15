export default {
  path: '/',
  component: () => import('layouts/Web/WebLayout.vue'),
  meta: { requireAuth: false },
  children: [
    { path: '', redirect: '/beranda' },
    {
      path: '/beranda',
      name: 'beranda',
      component: () => import(/* webpackChunkName: "web.home" */'pages/Web/v1/Home/IndexPage.vue')
    },
    {
      path: '/berita',
      component: () => import(/* webpackChunkName: "web.template" */'pages/Web/TemplateIndex.vue'),
      children: [
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
          component: () => import(/* webpackChunkName: "web.berita" */ 'src/pages/Web/v1/Berita/PageBerita.vue')
        }
      ]
    },
    // ... sisanya dari web routes
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
          component: () => import('src/pages/Web/v1/Pokja/PagePelayanan.vue')
        },
        {
          path: '/pokja/submenu/:page?',
          component: () => import('src/pages/Web/v1/Pokja/PageSubmenu.vue')
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
        },
        {
          path: '/ppid/submenu/:page?',
          component: () => import('src/pages/Web/v1/Ppid/PageSubmenu.vue')
        }
      ]
    },
    {
      path: '/pengaduan',
      component: () => import('pages/Web/TemplateIndex.vue'),
      children: [
        { path: '', redirect: '/pengaduan/all' },
        {
          path: '/pengaduan/:page?',
          name: 'pengaduan',
          component: () => import('src/pages/Web/v1/Pengaduan/PagePelayanan.vue')
        },
        {
          path: '/pengaduan/submenu/:page?',
          component: () => import('src/pages/Web/v1/Pengaduan/PageSubmenu.vue')
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
}
