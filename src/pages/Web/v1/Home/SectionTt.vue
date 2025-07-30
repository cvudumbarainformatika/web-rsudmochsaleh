<template>
  <div class="q-pa-lg bg-dark text-white">
    <div class="text-center q-py-xl">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text">Informasi Ketersediaan</span>
          <span class="text-primary"> Ruang Perawatan</span>
        </div>
        <div class="title-line" />
      </div>
    </div>
    
    <div class="row items-stretch justify-center q-gutter-md">
      <q-card
        v-for="(item, i) in ruangTidur"
        :key="i"
        class="futuristic-card col-12 col-sm-12 col-md-3 col-lg-3"
        flat
        bordered
      >
        <div class="card-glow"></div>
        <q-card-section>
          <div class="text-h6">{{ item.ruang }}</div>
          <div class="text-caption text-grey-5">Kelas: {{ item.kelas || '-' }}</div>
          <q-separator spaced />
          <div class="row q-gutter-sm items-center">
            <q-chip color="cyan-5" text-color="black">Total: {{ item.total }}</q-chip>
            <q-chip color="red-5" text-color="white">Terisi: {{ item.terisi }}</q-chip>
            <q-chip color="green-5" text-color="black">Kosong: {{ item.kosong }}</q-chip>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
      import { ref } from 'vue'
      const ruangTidur = ref([
        { ruang: 'RUANG WIJAYA KUSUMA', kelas: 'VIP', total: 13, terisi: 4, kosong: 9 },
        { ruang: 'RUANG ASOKA KELAS 1', kelas: '1', total: 2, terisi: 1, kosong: 1 },
        { ruang: 'RUANG ASOKA KELAS 2', kelas: '2', total: 2, terisi: 0, kosong: 2 },
        { ruang: 'RUANG ASOKA KELAS 3', kelas: '3', total: 4, terisi: 4, kosong: 0 },
        { ruang: 'RUANG ASOKA KELAS HCU', kelas: 'HCU', total: 10, terisi: 6, kosong: 4 },
        { ruang: 'RUANG BOUGENVIL KELAS 2', kelas: '2', total: 10, terisi: 8, kosong: 2 },
        { ruang: 'RUANG BOUGENVIL KELAS 3', kelas: '3', total: 17, terisi: 11, kosong: 6 },
        { ruang: 'RUANG DAHLIA HCU', kelas: null, total: 4, terisi: 1, kosong: 3 },
        { ruang: 'RUANG DAHLIA ISOLASI', kelas: '1', total: 2, terisi: 0, kosong: 2 },
        { ruang: 'RUANG DAHLIA NICU', kelas: 'NICU', total: 6, terisi: 3, kosong: 3 },
        { ruang: 'RUANG DAHLIA PERINATOLOGI', kelas: null, total: 4, terisi: 3, kosong: 1 },
        { ruang: 'RUANG FLAMBOYAN ISO', kelas: null, total: 1, terisi: 1, kosong: 0 },
        { ruang: 'RUANG FLAMBOYAN JIWA', kelas: null, total: 2, terisi: 0, kosong: 2 },
        { ruang: 'RUANG FLAMBOYAN KELAS 3', kelas: '3', total: 35, terisi: 18, kosong: 17 },
        { ruang: 'RUANG ICCU', kelas: 'ICCU', total: 7, terisi: 6, kosong: 1 },
        { ruang: 'RUANG ICU', kelas: 'ICU', total: 10, terisi: 5, kosong: 5 },
        { ruang: 'RUANG KAMAR GE (MAWAR)', kelas: null, total: 2, terisi: 0, kosong: 2 },
        { ruang: 'RUANG KAMAR ISOLASI AIRBONE (MAWAR)', kelas: null, total: 2, terisi: 0, kosong: 2 },
        { ruang: 'RUANG KEMUNING BAWAH KELAS 1', kelas: '1', total: 16, terisi: 7, kosong: 9 },
        { ruang: 'RUANG KEMUNING BAWAH KELAS 2', kelas: '2', total: 12, terisi: 7, kosong: 5 },
        { ruang: 'RUANG MAWAR KELAS 1', kelas: '1', total: 6, terisi: 0, kosong: 6 },
        { ruang: 'RUANG MAWAR KELAS 2', kelas: '2', total: 6, terisi: 1, kosong: 5 },
        { ruang: 'RUANG MAWAR KELAS 3', kelas: '3', total: 10, terisi: 0, kosong: 10 },
        { ruang: 'RUANG MELATI KELAS 1', kelas: '1', total: 1, terisi: 0, kosong: 1 },
        { ruang: 'RUANG MELATI KELAS 2', kelas: '2', total: 4, terisi: 0, kosong: 4 },
        { ruang: 'RUANG MELATI KELAS 3', kelas: '3', total: 6, terisi: 1, kosong: 5 },
        { ruang: 'RUANG SAKURA KELAS ISO', kelas: 'ISO', total: 18, terisi: 7, kosong: 11 },
        { ruang: 'RUANG WIJAYA KUSUMA PRESIDENTIAL SUITE', kelas: 'PS', total: 2, terisi: 1, kosong: 1 }
      ])
</script>

<style scoped>
.futuristic-card {
  position: relative;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
  z-index: 1;
}
.futuristic-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
}
.card-glow {
  content: "";
  position: absolute;
  top: -30%;
  left: -30%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1), transparent 70%);
  animation: rotate-glow 10s linear infinite;
  z-index: 0;
}
@keyframes rotate-glow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
