<template>
  <section class="dashboard-summary bg-dark">
    <div class="summary-grid">
      <div class="summary-card" v-for="item in stats" :key="item.label">
        <div class="icon-box" :class="item.color">
          <q-icon :name="item.icon" size="32px" />
        </div>
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useTempatTidurStore } from 'src/stores/web/tempatTidur'

const stats = reactive([
  {
    label: 'Total Tempat Tidur',
    value: 58,
    unit: 'Tempat',
    icon: 'bed',
    color: 'cyan'
  },
  {
    label: 'Terisi',
    value: 34,
    unit: 'Pasien',
    icon: 'group',
    color: 'red'
  },
  {
    label: 'Kosong',
    value: 24,
    unit: 'Sisa',
    icon: 'event_available',
    color: 'green'
  },
  {
    label: 'Ruangan Aktif',
    value: 7,
    unit: 'Unit',
    icon: 'meeting_room',
    color: 'amber'
  }
])

const store = useTempatTidurStore()

onMounted(() => {
  Promise.all([
    store.getData()
  ])
})

</script>

<style scoped>
.dashboard-summary {
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100%;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
}

.icon-box {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.icon-box.cyan {
  color: #00ffff;
}
.icon-box.red {
  color: #ff6b6b;
}
.icon-box.green {
  color: #66ff66;
}
.icon-box.amber {
  color: #ffc107;
}

.label {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.4rem;
}

.value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.unit {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.3rem;
}
</style>
