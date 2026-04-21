import { defineSsrMiddleware } from '#q-app/wrappers'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineSsrMiddleware(({ app }) => {
  const target = 'http://api-webrsud-web'

  // Proxy for API
  app.use('/api', createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
       // logic: if user calls /api/v1, it stays /api/v1 because Laravel expects /api prefix
       // but if your backend DOES NOT have /api in the actual server-side endpoint, 
       // you might need rewrite. 
       // But in most Laravel setups, API is at /api
    }
  }))

  // Proxy for Storage (Images/Assets)
  app.use('/storage', createProxyMiddleware({
    target,
    changeOrigin: true
  }))

  console.log('🚀 SSR Proxy Middleware loaded: /api and /storage targets', target)
})
