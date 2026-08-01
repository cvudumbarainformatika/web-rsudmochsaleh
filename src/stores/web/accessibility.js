import { defineStore } from 'pinia'

export const useAccessibilityStore = defineStore('accessibility', {
  state: () => ({
    // 6 Profil Aksesibilitas - SEMUA DEFAULT FALSE
    seizureSafe: false,
    visionImpaired: false,
    lowVision: false,
    adhdFriendly: false,
    cognitiveLearning: false,
    motorImpaired: false,

    // Penyesuaian Konten & Tampilan - SEMUA DEFAULT NORMAL/OFF
    fontSizeStep: 0,
    contrastMode: 'normal',
    bigCursor: false,
    readingLine: false,
    readableFont: false,
    language: 'id',

    // State internal
    isOpen: false,
    speechActive: false
  }),

  actions: {
    toggleWidget() {
      this.isOpen = !this.isOpen
    },
    closeWidget() {
      this.isOpen = false
    },

    resetAll() {
      this.seizureSafe = false
      this.visionImpaired = false
      this.lowVision = false
      this.adhdFriendly = false
      this.cognitiveLearning = false
      this.motorImpaired = false
      this.fontSizeStep = 0
      this.contrastMode = 'normal'
      this.bigCursor = false
      this.readingLine = false
      this.readableFont = false
      this.language = 'id'
      this.disableSpeechReader()
      this.applyDOMClasses()
      if (typeof document !== 'undefined') {
        const domain = window.location.hostname
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`
      }
      localStorage.removeItem('rsud_accessibility_config')
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    },

    setLanguage(langCode) {
      if (typeof window === 'undefined') return
      this.language = langCode

      const domain = window.location.hostname
      const paths = ['/', window.location.pathname]

      if (langCode === 'id') {
        // Hapus cookie googtrans pada semua path dan domain
        paths.forEach(p => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p};`
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}; domain=${domain};`
        })
        // Reload 1x bersih agar Google Translate menghentikan penerjemahan dan kembali ke Bahasa Indonesia murni
        window.location.reload()
      } else {
        const val = `/id/${langCode}`
        paths.forEach(p => {
          document.cookie = `googtrans=${val}; path=${p};`
          document.cookie = `googtrans=${val}; path=${p}; domain=${domain};`
        })
        // Reload 1x bersih agar Google Translate memproses DOM dengan bahasa baru
        window.location.reload()
      }
    },

    initGoogleTranslateScript(cb) {
      if (typeof document === 'undefined') return
      if (document.getElementById('google-translate-script')) {
        if (cb) cb()
        return
      }
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          try {
            new window.google.translate.TranslateElement({
              pageLanguage: 'id',
              includedLanguages: 'en,zh-CN,it,fr,ko,ar,ja,id',
              autoDisplay: false
            }, 'google_translate_element')
          } catch (e) {
            console.error('Google Translate Init Error:', e)
          }
          if (cb) cb()
        }
      }
      const s = document.createElement('script')
      s.id = 'google-translate-script'
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.head.appendChild(s)
    },

    notifyContentUpdated() {
      if (typeof document === 'undefined') return
      if (this.language && this.language !== 'id') {
        setTimeout(() => {
          this.triggerTranslate(this.language)
        }, 250)
      }
    },

    triggerTranslate(langCode) {
      if (typeof document === 'undefined') return
      
      const doTrigger = () => {
        const select = document.querySelector('.goog-te-combo')
        if (select) {
          select.value = langCode === 'id' ? '' : langCode
          select.dispatchEvent(new Event('change'))
        } else {
          // Jika belum ada combo, coba lagi setelah delay singkat
          setTimeout(() => {
            const selectRetry = document.querySelector('.goog-te-combo')
            if (selectRetry) {
              selectRetry.value = langCode === 'id' ? '' : langCode
              selectRetry.dispatchEvent(new Event('change'))
            }
          }, 400)
        }
      }

      if (!document.getElementById('google-translate-script')) {
        this.initGoogleTranslateScript(() => {
          setTimeout(doTrigger, 300)
        })
      } else {
        doTrigger()
      }
    },

    setFontSize(step) {
      this.fontSizeStep = step
      this.applyDOMClasses()
      this.saveToStorage()
    },

    setContrast(mode) {
      this.contrastMode = mode
      this.applyDOMClasses()
      this.saveToStorage()
    },

    applyDOMClasses() {
      if (typeof document === 'undefined') return
      const html = document.documentElement

      const scale = 100 + (this.fontSizeStep * 10)
      html.style.fontSize = `${scale}%`

      html.classList.toggle('acc-seizure-safe', this.seizureSafe)
      html.classList.toggle('acc-low-vision', this.lowVision)
      html.classList.toggle('acc-adhd-focus', this.adhdFriendly)
      html.classList.toggle('acc-cognitive', this.cognitiveLearning)
      html.classList.toggle('acc-motor-impaired', this.motorImpaired)
      html.classList.toggle('acc-big-cursor', this.bigCursor)
      html.classList.toggle('acc-reading-line-active', this.readingLine)
      html.classList.toggle('acc-dyslexia-font', this.readableFont)
      html.classList.toggle('acc-high-contrast', this.contrastMode === 'high')
      html.classList.toggle('acc-grayscale', this.contrastMode === 'grayscale')
      html.classList.toggle('acc-invert', this.contrastMode === 'invert')
    },

    enableSpeechReader(speakFn) {
      if (typeof document === 'undefined') return
      if (this.speechActive) return

      this.speechActive = true
      let speechTimer = null
      let lastText = ''

      this._speechHandler = (e) => {
        if (!this.visionImpaired) return

        const targetEl = e.target.closest('button, a, h1, h2, h3, h4, h5, p, span, li, td, th, label, [role="button"]') || e.target
        const rawText = (targetEl?.innerText || targetEl?.alt || targetEl?.title || targetEl?.ariaLabel || '').trim()

        const cleaned = rawText.replace(/^[a-z][a-z_]*\n/gm, '').trim()

        if (cleaned && cleaned.length > 2 && cleaned.length < 300 && cleaned !== lastText) {
          if (speechTimer) clearTimeout(speechTimer)
          speechTimer = setTimeout(() => {
            lastText = cleaned
            speakFn(cleaned)
          }, 200)
        }
      }

      document.addEventListener('mouseover', this._speechHandler, { passive: true })
    },

    disableSpeechReader() {
      if (typeof document === 'undefined') return
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      if (this._speechHandler) {
        document.removeEventListener('mouseover', this._speechHandler)
        this._speechHandler = null
      }
      this.speechActive = false
    },

    saveToStorage() {
      if (typeof localStorage === 'undefined') return
      const payload = {
        seizureSafe: this.seizureSafe,
        lowVision: this.lowVision,
        adhdFriendly: this.adhdFriendly,
        cognitiveLearning: this.cognitiveLearning,
        motorImpaired: this.motorImpaired,
        fontSizeStep: this.fontSizeStep,
        contrastMode: this.contrastMode,
        bigCursor: this.bigCursor,
        readingLine: this.readingLine,
        readableFont: this.readableFont
        // language TIDAK DISIMPAN agar default SELALU Bahasa Indonesia ('id') saat dibuka kembali
      }
      localStorage.setItem('rsud_accessibility_config', JSON.stringify(payload))
    },

    loadFromStorage() {
      if (typeof localStorage === 'undefined') return
      try {
        const saved = localStorage.getItem('rsud_accessibility_config')
        if (saved) {
          const parsed = JSON.parse(saved)
          this.seizureSafe = parsed.seizureSafe ?? false
          this.lowVision = parsed.lowVision ?? false
          this.adhdFriendly = parsed.adhdFriendly ?? false
          this.cognitiveLearning = parsed.cognitiveLearning ?? false
          this.motorImpaired = parsed.motorImpaired ?? false
          this.fontSizeStep = parsed.fontSizeStep ?? 0
          this.contrastMode = parsed.contrastMode ?? 'normal'
          this.bigCursor = parsed.bigCursor ?? false
          this.readingLine = parsed.readingLine ?? false
          this.readableFont = parsed.readableFont ?? false
        }

        // Selaraskan state tombol UI dengan Cookie Google Translate aktual
        if (typeof document !== 'undefined') {
          const matches = document.cookie.match(/(?:^|; )googtrans=([^;]*)/)
          if (matches && matches[1]) {
            const val = decodeURIComponent(matches[1])
            const parts = val.split('/')
            if (parts.length >= 3 && parts[2]) {
              this.language = parts[2]
            } else {
              this.language = 'id'
            }
          } else {
            this.language = 'id'
          }
        } else {
          this.language = 'id'
        }

        this.applyDOMClasses()
      } catch (e) {
        console.error('Gagal memuat pengaturan aksesibilitas:', e)
      }
    }
  }
})
