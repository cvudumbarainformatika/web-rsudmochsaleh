import { defineStore } from 'pinia'
import { api2 } from 'src/boot/axios'

export const useRsudLiveStore = defineStore('rsud_live_web', {
  state: () => ({
    status: {
      igd: {
        status: 'Normal',
        pasien: 4,
        keterangan: 'Alur Cepat 🟢'
      },
      poli: {
        status: 'Padat',
        pasien: 269,
        poliAktif: 16
      },
      rawatInap: {
        tersedia: 84,
        totalBed: 208
      },
      operasi: {
        status: 'Ramai',
        jadwalHariIni: 9,
        selesai: 0
      }
    },
    jadwalDokterLive: [],
    antreanLive: null,
    pascaRawat: null,
    lastUpdated: '',
    loading: false
  }),

  actions: {
    async getStatus() {
      this.loading = true
      try {
        const resp = await api2.get('/api/v1/rsud-live/status')
        if (resp && resp.data && resp.data.success) {
          const res = resp.data.data
          if (res.igd) {
            this.status.igd = {
              status: res.igd.status || 'Normal',
              pasien: res.igd.pasien_aktif ?? 4,
              keterangan: res.igd.keterangan || 'Alur Pelayanan Cepat & Terurai'
            }
          }
          if (res.poliklinik || res.poli) {
            const p = res.poliklinik || res.poli
            this.status.poli = {
              status: p.status || 'Padat',
              pasien: p.total_antrean_hari_ini ?? p.pasien ?? 269,
              poliAktif: p.poli_buka ?? p.poliAktif ?? 16
            }
          }
          if (res.rawat_inap || res.rawatInap) {
            const r = res.rawat_inap || res.rawatInap
            this.status.rawatInap = {
              tersedia: r.bed_kosong ?? r.tersedia ?? 84,
              totalBed: r.total_kapasitas_bed ?? r.totalBed ?? 208
            }
          }
          if (res.operasi) {
            this.status.operasi = {
              status: res.operasi.status || 'Ramai',
              jadwalHariIni: res.operasi.jadwal_hari_ini ?? res.operasi.jadwalHariIni ?? 9,
              selesai: res.operasi.tindakan_selesai ?? res.operasi.selesai ?? 0
            }
          }
          this.lastUpdated = resp.data.last_updated ? resp.data.last_updated.split(' ')[1] : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      } catch (error) {
        console.log('Error getStatus xenter:', error)
      } finally {
        this.loading = false
      }
    },

    async getJadwalDokterLive() {
      try {
        const resp = await api2.get('/api/v1/rsud-live/jadwal-dokter-live')
        this.jadwalDokterLive = resp.data.data || resp.data
      } catch (error) {
        console.log('Error getJadwalDokterLive:', error)
      }
    },

    async getAntreanLive(noregOrNorm) {
      try {
        const resp = await api2.get(`/api/v1/rsud-live/antrean-live/${noregOrNorm}`)
        this.antreanLive = resp.data.data || resp.data
      } catch (error) {
        console.log('Error getAntreanLive:', error)
      }
    },

    async getPascaRawat(norm) {
      try {
        const resp = await api2.get(`/api/v1/rsud-live/pasca-rawat/${norm}`)
        this.pascaRawat = resp.data.data || resp.data
      } catch (error) {
        console.log('Error getPascaRawat:', error)
      }
    }
  }
})
