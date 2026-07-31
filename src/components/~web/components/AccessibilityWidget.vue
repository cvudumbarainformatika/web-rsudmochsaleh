<template>
  <div class="accessibility-widget-root">
    <!-- Reading Line Penuntun Baca (Mengikuti Posisi Mouse) -->
    <div
      v-if="store.readingLine"
      id="acc-reading-line-guide"
      :style="{ top: mouseY + 'px' }"
    />

    <!-- Quasar Dialog Modal Menu Aksesibilitas Gaya RSUD -->
    <q-dialog
      v-model="store.isOpen"
      position="right"
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="accessibility-dialog-card flex column no-wrap bg-slate-200 text-slate-900 overflow-hidden">
        <!-- 1. Header Banner Gradient Teal RSUD (Fixed Top) -->
        <q-card-section class="widget-header-banner bg-gradient-to-r from-teal-800 via-teal-900 to-cyan-900 text-white p-4 shadow-md flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="header-icon-circle w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <q-icon name="accessibility_new" size="22px" class="text-cyan-2" />
              </div>
              <div>
                <h2 class="text-base font-extrabold text-white margin-0 leading-tight">
                  Menu Aksesibilitas Web
                </h2>
                <p class="text-teal-200 text-[0.72rem] font-medium margin-0">
                  RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO
                </p>
              </div>
            </div>

            <!-- TOMBOL TES SUARA PRIMITIF (native HTML, bukan Quasar) -->
            <button
              style="background:#fff;color:#0f766e;border:none;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:800;cursor:pointer;margin-right:4px;"
              onclick="window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance('Halo, ini tes suara aksesibilitas RSUD.'); window.speechSynthesis.speak(u); console.log('TES PRIMITIF: speak() dipanggil');"
            >
              🔊 Tes
            </button>

            <!-- Action Buttons: Reset & Close -->
            <div class="flex items-center gap-1">
              <q-btn
                flat
                round
                dense
                icon="refresh"
                color="white"
                size="md"
                class="hover:bg-white/20"
                @click="store.resetAll()"
              >
                <q-tooltip anchor="bottom middle" self="top middle">Reset Semua Pengaturan</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                icon="close"
                color="white"
                size="md"
                class="hover:bg-white/20 ml-1"
                @click="store.closeWidget()"
              />
            </div>
          </div>
        </q-card-section>

        <!-- 2. Scrollable Content Body (High Contrast Background #e2e8f0) -->
        <q-card-section class="widget-content-body flex-1 overflow-y-auto p-4 space-y-5 bg-slate-200/90">
          <!-- Selector Bahasa -->
          <div class="lang-selector-box bg-white rounded-2xl p-3.5 border border-slate-300 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <q-icon name="language" size="18px" class="text-teal-700" />
              <span>Bahasa Layanan</span>
            </div>
            <select
              v-model="store.language"
              class="lang-select-input bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none cursor-pointer focus:border-teal-600"
              @change="store.saveToStorage()"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          <!-- Section 1: Profil Aksesibilitas (6 Cards Grid) -->
          <div>
            <div class="flex items-center justify-between q-mb-sm px-1">
              <span class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Profil Aksesibilitas
              </span>
              <q-icon name="info" size="14px" class="text-slate-500 cursor-pointer">
                <q-tooltip>Pilih profil aksesibilitas untuk menyesuaikan tampilan web</q-tooltip>
              </q-icon>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="profile in profiles"
                :key="profile.key"
                class="profile-card bg-white rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between shadow-sm"
                :class="store[profile.key] ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-500/20' : 'border-slate-300 hover:border-teal-500'"
              >
                <div>
                  <div class="flex items-center justify-between q-mb-xs">
                    <div class="card-mini-icon w-9 h-9 rounded-xl flex items-center justify-center" :class="store[profile.key] ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'">
                      <q-icon :name="profile.icon" size="18px" />
                    </div>
                    <q-toggle
                      :model-value="store[profile.key]"
                      color="teal-7"
                      dense
                      @update:model-value="handleToggleProfile(profile.key)"
                    />
                  </div>
                  <h4 class="text-xs font-extrabold text-slate-900 leading-snug q-mb-xs">
                    {{ profile.title }}
                  </h4>
                  <p class="text-slate-600 text-[0.72rem] leading-relaxed margin-0">
                    {{ profile.desc }}
                  </p>

                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Penyesuaian Konten & Tampilan (Redesigned Grid Layout) -->
          <div>
            <span class="text-xs font-extrabold text-slate-900 uppercase tracking-wider block q-mb-sm px-1">
              Penyesuaian Konten &amp; Tampilan
            </span>

            <div class="bg-white rounded-2xl p-4 border border-slate-300 shadow-sm space-y-4">
              <!-- Ukuran Teks (Clean Grid Row) -->
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <q-icon name="format_size" size="18px" class="text-teal-700" />
                  <span>Ukuran Teks</span>
                </div>
                <div class="grid grid-cols-4 gap-1.5">
                  <button
                    v-for="step in [0, 1, 2, 3]"
                    :key="step"
                    class="font-btn py-1.5 rounded-xl text-xs font-extrabold border transition-colors text-center"
                    :class="store.fontSizeStep === step ? 'bg-teal-700 text-white border-teal-700 shadow-xs' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'"
                    @click="store.setFontSize(step)"
                  >
                    {{ step === 0 ? 'Normal' : `+${step * 10}%` }}
                  </button>
                </div>
              </div>

              <q-separator color="slate-200" />

              <!-- Mode Kontras (Clean Grid Row) -->
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <q-icon name="contrast" size="18px" class="text-teal-700" />
                  <span>Warna &amp; Kontras</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                  <button
                    v-for="mode in contrastModes"
                    :key="mode.key"
                    class="contrast-btn py-1.5 px-2 rounded-xl text-xs font-extrabold border transition-colors text-center"
                    :class="store.contrastMode === mode.key ? 'bg-teal-700 text-white border-teal-700 shadow-xs' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'"
                    @click="store.setContrast(mode.key)"
                  >
                    {{ mode.label }}
                  </button>
                </div>
              </div>

              <q-separator color="slate-200" />

              <!-- Alat Pembantu Tambahan (Clean List with Border Separator) -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <q-icon name="mouse" size="18px" class="text-teal-700" />
                    <span>Kursor Besar (*Big Cursor*)</span>
                  </div>
                  <q-toggle v-model="store.bigCursor" color="teal-7" dense @update:model-value="store.applyDOMClasses()" />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <q-icon name="horizontal_rule" size="18px" class="text-teal-700" />
                    <span>Garis Penuntun Baca (*Reading Line*)</span>
                  </div>
                  <q-toggle v-model="store.readingLine" color="teal-7" dense @update:model-value="store.applyDOMClasses()" />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <q-icon name="font_download" size="18px" class="text-teal-700" />
                    <span>Font Keterbacaan (*Dyslexia Font*)</span>
                  </div>
                  <q-toggle v-model="store.readableFont" color="teal-7" dense @update:model-value="store.applyDOMClasses()" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- 3. Footer Bar (Fixed Bottom) -->
        <q-card-section class="widget-footer-bar bg-white border-t border-slate-300 p-3.5 text-center flex-shrink-0">
          <div class="flex items-center justify-between text-[0.72rem] text-slate-600 font-bold">
            <span class="hover:text-teal-700 cursor-pointer">Pernyataan Aksesibilitas RSUD</span>
            <div class="flex items-center gap-1 text-teal-800">
              <q-icon name="verified_user" size="14px" />
              <span>Standar Aksesibilitas WCAG 2.1</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAccessibilityStore } from 'src/stores/web/accessibility'

const store = useAccessibilityStore()
const mouseY = ref(100)

/**
 * Murni 100% Client-Side Web Speech API (0ms Delay / Tanpa Server Delay)
 * Solusi Chromium Garbage Collection Bug: Menyimpan referensi Utterance pada variabel global
 * agar V8 Engine Chrome tidak membuang memori objek suara saat sedang memutar audio.
 */
let currentUtterance = null

function speak(text) {
  console.log('[ACC-TTS] 1. speak() dipanggil dengan teks:', text)

  if (typeof window === 'undefined') {
    console.warn('[ACC-TTS] ❌ Error: Context SSR (window undefined)')
    return
  }
  if (!('speechSynthesis' in window)) {
    console.warn('[ACC-TTS] ❌ Error: window.speechSynthesis tidak didukung browser ini')
    return
  }
  if (!text || !text.trim()) {
    console.warn('[ACC-TTS] ⚠️ Teks kosong')
    return
  }

  // Bersihkan nama ikon Material Icons (lowercase_underscore) dari teks
  const cleaned = text.trim().replace(/^[a-z][a-z_]*\n/gm, '').trim()
  if (!cleaned || cleaned.length < 2) {
    console.warn('[ACC-TTS] ⚠️ Teks hasil pembersihan terlalu pendek:', cleaned)
    return
  }

  const synth = window.speechSynthesis
  console.log('[ACC-TTS] 2. State synth -> speaking:', synth.speaking, '| paused:', synth.paused, '| pending:', synth.pending)

  if (synth.paused) {
    console.log('[ACC-TTS] 2b. Unpausing synth engine...')
    synth.resume()
  }

  // Hanya panggil cancel jika ada suara yang sedang aktif diputar
  if (synth.speaking || synth.pending) {
    console.log('[ACC-TTS] 3. Membatalkan suara sebelumnya yang sedang diputar...')
    synth.cancel()
  }

  // Simpan di referensi global (Menghindari Garbage Collection Bug Chrome #131567)
  currentUtterance = new SpeechSynthesisUtterance(cleaned)
  currentUtterance.rate = 1.0
  currentUtterance.volume = 1.0
  currentUtterance.pitch = 1.0

  const voices = synth.getVoices() || []
  console.log('[ACC-TTS] 4. Jumlah voice sistem terdeteksi:', voices.length)

  if (voices.length > 0) {
    const idVoice = voices.find(v => v.lang && (v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('indonesia')))
    if (idVoice) {
      console.log('[ACC-TTS] 5. Menggunakan voice Indonesia:', idVoice.name, '(', idVoice.lang, ')')
      currentUtterance.voice = idVoice
      currentUtterance.lang = idVoice.lang
    } else {
      console.log('[ACC-TTS] 5. Voice Indonesia tidak ada di OS, pakai voice default browser:', navigator.language)
    }
  }

  currentUtterance.onstart = () => {
    console.log('[ACC-TTS] 🔊 AUDIO MULAI DIPUTAR OLEH BROWSER!')
  }
  currentUtterance.onend = () => {
    console.log('[ACC-TTS] ✅ Audio selesai diputar.')
    currentUtterance = null
  }
  currentUtterance.onerror = (evt) => {
    if (evt.error === 'canceled') {
      // Event 'canceled' wajar terjadi saat pembacaan diinterupsi teks baru
      return
    }
    console.error('[ACC-TTS] ❌ BROWSER AUDIO ERROR:', evt.error, evt)
    currentUtterance = null
  }

  console.log('[ACC-TTS] 6. Memanggil synth.speak(currentUtterance)...')
  synth.speak(currentUtterance)
  console.log('[ACC-TTS] 7. Pemanggilan selesai. State synth.speaking sekarang:', synth.speaking)
}

function handleToggleProfile(key) {
  console.log('[ACC-TOGGLE] Saklar diklik untuk:', key, '| Status baru:', !store[key])
  store[key] = !store[key]

  // Konfirmasi suara dari gesture klik
  if (key === 'visionImpaired') {
    if (store.visionImpaired) {
      console.log('[ACC-TOGGLE] Mengaktifkan profil visionImpaired...')
      speak('Profil Tunanetra aktif. Pembaca suara diaktifkan.')
      // Tunda 1200ms supaya suara konfirmasi selesai dulu sebelum mouseover aktif
      // Tanpa delay ini, saat mouse masih di atas toggle, mouseover langsung cancel suara
      setTimeout(() => {
        store.enableSpeechReader(speak)
      }, 1200)
    } else {
      store.disableSpeechReader()
      speak('Profil Tunanetra dinonaktifkan.')
    }
  }

  if (key === 'seizureSafe') {
    if (store.seizureSafe) {
      store.contrastMode = 'grayscale'
    } else {
      store.contrastMode = 'normal'
    }
  }

  if (key === 'lowVision') {
    if (store.lowVision) {
      store.fontSizeStep = Math.max(store.fontSizeStep, 1)
    } else {
      store.fontSizeStep = 0
    }
  }

  if (key === 'cognitiveLearning') {
    if (store.cognitiveLearning) {
      store.readingLine = true
      store.readableFont = true
    } else {
      store.readingLine = false
      store.readableFont = false
    }
  }

  store.applyDOMClasses()
  store.saveToStorage()
}

const profiles = [
  {
    key: 'seizureSafe',
    title: 'Profil Aman untuk Kejang',
    desc: 'Menghentikan animasi berlipat dan mengurangi saturasi warna.',
    icon: 'flash_off'
  },
  {
    key: 'visionImpaired',
    title: 'Profil untuk Tunanetra (Audio)',
    desc: 'Mengaktifkan pembaca suara otomatis untuk navigasi auditif.',
    icon: 'volume_up'
  },
  {
    key: 'lowVision',
    title: 'Profil Keterbacaan / Low Vision',
    desc: 'Meningkatkan kontras dan ketebalan teks untuk penglihatan rendah.',
    icon: 'visibility'
  },
  {
    key: 'adhdFriendly',
    title: 'Profil Ramah ADHD',
    desc: 'Mengurangi gangguan visual untuk fokus membaca yang lebih baik.',
    icon: 'center_focus_strong'
  },
  {
    key: 'cognitiveLearning',
    title: 'Profil Kognitif & Pembelajaran',
    desc: 'Menampilkan garis penuntun baca dan spasi teks khusus.',
    icon: 'menu_book'
  },
  {
    key: 'motorImpaired',
    title: 'Profil Disabilitas Motorik',
    desc: 'Mengoptimalkan navigasi situs khusus keyboard.',
    icon: 'keyboard'
  }
]

const contrastModes = [
  { key: 'normal', label: 'Normal' },
  { key: 'high', label: 'Tinggi' },
  { key: 'grayscale', label: 'Monokrom' },
  { key: 'invert', label: 'Invert' }
]

function handleMouseMove(e) {
  mouseY.value = e.clientY
}

onMounted(() => {
  store.loadFromStorage()
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<style lang="scss" scoped>
.accessibility-dialog-card {
  width: 440px !important;
  max-width: 90vw !important;
  height: 100vh !important;
  box-shadow: -10px 0 40px rgba(15, 23, 42, 0.2) !important;
}

.widget-header-banner {
  background: linear-gradient(135deg, #0f766e 0%, #155e75 100%);
}

.profile-card {
  min-height: 125px;
}
</style>
