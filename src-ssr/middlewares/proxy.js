import { defineSsrMiddleware } from '#q-app/wrappers'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineSsrMiddleware(({ app }) => {
  const target = 'http://api-webrsud-web'

  // Proxy for API
  app.use('/api', createProxyMiddleware({
    target: target + '/api', // Arahkan langsung ke backend/api
    changeOrigin: true,
    pathRewrite: { '^/api': '' } // Bersihkan awalan agar tidak dobel jika ada
  }))

  // Proxy for Storage (Images/Assets)
  app.use('/storage', createProxyMiddleware({
    target: target + '/storage', // Arahkan langsung ke backend/storage
    changeOrigin: true,
    pathRewrite: { '^/storage': '' } // Bersihkan awalan agar tidak dobel jika ada
  }))

  console.log('🚀 SSR Proxy Middleware loaded: /api and /storage targets', target)
})
