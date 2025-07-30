<template>
  <div class="q-pa-md bg-dark text-white">
    <div class="text-center q-py-lg">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text">INFORMASI KETERSEDIAAN</span>
          <span class="text-primary"> RUANG PERAWATAN</span>
        </div>
        <div class="title-line" />
      </div>
    </div>

    <div class="flex flex-wrap justify-center q-gutter-md">
      <div
        v-for="(kelas, index) in kelasList"
        :key="kelas"
      >
        <q-card
          class="glass-tile shadow-10 q-pa-sm"
          :class="[`glow-${index % 4}`]"
        >
          <q-card-section class="q-pa-sm text-center">
            <q-icon :name="iconMap[kelas] || 'hotel'" size="34px" class="text-primary q-mb-xs" />
            <div class="text-subtitle1 text-bold">Kelas {{ kelas }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>


    <div class="view-more-wrapper q-pa-lg q-mt-xl">
      <app-btn
        rounded
        label="Selengkapnya"
        class="view-more-btn"
        @click="router.push('/informasi-ruang-perawatan')"
      >
        <template #append>
          <q-icon
            name="arrow_forward"
            class="q-ml-sm"
          />
        </template>
      </app-btn>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTempatTidurStore } from 'src/stores/web/tempatTidur'
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
const router = useRouter()

onMounted(() => {
  Promise.all([
    store.getData()
  ])
  .then(() => {
    kelasList.value = store?.kelas
  })
})

</script>

<style scoped>
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
  width: 140px;
  height: 120px;
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
