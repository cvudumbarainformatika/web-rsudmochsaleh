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

    <div class="flex flex-wrap justify-center q-gutter-md q-mb-lg">
      <div
        v-for="(kelas, index) in kelasList"
        :key="kelas"
      >
        <q-card
          class="glass-tile shadow-10 cursor-pointer"
          :class="[`glow-${index % 4}`]"
          @click="handleKelasClick(kelas)"
        >
          <q-card-section class="q-pa-md text-center ">
            <!-- <q-icon :name="iconMap[kelas] || 'hotel'" size="34px" class="text-primary q-mb-xs" /> -->
            <div class="text-subtitle text-bold">Kelas {{ kelas }}</div>
          </q-card-section>

          
        </q-card>
      </div>
      <q-card
          class="glass-tile shadow-10 cursor-pointer"
          :class="[`glow-${100 % 4}`]"
          @click="handleKelasClick('semua')"
        >
          <q-card-section class="q-pa-md text-center ">
            <!-- <q-icon :name="iconMap[kelas] || 'hotel'" size="34px" class="text-primary q-mb-xs" /> -->
            <div class="text-subtitle text-bold">Semua</div>
          </q-card-section>

          
        </q-card>
    </div>

    
    <div class="flex flex-wrap items-stretch justify-center q-gutter-md">
      <q-card
        v-for="(item, i) in ruangTidur"
        :key="i"
        class="futuristic-card q-pa-lg"
        flat
        bordered
      >
        <div class="card-glow"></div>
        <q-card-section>
          <div class="text-h6">{{ item.ruang }}</div>
          <div class="text-caption text-grey-5">Kelas: {{ item.jenis || '-' }}</div>
          <q-separator spaced />
          <div class="flex q-gutter-sm items-center flex-center">
            <q-chip color="cyan-5" text-color="black">Total: {{ item.total }}</q-chip>
            <q-chip color="red-5" text-color="white">Terisi: {{ item.terisi }}</q-chip>
            <!-- <q-chip color="green-5" text-color="black">Kosong: {{ item.kosong }}</q-chip> -->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref , onMounted} from 'vue'
  import { useTempatTidurStore } from 'src/stores/web/tempatTidur'
  const ruangTidur = ref([
    { ruang: 'RUANG WIJAYA KUSUMA', jenis: 'VIP', total: 13, terisi: 4, kosong: 9 },
    { ruang: 'RUANG ASOKA KELAS 1', jenis: '1', total: 2, terisi: 1, kosong: 1 },
    { ruang: 'RUANG ASOKA KELAS 2', jenis: '2', total: 2, terisi: 0, kosong: 2 },
    { ruang: 'RUANG ASOKA KELAS 3', jenis: '3', total: 4, terisi: 4, kosong: 0 },
    { ruang: 'RUANG ASOKA KELAS HCU', jenis: 'HCU', total: 10, terisi: 6, kosong: 4 },
    { ruang: 'RUANG BOUGENVIL KELAS 2', jenis: '2', total: 10, terisi: 8, kosong: 2 },
    { ruang: 'RUANG BOUGENVIL KELAS 3', jenis: '3', total: 17, terisi: 11, kosong: 6 },
    { ruang: 'RUANG DAHLIA HCU', jenis: null, total: 4, terisi: 1, kosong: 3 },
    { ruang: 'RUANG DAHLIA ISOLASI', jenis: '1', total: 2, terisi: 0, kosong: 2 },
    { ruang: 'RUANG DAHLIA NICU', jenis: 'NICU', total: 6, terisi: 3, kosong: 3 },
    { ruang: 'RUANG DAHLIA PERINATOLOGI', jenis: null, total: 4, terisi: 3, kosong: 1 },
    { ruang: 'RUANG FLAMBOYAN ISO', jenis: null, total: 1, terisi: 1, kosong: 0 },
    { ruang: 'RUANG FLAMBOYAN JIWA', jenis: null, total: 2, terisi: 0, kosong: 2 },
    { ruang: 'RUANG FLAMBOYAN KELAS 3', jenis: '3', total: 35, terisi: 18, kosong: 17 },
    { ruang: 'RUANG ICCU', jenis: 'ICCU', total: 7, terisi: 6, kosong: 1 },
    { ruang: 'RUANG ICU', jenis: 'ICU', total: 10, terisi: 5, kosong: 5 },
    { ruang: 'RUANG KAMAR GE (MAWAR)', jenis: null, total: 2, terisi: 0, kosong: 2 },
    { ruang: 'RUANG KAMAR ISOLASI AIRBONE (MAWAR)', jenis: null, total: 2, terisi: 0, kosong: 2 },
    { ruang: 'RUANG KEMUNING BAWAH KELAS 1', jenis: '1', total: 16, terisi: 7, kosong: 9 },
    { ruang: 'RUANG KEMUNING BAWAH KELAS 2', jenis: '2', total: 12, terisi: 7, kosong: 5 },
    { ruang: 'RUANG MAWAR KELAS 1', jenis: '1', total: 6, terisi: 0, kosong: 6 },
    { ruang: 'RUANG MAWAR KELAS 2', jenis: '2', total: 6, terisi: 1, kosong: 5 },
    { ruang: 'RUANG MAWAR KELAS 3', jenis: '3', total: 10, terisi: 0, kosong: 10 },
    { ruang: 'RUANG MELATI KELAS 1', jenis: '1', total: 1, terisi: 0, kosong: 1 },
    { ruang: 'RUANG MELATI KELAS 2', jenis: '2', total: 4, terisi: 0, kosong: 4 },
    { ruang: 'RUANG MELATI KELAS 3', jenis: '3', total: 6, terisi: 1, kosong: 5 },
    { ruang: 'RUANG SAKURA KELAS ISO', jenis: 'ISO', total: 18, terisi: 7, kosong: 11 },
    { ruang: 'RUANG WIJAYA KUSUMA PRESIDENTIAL SUITE', jenis: 'PS', total: 2, terisi: 1, kosong: 1 }
  ])


  const kelasList = ref([
  "1",
  "2",
  "3",
  "HCU",
  "ICCU",
  "ICU",
  "ISO",
  "NICU",
  "PS",
  "VIP"
]);

const iconMap = {
  "1": "looks_one",
  "2": "looks_two",
  "3": "looks_3",
  "HCU": "favorite",
  "ICCU": "monitor_heart",
  "ICU": "local_hospital",
  "ISO": "coronavirus",
  "NICU": "baby_changing_station",
  "PS": "accessible",
  "VIP": "star"
};

const store = useTempatTidurStore()
onMounted(() => {
  Promise.all([
    store.getData()
  ])
  .then(() => {
    ruangTidur.value = store?.data
    kelasList.value = store?.kelas
  })
})

const handleKelasClick = (kelas) => {
  // console.log('', kelas?.toLowerCase()?.replace(/kelas\s*/i, ''));
  // console.log('', kelas);

  if (kelas === 'semua') {
    ruangTidur.value = store?.data
  } else {

    ruangTidur.value = store?.data?.filter((item) => item?.jenis === kelas)
  }

}


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



/* style Khusus Atas */
.bg-dark {
  background: radial-gradient(ellipse at top, #0f2027 0%, #203a43 50%, #2c5364 100%);
  /* min-height: 100%; */
  padding-bottom: 40px;
}

.text-glow {
  text-shadow: 0 0 8px #0ff, 0 0 14px #0ff;
  color: #e0f7fa;
}

.glass-tile {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  /* width: 140px; */
  /* height: 120px; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.glass-tile:hover {
  transform: scale(1.08) rotateY(6deg);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

.glow-0 q-icon {
  animation: glowPulseA 2s ease-in-out infinite;
}

.glow-1 q-icon {
  animation: glowPulseB 3s ease-in-out infinite;
}

.glow-2 q-icon {
  animation: glowPulseC 2.5s ease-in-out infinite;
}

.glow-3 q-icon {
  animation: glowPulseD 3.2s ease-in-out infinite;
}

@keyframes glowPulseA {
  0%, 100% { text-shadow: 0 0 6px #0ff, 0 0 12px #0ff; transform: scale(1); }
  50% { text-shadow: 0 0 12px #0ff, 0 0 24px #0ff; transform: scale(1.1); }
}

@keyframes glowPulseB {
  0%, 100% { text-shadow: 0 0 6px #f0f, 0 0 12px #f0f; transform: scale(1); }
  50% { text-shadow: 0 0 12px #f0f, 0 0 24px #f0f; transform: scale(1.1); }
}

@keyframes glowPulseC {
  0%, 100% { text-shadow: 0 0 6px #0f0, 0 0 12px #0f0; transform: scale(1); }
  50% { text-shadow: 0 0 12px #0f0, 0 0 24px #0f0; transform: scale(1.1); }
}

@keyframes glowPulseD {
  0%, 100% { text-shadow: 0 0 6px #ff0, 0 0 12px #ff0; transform: scale(1); }
  50% { text-shadow: 0 0 12px #ff0, 0 0 24px #ff0; transform: scale(1.1); }
}
</style>
