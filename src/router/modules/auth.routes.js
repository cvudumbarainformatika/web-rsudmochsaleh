export default {
  path: '/setset/login',
  component: () => import(/* webpackChunkName: "auth" */'layouts/Auth/AuthLayout.vue'),
  meta: { requireAuth: false },
  children: [
    { path: '', component: () => import('pages/auth/AuthPage.vue') }
  ]
}
