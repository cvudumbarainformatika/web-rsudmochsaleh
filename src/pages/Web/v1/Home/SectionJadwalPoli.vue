<template>
  <section class="jadwal-section q-py-xl relative-position" ref="sectionRef">
    <!-- Ambient Backdrop Glow -->
    <div class="glow-bg glow-primary" />

    <div class="container-padding relative-position">
      <!-- Section Header with IntersectionObserver Reveal -->
      <div
        class="news-header-row flex items-end justify-between q-mb-lg flex-wrap gap-4 reveal-card"
        :class="{ 'is-visible': headerVisible }"
      >
        <div class="header-left-group">
          <div class="section-pill inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider q-mb-xs">
            <span class="pill-dot" />
            Jadwal Poli Hari Ini ({{ todayName }})
          </div>
          <h2 class="news-heading text-h4 font-extrabold text-slate-900 tracking-tight leading-tight margin-0">
            Jadwal Dokter <span class="heading-accent text-teal-600">Spesialis</span>
          </h2>
          <p class="news-subheading text-slate-500 text-body2 q-mt-xs margin-0">
            Informasi jadwal dokter &amp; poliklinik RSUD dr. Mohamad Saleh.
          </p>
        </div>

        <!-- Header Actions Controls -->
        <div class="header-actions-group flex items-center gap-3">
          <q-input
            v-model="searchQuery"
            dense
            outlined
            rounded
            placeholder="Cari poli atau dokter..."
            class="beranda-q-search"
            bg-color="white"
          >
            <template #prepend>
              <q-icon name="search" size="18px" class="text-teal-600" />
            </template>
            <template #append v-if="searchQuery">
              <q-icon name="close" size="14px" class="cursor-pointer text-grey-6" @click="searchQuery = ''" />
            </template>
          </q-input>

          <div class="carousel-nav-arrows flex items-center gap-2">
            <button
              class="nav-circle-btn"
              title="Sebelumnya"
              @click="scrollSlider('left')"
            >
              <q-icon name="arrow_back" size="18px" />
            </button>
            <button
              class="nav-circle-btn"
              title="Berikutnya"
              @click="scrollSlider('right')"
            >
              <q-icon name="arrow_forward" size="18px" />
            </button>
          </div>

          <button
            class="btn-lihat-semua flex items-center gap-2"
            @click="router.push('/jadwal-dokter')"
          >
            <span>Lihat Semua Jadwal</span>
            <q-icon name="arrow_forward" size="16px" />
          </button>
        </div>
      </div>

      <!-- Loading State Skeleton -->
      <div v-if="loading" class="slider-skeleton-row flex gap-4 overflow-hidden">
        <div v-for="n in 4" :key="n" class="skeleton-card-wrap">
          <q-skeleton height="450px" style="border-radius: 28px" />
        </div>
      </div>

      <!-- Horizontal Slider Carousel with Staggered IntersectionObserver Reveal -->
      <div v-else-if="filteredTodaySchedules.length > 0">
        <div ref="sliderContainer" class="schedules-carousel-track">
          <div
            v-for="(item, idx) in filteredTodaySchedules"
            :key="item.id || idx"
            class="schedule-card-slide reveal-card"
            :class="{ 'is-visible': visibleCards[idx] }"
            :style="{ '--delay': (idx * 80) + 'ms' }"
          >
            <!-- Card Outer Box (Tinggi 450px) -->
            <div class="doctor-card-ss relative-position overflow-hidden shadow-lg">
              
              <!-- 1. Full Portrait Doctor Photo -->
              <div class="photo-banner-full relative-position">
                <img
                  :src="getDoctorPhoto(item)"
                  :alt="item.pegawai?.nama || item.nama_dokter"
                  class="doctor-img-full"
                  @error="handleImageError($event, item)"
                />
                <div class="photo-overlay-top" />

                <!-- Status Badge (Top Right) -->
                <div class="status-badge-ss text-xs font-bold" :class="getScheduleStatus(item) === 'AKTIF' ? 'status-active' : 'status-inactive'">
                  {{ getScheduleStatus(item) }}
                </div>
              </div>

              <!-- 2. Floating White Card Overlay at Bottom -->
              <div class="floating-white-card-overlay text-center relative-position shadow-2xl">
                
                <!-- Circular Icon Badge -->
                <div class="circle-icon-badge flex items-center justify-center shadow-md">
                  <q-icon name="medical_services" size="18px" class="text-white" />
                </div>

                <!-- Category Subtitle -->
                <div class="poli-subtitle font-bold text-xs text-teal-700 uppercase tracking-wider line-clamp-1 q-mt-xs">
                  {{ getPoliTitle(item) }}
                </div>

                <!-- Doctor Name -->
                <h3 class="doctor-name-ss font-extrabold text-slate-900 line-clamp-2 leading-snug">
                  {{ formatDoctorName(item) }}
                </h3>

                <!-- Time Bar (Bersih Tanpa Informasi Kuota) -->
                <div class="card-footer-strip rounded-xl p-2 bg-slate-50 border border-slate-100 flex items-center justify-center text-xs q-mt-sm">
                  <div class="flex items-center gap-1.5 font-bold text-teal-800">
                    <q-icon name="schedule" size="14px" class="text-teal-600" />
                    <span>{{ formatTime(item.jam_mulai) }} - {{ formatTime(item.jam_selesai) }} WIB</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tampilan Jika Hasil Pencarian / Hari Ini Belum Tersedia -->
      <div v-else class="empty-slider-container bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm my-4">
        <div class="empty-icon-circle q-mx-auto q-mb-md flex items-center justify-center">
          <q-icon :name="searchQuery ? 'search_off' : 'event_busy'" size="38px" class="text-teal-600" />
        </div>
        <h4 class="font-bold text-slate-800 text-lg q-mb-xs">
          {{ searchQuery ? 'Dokter / Poli Tidak Ditemukan' : 'Belum Ada Jadwal untuk Hari Ini' }}
        </h4>
        <p class="text-slate-500 text-xs max-w-md q-mx-auto q-mb-md">
          <span v-if="searchQuery">
            Tidak ada jadwal dokter hari ini yang sesuai dengan kata kunci "<strong>{{ searchQuery }}</strong>".
          </span>
          <span v-else>
            Silakan periksa jadwal dokter spesialis di hari lainnya melalui tombol di bawah ini.
          </span>
        </p>
        <div class="flex items-center justify-center gap-3">
          <button
            v-if="searchQuery"
            class="reset-search-btn inline-flex items-center gap-1.5"
            @click="searchQuery = ''"
          >
            <q-icon name="refresh" size="14px" />
            <span>Reset Pencarian</span>
          </button>

          <button
            class="btn-lihat-semua inline-flex items-center gap-2"
            @click="router.push('/jadwal-dokter')"
          >
            <span>Lihat Semua Jadwal Dokter</span>
            <q-icon name="arrow_forward" size="16px" />
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api, api2 } from 'src/boot/axios'
import doctorFemaleAvatar from 'src/assets/images/doctor-female.webp'
import doctorMaleAvatar from 'src/assets/images/doctor-male.webp'

const router = useRouter()
const sectionRef = ref(null)
const loading = ref(true)
const schedules = ref([])
const statusOverrides = ref([])
const sliderContainer = ref(null)
const todayName = ref('SENIN')
const searchQuery = ref('')

const headerVisible = ref(false)
const visibleCards = ref([])
let observers = []

const mapDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU']

function getTodayString() {
  const dayIdx = new Date().getDay()
  const today = mapDays[dayIdx]
  todayName.value = today === 'MINGGU' ? 'SENIN' : today
}

async function fetchBackendOverrides() {
  try {
    const resp = await api.get('/v1/jadwal_dokter_overrides')
    if (resp.data && Array.isArray(resp.data)) {
      statusOverrides.value = resp.data
    }
  } catch (e) {
    console.error('Failed to fetch backend overrides:', e)
  }
}

function getPoliTitle(item) {
  return item.poli?.rs7 || item.nama_poli || item.poli?.rs2 || 'Poliklinik'
}

function getScheduleStatus(item) {
  if (!statusOverrides.value || statusOverrides.value.length === 0) {
    return item.status || 'AKTIF'
  }

  const nip = item.pegawai?.nip || item.pegawai?.nik || ''
  const nama = (item.pegawai?.nama || item.nama_dokter || '').trim().toLowerCase()
  const hari = (item.hari || '').trim().toUpperCase()
  const poli = (getPoliTitle(item) || '').trim().toLowerCase()

  const found = statusOverrides.value.find(row => {
    const rowNip = (row.nip_nik || '').trim()
    const rowNama = (row.nama_dokter || '').trim().toLowerCase()
    const rowHari = (row.hari || '').trim().toUpperCase()
    const rowKey = (row.override_key || '').trim()

    if (nip && rowNip && nip === rowNip && hari === rowHari) return true
    if (nama && rowNama && (nama.includes(rowNama) || rowNama.includes(nama)) && hari === rowHari) return true
    if (rowKey && (rowKey.includes(nip) || rowKey.includes(nama))) return true

    return false
  })

  return found ? found.status : (item.status || 'AKTIF')
}

async function fetchJadwalPoli() {
  loading.value = true
  try {
    await fetchBackendOverrides()
    const resp = await api2.get('/api/v1/jadwalpoli/rilis')
    if (resp.data && resp.data.data) {
      schedules.value = resp.data.data
    }
  } catch (error) {
    console.error('Failed to fetch jadwal poli:', error)
  } finally {
    loading.value = false
    await nextTick()
    setupObservers()
  }
}

const todaySchedules = computed(() => {
  let list = schedules.value.filter(s => s.hari?.toUpperCase() === todayName.value)
  if (list.length === 0) {
    list = schedules.value.slice(0, 10)
  }
  return list
})

const filteredTodaySchedules = computed(() => {
  if (!searchQuery.value.trim()) {
    return todaySchedules.value
  }
  const q = searchQuery.value.toLowerCase()
  return todaySchedules.value.filter(item => {
    const docName = (item.pegawai?.nama || item.nama_dokter || '').toLowerCase()
    const poliName = (item.nama_poli || item.poli?.rs7 || item.poli?.rs2 || '').toLowerCase()
    return docName.includes(q) || poliName.includes(q)
  })
})

function setupObservers() {
  if (typeof IntersectionObserver === 'undefined') {
    headerVisible.value = true
    visibleCards.value = filteredTodaySchedules.value.map(() => true)
    return
  }

  observers.forEach(o => o.disconnect())
  observers = []

  const headerEl = sectionRef.value?.querySelector('.news-header-row')
  if (headerEl) {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        headerVisible.value = true
        obs.unobserve(headerEl)
      }
    }, { threshold: 0.01, rootMargin: '150px 0px 100px 0px' })
    obs.observe(headerEl)
    observers.push(obs)
  }

  const cardEls = sectionRef.value?.querySelectorAll('.schedule-card-slide') || []
  cardEls.forEach((el, i) => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          visibleCards.value[i] = true
        }, i * 20)
        obs.unobserve(el)
      }
    }, { threshold: 0.01, rootMargin: '150px 0px 100px 0px' })
    obs.observe(el)
    observers.push(obs)
  })
}

watch(filteredTodaySchedules, async () => {
  visibleCards.value = []
  await nextTick()
  setupObservers()
})

function scrollSlider(direction) {
  if (!sliderContainer.value) return
  const scrollAmount = 310
  if (direction === 'left') {
    sliderContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    sliderContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

function formatDoctorName(item) {
  return item.pegawai?.nama || item.nama_dokter || 'Dokter Spesialis'
}

function formatTime(timeStr) {
  if (!timeStr) return '08:00'
  const parts = timeStr.split(':')
  return `${parts[0]}:${parts[1]}`
}

function getDoctorAvatarWebp(item) {
  const name = (formatDoctorName(item) || '').toLowerCase()
  const kelamin = (item.pegawai?.kelamin || item.pegawai?.jenis_kelamin || '').toLowerCase()

  if (kelamin.includes('p') || kelamin.includes('wanita') || kelamin.includes('perempuan') || kelamin === 'f') {
    return doctorFemaleAvatar
  }
  if (kelamin.includes('l') || kelamin.includes('pria') || kelamin.includes('laki') || kelamin === 'm') {
    return doctorMaleAvatar
  }

  if (/\b(hj|hajjah|ny|ibu|drg\.\s*hj|dr\.\s*hj|fitri|rahma|siti|dewi|tri|ani|endang|retno|diah|sri|indah|nur|dian|utami|wulan|puji|yuni|nita|lia|titi|wida|dina|rachel|maya|septi|kartika|anisa|agustina)\b/i.test(name)) {
    return doctorFemaleAvatar
  }

  return doctorMaleAvatar
}

function getDoctorPhoto(item) {
  const nip = item.pegawai?.nip || item.pegawai?.nik
  const foto = item.pegawai?.foto
  if (nip && foto && foto.trim() !== '') {
    return `https://xenter.my.id/photo-kepegx/${nip}/${foto}`
  }
  return getDoctorAvatarWebp(item)
}

function handleImageError(event, item) {
  const nip = item.pegawai?.nip || item.pegawai?.nik
  const foto = item.pegawai?.foto
  const currentSrc = event.target.src || ''

  if (currentSrc.includes('192.168.100.100') && nip && foto) {
    event.target.src = `https://xenter.my.id/photo-kepegx/${nip}/${foto}`
    return
  }

  if (currentSrc.includes('xenter.my.id') && nip && foto) {
    event.target.src = `http://36.89.103.114:4542/simpeg/foto/${nip}/${foto}`
    return
  }

  event.target.src = getDoctorAvatarWebp(item)
}

function getAvatarSvg(name) {
  const initials = name.replace(/dr\.|drg\.|Sp\.[A-Z]+/gi, '').trim().slice(0, 2).toUpperCase() || 'DR'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="340" viewBox="0 0 300 340">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d9488" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
      <linearGradient id="avatarBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08" />
      </linearGradient>
    </defs>
    <rect width="300" height="340" fill="url(#bgGrad)"/>
    <circle cx="150" cy="115" r="60" fill="url(#avatarBg)" />
    <text x="50%" y="34%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="1">${initials}</text>
    <path d="M 65 330 C 65 200, 235 200, 235 330 Z" fill="url(#avatarBg)" />
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

onMounted(() => {
  getTodayString()
  fetchJadwalPoli()
})

onBeforeUnmount(() => {
  observers.forEach(o => o.disconnect())
})
</script>

<style lang="scss" scoped>
.jadwal-section {
  position: relative;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  overflow: hidden;
  z-index: 1;
}

// ── IntersectionObserver Scroll Reveal Animations ────────────────
.reveal-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.glow-bg {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(90px);
}

.glow-primary {
  top: -10%;
  left: 10%;
  width: 450px;
  height: 450px;
  background: rgba(13, 148, 136, 0.08);
}

// ── Header Layout ────────────────────────────────────────────────
.news-header-row {
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  padding-bottom: 1rem;
}

.section-pill {
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 8px #0d9488;
}

.heading-accent {
  color: #0d9488;
}

.beranda-q-search {
  width: 240px;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:focus-within {
    width: 280px;
  }

  :deep(.q-field__control) {
    height: 42px !important;
    min-height: 42px !important;
    border-radius: 21px !important;
    padding: 0 12px 0 14px !important;
    background: white;
    border-color: rgba(15, 23, 42, 0.15);
  }

  :deep(.q-field__marginal) {
    height: 42px !important;
  }

  :deep(.q-field__native) {
    height: 42px !important;
    line-height: 42px !important;
    font-size: 0.85rem !important;
    padding: 0 !important;
    color: #0f172a;
  }
}

.nav-circle-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: white;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background: #0d9488;
    color: white;
    border-color: transparent;
    box-shadow: 0 6px 16px rgba(13, 148, 136, 0.3);
    transform: translateY(-1px);
  }
}

.btn-lihat-semua {
  height: 42px;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white;
  border-radius: 21px;
  padding: 0 22px;
  font-size: 0.85rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(13, 148, 136, 0.25);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(13, 148, 136, 0.4);
  }
}

// ── Carousel Track ───────────────────────────────────────────────
.schedules-carousel-track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 0.5rem 0.25rem 1.5rem 0.25rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.schedule-card-slide {
  flex: 0 0 270px;
  max-width: 270px;
  width: 270px;
  height: 450px;

  @media (min-width: 768px) {
    flex: 0 0 288px;
    max-width: 288px;
    width: 288px;
  }
}

// ── Doctor Card SS ──────────────────────────────────────────────
.doctor-card-ss {
  height: 100%;
  width: 100%;
  background: #e2e8f0;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 42px rgba(13, 148, 136, 0.2);

    .doctor-img-full { transform: scale(1.04); }
    .doctor-name-ss { color: #0d9488; }
    .circle-icon-badge { transform: translateX(-50%) scale(1.1); }
  }
}

.photo-banner-full {
  height: 330px;
  width: 100%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
}

.doctor-img-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.photo-overlay-top {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%);
}

.status-badge-ss {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 11px;
  border-radius: 14px;
  backdrop-filter: blur(4px);
  z-index: 2;
}

.status-active {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.status-inactive {
  background: rgba(100, 116, 139, 0.85);
  color: white;
}

.floating-white-card-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: white;
  border-radius: 24px;
  padding: 22px 12px 12px 12px;
  z-index: 3;
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.circle-icon-badge {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  border: 3.5px solid white;
  z-index: 4;
  transition: transform 0.3s ease;
}

.poli-subtitle {
  font-size: 0.72rem;
  margin-top: 4px;
}

.doctor-name-ss {
  font-size: 0.88rem;
  margin: 4px 0 0;
  transition: color 0.3s ease;
}

.card-footer-strip {
  background: #f8fafc;
}

.empty-icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(13, 148, 136, 0.08);
}

.reset-search-btn {
  padding: 8px 18px;
  border-radius: 12px;
  background: #1e293b;
  color: white;
  font-size: 0.82rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover { background: #0f172a; }
}

.skeleton-card-wrap {
  flex: 0 0 288px;
  width: 288px;
}
</style>
