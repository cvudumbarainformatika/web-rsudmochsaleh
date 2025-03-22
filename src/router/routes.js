import adminRoutes from './modules/admin.routes'
import webRoutes from './modules/web.routes'
import authRoutes from './modules/auth.routes'

const routes = [
  adminRoutes,
  webRoutes,
  authRoutes,

  {
    path: '/dokumen-simrs',
    component: () => import('layouts/DokumenSimrs/LayoutComp.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', redirect: '/dokumen-simrs/legalitas/public' },
      {
        path: '/dokumen-simrs/legalitas/:noreg?',
        name: 'legalitas-dokumen-simrs',
        component: () => import(/* webpackChunkName: "page-dokumen-simrs" */ 'src/pages/Web/v1/Legalitas/IndexPage.vue')
      }
    ]
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
