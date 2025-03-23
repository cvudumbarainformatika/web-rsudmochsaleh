/* eslint-env node */

import { configure } from 'quasar/wrappers'
import {
  presetWind, // Ganti presetUno dengan presetWind
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerVariantGroup,
  transformerDirectives
} from 'unocss'
import viteCompression from 'vite-plugin-compression'

export default configure(function () {
  return {
    eslint: {
      warnings: true,
      errors: true
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
      'global-components',
      'router',
      'head',
      'main' // pastikan main.js ada di sini
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
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
      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      vitePlugins: [
        ['unocss/vite', {
          presets: [
            presetWind(), // Gunakan presetWind sebagai pengganti presetUno
            presetAttributify({
              prefix: 'un-',
              prefixedOnly: true // Hanya aktifkan class dengan prefix un-
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
            // Custom shortcuts untuk header futuristik
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
          algorithm: 'brotli',
          ext: '.br'
        }]
      ],
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

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      port: 9001,
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        dark: true
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      // plugins: []
      plugins: ['Notify', 'LocalStorage', 'Dialog', 'Loading', 'AppFullscreen']
    },

    animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    // animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true,
      prodPort: 3000,
      maxAge: 1000 * 60 * 60 * 24, // Cache selama 24 jam
      middlewares: ['render'],

      // Tambahkan optimasi memori
      serverMemoryLimit: 256, // Batasi penggunaan memori server (dalam MB)

      // Aktifkan kompresi
      compression: true,

      // Batasi jumlah concurrent requests
      throttleRequests: {
        maxRequests: 25,
        timeWindow: 1000
      }
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // Diubah dari 'generateSW' menjadi 'GenerateSW'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // Optimize caching
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [{
          urlPattern: /^https:\/\/rsudmochsaleh\.my\.id\/api/, // Menggunakan regex literal
          handler: 'NetworkFirst'
        }]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'RSUD-MohSaleh'
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: [
        'my-content-script'
      ]

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    }
  }
})
