export default {
  path: '/',
  component: () => import('layouts/Web/WebLayout.vue'),
  meta: { requireAuth: false },
  children: [
    { path: '', redirect: '/beranda' },
    {
      path: '/beranda',
      name: 'beranda',
      component: () => import(/* webpackChunkName: "web.home" */'pages/Web/v1/Home/IndexPage.vue'),
      meta: {
        title: 'Beranda - RSUD Moh Saleh',
        metaTags: [
          {
            name: 'description',
            content: 'Selamat datang di website resmi RSUD Moh Saleh - Pelayanan kesehatan terpercaya untuk masyarakat'
          },
          {
            property: 'og:description',
            content: 'Selamat datang di website resmi RSUD Moh Saleh - Pelayanan kesehatan terpercaya untuk masyarakat'
          },
          {
            property: 'og:title',
            content: 'Beranda - RSUD Moh Saleh'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:url',
            content: 'https://rsud.probolinggokota.go.id/beranda'
          },
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]
      }
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
          component: () => import(/* webpackChunkName: "web.berita" */ 'src/pages/Web/v1/Berita/PageBerita.vue'),
          meta: {
            title: 'Berita - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Berita terkini dari RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Berita - RSUD Moh Saleh'
              }
            ]
          }
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
          component: () => import('src/pages/Web/v1/Pelayanan/PagePelayanan.vue'),
          meta: {
            title: 'Pelayanan - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Informasi layanan kesehatan RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Pelayanan - RSUD Moh Saleh'
              }
            ]
          }
        },
        {
          path: '/pelayanan/submenu/:page?',
          component: () => import('src/pages/Web/v1/Pelayanan/PageSubmenu.vue'),
          meta: route => ({
            title: `${route.params.page} - Pelayanan RSUD Moh Saleh`,
            metaTags: [
              {
                name: 'description',
                content: `Informasi detail layanan ${route.params.page} RSUD Moh Saleh`
              },
              {
                property: 'og:title',
                content: `${route.params.page} - Pelayanan RSUD Moh Saleh`
              }
            ]
          })
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
          component: () => import('src/pages/Web/v1/Pokja/PagePelayanan.vue'),
          meta: {
            title: 'Pokja - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Informasi pokja RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Pokja - RSUD Moh Saleh'
              }
            ]
          }
        },
        {
          path: '/pokja/submenu/:page?',
          component: () => import('src/pages/Web/v1/Pokja/PageSubmenu.vue'),
          meta: route => ({
            title: `${route.params.page} - Pokja RSUD Moh Saleh`,
            metaTags: [
              {
                name: 'description',
                content: `Informasi detail pokja ${route.params.page} RSUD Moh Saleh`
              },
              {
                property: 'og:title',
                content: `${route.params.page} - Pokja RSUD Moh Saleh`
              }
            ]
          })
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
          component: () => import('src/pages/Web/v1/Ppid/PagePpid.vue'),
          meta: {
            title: 'PPID - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Informasi PPID RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'PPID - RSUD Moh Saleh'
              }
            ]
          }
        },
        {
          path: '/ppid/submenu/:page?',
          component: () => import('src/pages/Web/v1/Ppid/PageSubmenu.vue'),
          meta: route => ({
            title: `${route.params.page} - PPID RSUD Moh Saleh`,
            metaTags: [
              {
                name: 'description',
                content: `Informasi detail PPID ${route.params.page} RSUD Moh Saleh`
              },
              {
                property: 'og:title',
                content: `${route.params.page} - PPID RSUD Moh Saleh`
              }
            ]
          })
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
          component: () => import('src/pages/Web/v1/Pengaduan/PagePelayanan.vue'),
          meta: {
            title: 'Pengaduan - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Informasi pengaduan RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Pengaduan - RSUD Moh Saleh'
              }
            ]
          }
        },
        {
          path: '/pengaduan/submenu/:page?',
          component: () => import('src/pages/Web/v1/Pengaduan/PageSubmenu.vue'),
          meta: route => ({
            title: `${route.params.page} - Pengaduan RSUD Moh Saleh`,
            metaTags: [
              {
                name: 'description',
                content: `Informasi detail pengaduan ${route.params.page} RSUD Moh Saleh`
              },
              {
                property: 'og:title',
                content: `${route.params.page} - Pengaduan RSUD Moh Saleh`
              }
            ]
          })
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
          component: () => import('src/pages/Web/v1/Profil/PageProfil.vue'),
          meta: {
            title: 'Profil - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Profil RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Profil - RSUD Moh Saleh'
              }
            ]
          }
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
          component: () => import(/* webpackChunkName: "page-buku-tamu" */ 'src/pages/Web/v1/BukuTamu/PageBukuTamu.vue'),
          meta: {
            title: 'Buku Tamu - RSUD Moh Saleh',
            metaTags: [
              {
                name: 'description',
                content: 'Buku tamu RSUD Moh Saleh'
              },
              {
                property: 'og:title',
                content: 'Buku Tamu - RSUD Moh Saleh'
              }
            ]
          }
        }
      ]
    }
  ]
}
