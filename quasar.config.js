/* eslint-env node */

import { configure } from 'quasar/wrappers'

import {
  presetWind,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerVariantGroup,
  transformerDirectives
} from 'unocss'
import viteCompression from 'vite-plugin-compression'

export default configure(function () {
  return {
    // === ESLint ===
    eslint: {
      warnings: true,
      errors: true
    },

    // === Boot Files ===
    boot: [
      { path: 'axios', server: false },
      { path: 'global-components', server: true },
      // 'global-components',
      'router',
      'head',
      { path: 'main', server: false }
    ],

    // === CSS Files ===
    css: ['app.scss'],

    // === Extra Icons ===
    extras: [
      'mdi-v5',
      'themify',
      'material-icons'
    ],

    // === Build Options ===
    build: {
      target: {
        browser: ['es2022', 'edge118', 'firefox115', 'chrome115', 'safari16'],
        node: 'node22'
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        }
      },
      vueRouterMode: 'history',

      // Custom chunking
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'quasar'],
            admin: ['./src/router/modules/admin.routes.js'],
            web: ['./src/router/modules/web.routes.js'],
            auth: ['./src/router/modules/auth.routes.js']
          }
        }
      },

      // Vite Plugins
      vitePlugins: [
        ['unocss/vite', {
          presets: [
            presetWind(),
            presetAttributify({
              prefix: 'un-',
              prefixedOnly: true
            }),
            presetIcons({
              scale: 1.2,
              cdn: 'https://esm.sh/'
            }),
            presetTypography()
          ],
          transformers: [
            transformerVariantGroup(),
            transformerDirectives()
          ],
          shortcuts: {
            'nav-link': 'px-4 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50 transition-all duration-200 ease-in-out',
            'dropdown-item': 'block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50',
            btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
            'btn-primary': 'text-white bg-blue-500 hover:bg-blue-700'
          },
          safelist: [
            'btn',
            'btn-primary',
            'animate-slide-down',
            'animate-slide-right',
            'rotate-180'
          ]
        }],
        [viteCompression, {
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 10240,
          deleteOriginFile: false
        }]
      ],

      // Prerender routes (optional, for SEO)
      prerender: {
        routes: [
          '/',
          '/beranda',
          '/berita',
          '/pelayanan',
          '/profil',
          '/ppid',
          '/pokja'
        ]
      }
    },

    // === Dev Server ===
    devServer: {
      port: 9001,
      open: true
    },

    // === Quasar Framework Config ===
    framework: {
      config: {
        dark: true
      },
      plugins: [
        'Meta',
        'Notify',
        'LocalStorage',
        'Dialog',
        'Loading',
        'AppFullscreen'
      ]
    },

    // === Animations ===
    animations: 'all',

    // === SSR Mode ===
    ssr: {
      pwa: false,
      prodPort: 3000,
      maxAge: 1000 * 60 * 60 * 24, // 24 jam cache control
      middlewares: ['render'], // urutan penting: render harus terakhir
      serverMemoryLimit: 256, // Limit RAM untuk render SSR (MB)
      compression: true, // Gzip bawaan express
      manualHydration: true, // Hindari hydration mismatch
      external: ['lottie-web'],
      // ✅ Tambahkan ini
      htmlVariables: {
        lang: 'id'
      }
      // throttleRequests: {
      //   maxRequests: 25,
      //   timeWindow: 1000
      // }
    },

    // === PWA (Jika dibutuhkan nanti) ===
    pwa: {
      workboxMode: 'GenerateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rsudmochsaleh\.my\.id\/api/,
            handler: 'NetworkFirst'
          }
        ]
      }
    },

    // === Capacitor Mobile App ===
    capacitor: {
      hideSplashscreen: true
    },

    // === Electron App ===
    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {
        // Konfigurasi opsional untuk mac/windows
      },
      builder: {
        appId: 'RSUD-MohSaleh'
      }
    },

    // === Browser Extension (BEX) ===
    bex: {
      contentScripts: ['my-content-script']
    }
  }
})
