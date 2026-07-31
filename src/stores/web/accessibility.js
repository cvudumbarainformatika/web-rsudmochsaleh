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
      this.disableSpeechReader()
      this.applyDOMClasses()
      localStorage.removeItem('rsud_accessibility_config')
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

        // Buang baris yang hanya berisi nama ikon Material (lowercase+underscore saja)
        const cleaned = rawText.replace(/^[a-z][a-z_]*\n/gm, '').trim()

        if (cleaned && cleaned.length > 2 && cleaned.length < 300 && cleaned !== lastText) {
          if (speechTimer) clearTimeout(speechTimer)
          speechTimer = setTimeout(() => {
            lastText = cleaned
            speakFn(cleaned)
          }, 200)
        }
      }

      document.addEventListener('mouseover', this._speechHandler)
    },

    disableSpeechReader() {
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
        readableFont: this.readableFont,
        language: this.language
        // visionImpaired SENGAJA TIDAK DISIMPAN
        // karena memerlukan user-gesture baru untuk aktif setiap sesi
      }
      localStorage.setItem('rsud_accessibility_config', JSON.stringify(payload))
    },

    loadFromStorage() {
      if (typeof localStorage === 'undefined') return
      try {
        const saved = localStorage.getItem('rsud_accessibility_config')
        if (saved) {
          const parsed = JSON.parse(saved)
          // visionImpaired TIDAK di-restore (butuh user gesture baru tiap sesi)
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
          this.language = parsed.language ?? 'id'
          // Terapkan DOM class untuk setting non-speech
          this.applyDOMClasses()
        }
      } catch (e) {
        console.error('Gagal memuat pengaturan aksesibilitas:', e)
      }
    }
  }
})
