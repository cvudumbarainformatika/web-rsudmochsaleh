<template>
  <div class="space-y-4">
    <!-- Header Admin Card -->
    <q-card flat class="rounded-2xl border border-slate-200/80 shadow-xs bg-white">
      <q-card-section class="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-8 shadow-xs">
            <q-icon name="event_available" size="26px" />
          </div>
          <div>
            <h1 class="text-lg font-black text-slate-800 margin-0 leading-snug">
              Jadwal Praktik Dokter Spesialis
            </h1>
            <p class="text-xs text-slate-500 margin-0">
              Informasi jadwal praktik dokter spesialis terintegrasi langsung dari SIMRS (UOBK RSUD dr. Mohamad Saleh).
            </p>
          </div>
        </div>

        <q-btn
          flat
          rounded
          icon="refresh"
          label="Refresh Data SIMRS"
          no-caps
          color="teal-8"
          class="bg-teal-50 font-bold border border-teal-200"
          :loading="loading"
          @click="fetchJadwalPoli"
        />
      </q-card-section>
    </q-card>

    <!-- Filter Bar Card -->
    <q-card flat class="rounded-2xl border border-slate-200/80 shadow-xs bg-white">
      <q-card-section class="p-4">
        <div class="row q-col-gutter-md items-center justify-between">
          <!-- Search Box -->
          <div class="col-12 col-md-5">
            <q-input
              v-model="searchQuery"
              dense
              outlined
              rounded
              placeholder="Cari nama dokter atau nama poliklinik..."
              class="search-admin-input"
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

          <!-- Select Poli -->
          <div class="col-12 col-md-4">
            <q-select
              v-model="selectedPoliFilter"
              :options="poliFilterOptions"
              dense
              outlined
              rounded
              options-dense
              bg-color="white"
              behavior="menu"
            >
              <template #prepend>
                <q-icon name="local_hospital" size="18px" class="text-teal-600" />
              </template>
            </q-select>
          </div>

          <!-- Status Indicator -->
          <div class="col-12 col-md-3 flex justify-end">
            <q-badge color="teal-8" rounded class="px-3 py-1.5 text-xs font-bold shadow-xs">
              Total Data: {{ filteredSchedules.length }} Jadwal
            </q-badge>
          </div>
        </div>

        <!-- Day Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto q-pt-sm q-mt-sm border-t border-slate-100">
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
      </q-card-section>
    </q-card>

    <!-- Cards Grid (Dokter Spesialis) -->
    <q-card flat class="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-4">
      <div v-if="loading" class="row q-col-gutter-lg py-4">
        <div v-for="n in 8" :key="n" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-skeleton height="450px" style="border-radius: 28px" />
        </div>
      </div>

      <div v-else-if="paginatedSchedules.length > 0" class="row q-col-gutter-lg items-stretch py-2">
        <div
          v-for="(item, idx) in paginatedSchedules"
          :key="item.id || idx"
          class="col-12 col-sm-6 col-md-4 col-lg-3 flex justify-center"
        >
          <!-- Card Outer Box -->
          <div class="doctor-card-ss relative-position overflow-hidden shadow-md full-width">
            
            <!-- Photo Banner -->
            <div class="photo-banner-full relative-position">
              <img
                :src="getDoctorPhoto(item)"
                :alt="item.pegawai?.nama || item.nama_dokter"
                class="doctor-img-full"
                @error="handleImageError($event, item)"
              />
              <div class="photo-overlay-top" />

              <!-- Status Badge & Admin Toggle Button (Top Right) -->
              <div class="status-badge-ss flex items-center gap-2">
                <div class="px-2.5 py-1 rounded-full text-xs font-bold shadow-sm" :class="getScheduleStatus(item) === 'AKTIF' ? 'status-active' : 'status-inactive'">
                  {{ getScheduleStatus(item) }}
                </div>
                <q-btn
                  flat
                  round
                  dense
                  size="xs"
                  :color="getScheduleStatus(item) === 'AKTIF' ? 'amber-4' : 'positive'"
                  :icon="getScheduleStatus(item) === 'AKTIF' ? 'event_busy' : 'event_available'"
                  class="bg-slate-900/80 backdrop-blur-sm"
                  @click.stop="toggleStatus(item)"
                >
                  <q-tooltip>
                    Ubah Status ke {{ getScheduleStatus(item) === 'AKTIF' ? 'LIBUR' : 'AKTIF' }}
                  </q-tooltip>
                </q-btn>
              </div>
            </div>

            <!-- Floating Card Overlay -->
            <div class="floating-white-card-overlay text-center relative-position shadow-2xl">
              <div class="circle-icon-badge flex items-center justify-center shadow-md">
                <q-icon name="medical_services" size="18px" class="text-white" />
              </div>

              <div class="poli-subtitle font-bold text-xs text-teal-700 uppercase tracking-wider line-clamp-1 q-mt-xs">
                {{ getPoliTitle(item) }}
              </div>

              <h3 class="doctor-name-ss font-extrabold text-slate-900 line-clamp-2 leading-snug">
                {{ formatDoctorName(item) }}
              </h3>

              <div class="card-footer-strip rounded-xl p-2 bg-slate-50 border border-slate-100 flex items-center justify-between text-xs q-mt-sm">
                <div class="flex items-center gap-1.5 font-bold text-teal-800">
                  <q-icon name="schedule" size="14px" class="text-teal-600" />
                  <span>{{ formatTime(item.jam_mulai) }} - {{ formatTime(item.jam_selesai) }} WIB</span>
                </div>
                <q-btn
                  unelevated
                  dense
                  no-caps
                  size="xs"
                  :color="getScheduleStatus(item) === 'AKTIF' ? 'negative' : 'positive'"
                  class="px-2.5 rounded-lg font-bold"
                  :label="getScheduleStatus(item) === 'AKTIF' ? 'Set Libur' : 'Set Aktif'"
                  @click.stop="toggleStatus(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-16 text-center">
        <q-icon name="event_busy" size="56px" class="text-slate-300 q-mb-sm" />
        <div class="text-base font-bold text-slate-700">Jadwal Dokter Tidak Ditemukan</div>
        <div class="text-xs text-slate-400 max-w-sm mx-auto q-mt-xs">
          Tidak ada data jadwal dokter spesialis untuk kriteria filter ini.
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreData" class="flex justify-center q-mt-lg q-mb-sm">
        <q-btn
          unelevated
          rounded
          color="teal-8"
          no-caps
          label="Tampilkan Lebih Banyak Dokter"
          icon-right="expand_more"
          class="font-bold px-6"
          @click="loadMore"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api, api2 } from 'src/boot/axios'
import doctorFemaleAvatar from 'src/assets/images/doctor-female.webp'
import doctorMaleAvatar from 'src/assets/images/doctor-male.webp'

const $q = useQuasar()
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

function getScheduleKeys(item) {
  const keys = []
  if (item.id) keys.push(`id_${item.id}`)

  const docId = item.pegawai?.nip || item.pegawai?.nik || item.nama_dokter
  const hari = item.hari || 'SENIN'
  const poli = getPoliTitle(item)
  const comboKey = `${docId}_${hari}_${poli}`.replace(/\s+/g, '_')
  keys.push(comboKey)

  return keys
}

function getScheduleStatus(item) {
  const keys = getScheduleKeys(item)
  for (const key of keys) {
    if (statusOverrides.value[key] !== undefined) {
      return statusOverrides.value[key]
    }
  }
  return item.status || 'AKTIF'
}

function toggleStatus(item) {
  const current = getScheduleStatus(item)
  const nextStatus = current === 'AKTIF' ? 'LIBUR' : 'AKTIF'
  const docName = formatDoctorName(item)
  const poliName = getPoliTitle(item)
  const hariName = item.hari || 'Hari ini'
  const keys = getScheduleKeys(item)
  const primaryKey = keys[0]

  $q.dialog({
    title: 'Konfirmasi Perubahan Status',
    message: `Apakah Anda yakin ingin mengubah status praktik <b>${docName}</b> (${poliName} - ${hariName}) dari <b class="${current === 'AKTIF' ? 'text-positive' : 'text-negative'}">${current}</b> menjadi <b class="${nextStatus === 'AKTIF' ? 'text-positive' : 'text-negative'}">${nextStatus}</b>?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(async () => {
    // Simpan di semua varian key untuk jaminan 100% kecocokan
    keys.forEach(k => {
      statusOverrides.value[k] = nextStatus
    })
    saveOverrides()

    try {
      await api.post('/v1/jadwal_dokter_overrides/update_status', {
        override_key: primaryKey,
        nip_nik: item.pegawai?.nip || item.pegawai?.nik || '',
        nama_dokter: docName,
        hari: hariName,
        nama_poli: poliName,
        status: nextStatus
      })

      $q.notify({
        type: 'positive',
        message: `Status praktik ${docName} berhasil diubah menjadi ${nextStatus}!`,
        icon: nextStatus === 'AKTIF' ? 'event_available' : 'event_busy',
        position: 'top'
      })
    } catch (e) {
      console.error('Failed to sync status to backend:', e)
      $q.notify({
        type: 'positive',
        message: `Status praktik ${docName} diubah menjadi ${nextStatus}!`,
        icon: nextStatus === 'AKTIF' ? 'event_available' : 'event_busy',
        position: 'top'
      })
    }
  })
}

const mapDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU']

function getTodayString() {
  const dayIdx = new Date().getDay()
  const today = mapDays[dayIdx]
  selectedDay.value = today === 'MINGGU' ? 'SENIN' : today
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
      schedules.value = resp.data.data
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

watch([selectedDay, selectedPoliFilter, searchQuery], () => {
  displayLimit.value = 12
})

onMounted(() => {
  getTodayString()
  fetchJadwalPoli()
})
</script>

<style lang="scss" scoped>
.margin-0 {
  margin: 0;
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
</style>
