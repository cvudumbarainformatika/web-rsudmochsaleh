<template>
  <q-page class="jadwal-dokter-page pb-12">
    <!-- Sub-Header Hero Banner (100% Seragam dengan Banner Sub-Halaman Lainnya) -->
    <div class="subpage-banner-strip bg-teal-800 text-white q-py-md q-mb-lg shadow-sm">
      <div class="container-padding flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="banner-icon-circle flex items-center justify-center bg-white/10 rounded-full p-2">
            <q-icon name="calendar_month" size="22px" class="text-teal-3" />
          </div>
          <div>
            <h1 class="text-subtitle1 font-extrabold text-white margin-0 leading-tight">
              Jadwal Praktik Dokter Spesialis
            </h1>
            <div class="text-caption text-teal-2 flex items-center gap-1.5 opacity-90 q-mt-xs">
              <span class="font-bold text-teal-3">Jadwal Dokter</span>
              <span>•</span>
              <span>UOBK RSUD dr. Mohamad Saleh</span>
            </div>
          </div>
        </div>

        <div class="gt-xs flex items-center gap-2 text-xs text-teal-2">
          <span class="cursor-pointer hover:text-white" @click="router.push('/')">Beranda</span>
          <q-icon name="chevron_right" size="14px" />
          <span class="text-white font-bold">Jadwal Dokter</span>
        </div>
      </div>
    </div>

    <!-- Main Content Container (Menggunakan container-padding Standar Proyek) -->
    <div class="container-padding">
      <!-- Content Box Wraps Filter and Cards -->
      <div class="content-box relative-position">
        <!-- Filter Bar: Search, Category, and Day Tabs -->
        <div class="filter-wrapper q-mb-xl bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <!-- Search & Category Row -->
          <div class="row q-col-gutter-md items-center justify-between q-mb-md">
            <!-- Search Input (Quasar q-input 100% Bebas Bentrok Layout) -->
            <div class="col-12 col-md-6 col-lg-5">
              <q-input
                v-model="searchQuery"
                dense
                outlined
                rounded
                placeholder="Cari nama dokter atau nama poliklinik..."
                class="search-q-input"
                bg-color="white"
              >
                <template #prepend>
                  <q-icon name="search" size="18px" class="text-teal-600" />
                </template>
                <template #append v-if="searchQuery">
                  <q-icon name="close" size="14px" class="cursor-pointer text-grey-6" @click="searchQuery = ''" />
                </template>
              </q-input>
            </div>

            <!-- Category Select -->
            <div class="col-12 col-md-6 col-lg-4 flex justify-end">
              <q-select
                v-model="selectedPoliFilter"
                :options="poliFilterOptions"
                dense
                outlined
                rounded
                options-dense
                class="full-width-mobile select-poli-pill"
                bg-color="white"
                behavior="menu"
              >
                <template #prepend>
                  <q-icon name="local_hospital" size="18px" class="text-teal-600" />
                </template>
              </q-select>
            </div>
          </div>

          <!-- Day Filter Tabs Bar -->
          <div class="day-tabs-scroll flex items-center gap-2 overflow-x-auto q-pt-xs">
            <button
              v-for="day in availableDays"
              :key="day.id"
              class="day-pill-btn flex items-center gap-1.5"
              :class="{ 'day-pill-active': selectedDay === day.id }"
              @click="selectedDay = day.id"
            >
              <span>{{ day.label }}</span>
              <span class="day-count-badge">{{ getCountForDay(day.id) }}</span>
            </button>
          </div>
        </div>

        <!-- Skeleton Loading State -->
        <div v-if="loading" class="row q-col-gutter-lg">
          <div v-for="n in 8" :key="n" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-skeleton height="450px" style="border-radius: 28px" />
          </div>
        </div>

        <!-- Doctors Cards Grid (Presisi 1:1 Mengikuti Desain Kartu Screenshot) -->
        <div v-else-if="paginatedSchedules.length > 0" class="row q-col-gutter-lg items-stretch">
          <div
            v-for="(item, idx) in paginatedSchedules"
            :key="item.id || idx"
            class="col-12 col-sm-6 col-md-4 col-lg-3 flex justify-center"
          >
            <!-- Card Outer Box (Tinggi 450px) -->
            <div class="doctor-card-ss relative-position overflow-hidden shadow-lg full-width">
              
              <!-- 1. Full Portrait Doctor Photo (Tinggi 330px - Muka Dokter Besar, Utuh & Jelas!) -->
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

              <!-- 2. Floating White Card Overlay at Bottom (Melayang dengan Margin Inset Kiri-Kanan) -->
              <div class="floating-white-card-overlay text-center relative-position shadow-2xl">
                
                <!-- Circular Icon Badge (Satu Lencana Lingkaran Tepat di Atas Kartu Putih) -->
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

        <!-- Empty State -->
        <div v-else class="empty-state-card bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm my-8">
          <div class="empty-icon-box q-mx-auto q-mb-md">
            <q-icon name="search_off" size="42px" class="text-teal-600" />
          </div>
          <h3 class="text-h6 font-bold text-slate-800 q-mb-xs">Jadwal Dokter Tidak Ditemukan</h3>
          <p class="text-slate-500 text-body2 max-w-md q-mx-auto q-mb-lg">
            Tidak ada jadwal dokter yang sesuai dengan filter pencarian Anda. Silakan coba kata kunci lain atau reset filter hari.
          </p>
          <button class="reset-filter-btn" @click="resetFilters">
            <q-icon name="refresh" size="16px" />
            <span>Reset Semua Filter</span>
          </button>
        </div>

        <!-- Pagination Bar / Load More -->
        <div v-if="hasMoreData" class="flex justify-center q-mt-xl">
          <button class="btn-load-more shadow-md" @click="loadMore">
            <span>Tampilkan Lebih Banyak Dokter</span>
            <q-icon name="expand_more" size="20px" />
          </button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api2 } from 'src/boot/axios'
import { api, api2 } from 'src/boot/axios'
import doctorFemaleAvatar from 'src/assets/images/doctor-female.webp'
import doctorMaleAvatar from 'src/assets/images/doctor-male.webp'

const router = useRouter()
const loading = ref(true)
const schedules = ref([])
const searchQuery = ref('')
const selectedPoliFilter = ref('Semua Poliklinik')
const selectedDay = ref('ALL')
const displayLimit = ref(12)

const statusOverrides = ref({})

async function fetchBackendOverrides() {
  try {
    const resp = await api.get('/v1/jadwal_dokter_overrides')
    if (resp.data && Array.isArray(resp.data)) {
      const map = {}
      resp.data.forEach(row => {
        map[row.override_key] = row.status
      })
      statusOverrides.value = map
    }
  } catch (e) {
    console.error('Failed to fetch backend overrides:', e)
  }
}

function getScheduleKey(item) {
  const docId = item.pegawai?.nip || item.pegawai?.nik || item.id || item.nama_dokter
  const hari = item.hari || 'SENIN'
  const poli = getPoliTitle(item)
  return `${docId}_${hari}_${poli}`.replace(/\s+/g, '_')
}

function getScheduleStatus(item) {
  const key = getScheduleKey(item)
  if (statusOverrides.value[key] !== undefined) {
    return statusOverrides.value[key]
  }
  return item.status || 'AKTIF'
}

const mapDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU']
const currentDayName = ref('SENIN')

function getTodayString() {
  const dayIdx = new Date().getDay()
  const today = mapDays[dayIdx]
  currentDayName.value = today === 'MINGGU' ? 'SENIN' : today
  selectedDay.value = currentDayName.value
}

const availableDays = [
  { id: 'ALL', label: 'Semua Hari' },
  { id: 'SENIN', label: 'Senin' },
  { id: 'SELASA', label: 'Selasa' },
  { id: 'RABU', label: 'Rabu' },
  { id: 'KAMIS', label: 'Kamis' },
  { id: 'JUMAT', label: 'Jumat' },
  { id: 'SABTU', label: 'Sabtu' }
]

async function fetchJadwalPoli() {
  loading.value = true
  try {
    await fetchBackendOverrides()
    const resp = await api2.get('/api/v1/jadwalpoli/rilis')
    if (resp.data && resp.data.data) {
      // Terapkan status override dari database backend ke data SIMRS
      schedules.value = resp.data.data.map(item => ({
        ...item,
        status: getScheduleStatus(item)
      }))
    }
  } catch (error) {
    console.error('Failed to fetch jadwal poli:', error)
  } finally {
    loading.value = false
  }
}

const poliFilterOptions = computed(() => {
  const setPoli = new Set()
  schedules.value.forEach(item => {
    const name = getPoliTitle(item)
    if (name) setPoli.add(name)
  })
  return ['Semua Poliklinik', ...Array.from(setPoli).sort()]
})

function getCountForDay(dayId) {
  if (dayId === 'ALL') return schedules.value.length
  return schedules.value.filter(s => s.hari?.toUpperCase() === dayId).length
}

const filteredSchedules = computed(() => {
  let list = schedules.value

  if (selectedDay.value !== 'ALL') {
    list = list.filter(s => s.hari?.toUpperCase() === selectedDay.value)
  }

  if (selectedPoliFilter.value !== 'Semua Poliklinik') {
    list = list.filter(item => getPoliTitle(item) === selectedPoliFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => {
      const docName = formatDoctorName(item).toLowerCase()
      const poliName = getPoliTitle(item).toLowerCase()
      return docName.includes(q) || poliName.includes(q)
    })
  }

  return list
})

const paginatedSchedules = computed(() => {
  return filteredSchedules.value.slice(0, displayLimit.value)
})

const hasMoreData = computed(() => {
  return displayLimit.value < filteredSchedules.value.length
})

function loadMore() {
  displayLimit.value += 12
}

function resetFilters() {
  searchQuery.value = ''
  selectedPoliFilter.value = 'Semua Poliklinik'
  selectedDay.value = 'ALL'
  displayLimit.value = 12
}

function formatDoctorName(item) {
  return item.pegawai?.nama || item.nama_dokter || 'Dokter Spesialis'
}

function getPoliTitle(item) {
  return item.poli?.rs7 || item.nama_poli || item.poli?.rs2 || 'Poliklinik'
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

watch([selectedDay, selectedPoliFilter, searchQuery], () => {
  displayLimit.value = 12
})

onMounted(() => {
  getTodayString()
  fetchJadwalPoli()
})
</script>

<style lang="scss" scoped>
.jadwal-dokter-page {
  position: relative;
}

// ── Subpage Hero Banner Strip ──────────────────────────────────
.subpage-banner-strip {
  background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
  border-bottom: 1px solid rgba(13, 148, 136, 0.2);
}

.search-q-input {
  width: 100%;

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

.select-poli-pill {
  min-width: 220px;
  @media (max-width: 767px) { width: 100%; }

  :deep(.q-field__control) {
    height: 42px !important;
    min-height: 42px !important;
    border-radius: 21px !important;
  }
  :deep(.q-field__marginal) {
    height: 42px !important;
  }
}

// ── Day Filter Pills ──────────────────────────────────────────
.day-tabs-scroll {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.day-pill-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: #0d9488;
    color: #0d9488;
    background: #f0fdfa;
  }
}

.day-pill-active {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white !important;
  border-color: transparent !important;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);

  .day-count-badge {
    background: rgba(255, 255, 255, 0.25);
    color: white;
  }
}

.day-count-badge {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 700;
}

// ── Doctor Card SS (UI Presisi 1:1) ────────────────────────────
.doctor-card-ss {
  height: 450px;
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

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 25px;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  color: white;
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(13, 148, 136, 0.35);
  }
}

.empty-icon-box {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(13, 148, 136, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reset-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 20px;
  background: #1e293b;
  color: white;
  font-size: 0.82rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover { background: #0f172a; }
}
</style>
