<template>
  <section class="pel-section light-grid-bg q-py-xl" ref="sectionRef">
    <div class="container-padding">

      <!-- Section Header -->
      <div class="pel-header-row">
        <div
          class="reveal-item"
          :class="{ 'is-visible': headerVisible }"
          style="--delay: 0ms"
        >
          <div class="section-pill">
            <span class="pill-dot" />
            Fasilitas &amp; Tenaga Medis
          </div>
          <h2 class="pel-heading">
            Layanan
            <span class="heading-accent"> Unggulan</span>
          </h2>
          <p class="pel-subheading">
            Fasilitas terpadu dengan tenaga medis profesional dan berpengalaman untuk kesehatan Anda.
          </p>
        </div>
        <q-btn flat no-caps class="btn-semua-desktop" @click="router.push('/pelayanan')">
          Lihat Semua <q-icon name="arrow_forward" size="16px" class="q-ml-xs" />
        </q-btn>
      </div>

      <!-- Skeleton -->
      <template v-if="store.loading">
        <div class="pel-grid-layout">
          <div class="pel-grid-side">
            <q-skeleton height="100px" style="border-radius:18px;margin-bottom:14px" />
            <q-skeleton height="100px" style="border-radius:18px;margin-bottom:14px" />
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              <q-skeleton height="160px" style="border-radius:18px" />
              <q-skeleton height="160px" style="border-radius:18px" />
            </div>
          </div>
          <div class="pel-grid-featured">
            <q-skeleton height="100%" style="min-height:430px;border-radius:22px" />
          </div>
        </div>
      </template>

      <!-- Grid -->
      <template v-else-if="items && items.length">
        <div class="pel-grid-layout">

          <!-- ── KIRI: 2 Wide + 2 Mini Hero ── -->
          <div class="pel-grid-side">

            <!-- 2 Card Wide ditumpuk (items[1] & items[2]) -->
            <div
              v-for="(item, i) in items.slice(1, 3)"
              :key="'wide-' + i"
              class="reveal-item"
              :class="{ 'is-visible': visibleCards[i + 1] }"
              :style="`--delay: ${(i + 1) * 80}ms`"
            >
              <div class="card-wide" @click="clickList(item.nama)">
                <div class="card-icon-box">
                  <q-icon :name="getServiceIcon(i + 1)" size="26px" class="icon-teal" />
                </div>
                <div class="card-wide-body">
                  <div class="card-title">{{ item.nama }}</div>
                  <div class="card-desc" v-if="item.desc">{{ item.desc }}</div>
                </div>
                <q-icon name="arrow_outward" size="16px" class="card-arrow" />
              </div>
            </div>

            <!-- 2 Card Mini-Hero bawah (items[3] & items[4]) — gaya identik hero kanan -->
            <div class="small-grid">
              <div
                v-for="(item, i) in items.slice(3, 5)"
                :key="'mini-' + i"
                class="reveal-item"
                :class="{ 'is-visible': visibleCards[i + 3] }"
                :style="`--delay: ${(i + 3) * 80}ms`"
              >
                <div class="card-mini-hero" @click="clickList(item.nama)">
                  <div class="mini-visual">
                    <div class="hero-bg-pattern" />
                    <div class="mini-icon-wrap">
                      <q-icon :name="getServiceIcon(i + 3)" size="32px" class="icon-teal" />
                    </div>
                  </div>
                  <div class="mini-body">
                    <div class="mini-top">
                      <span class="hero-badge">
                        <q-icon name="medical_services" size="9px" class="q-mr-xs" />
                        Layanan
                      </span>
                      <q-icon name="arrow_outward" size="14px" class="card-arrow" />
                    </div>
                    <div class="card-title-sm">{{ item.nama }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── KANAN: Kartu Hero ── -->
          <div
            class="pel-grid-featured reveal-item"
            :class="{ 'is-visible': visibleCards[0] }"
            style="--delay: 0ms"
          >
            <div class="card-hero" @click="clickList(items[0]?.nama)">
              <!-- Area visual atas: ikon besar + pola -->
              <div class="hero-visual">
                <div class="hero-bg-pattern" />
                <div class="hero-icon-wrap">
                  <q-icon :name="getServiceIcon(0)" size="64px" class="hero-icon" />
                </div>
              </div>

              <!-- Info bawah -->
              <div class="hero-body">
                <div class="hero-top">
                  <span class="hero-badge">
                    <q-icon name="star" size="10px" class="q-mr-xs" />
                    Unggulan
                  </span>
                  <q-icon name="arrow_outward" size="17px" class="hero-arrow" />
                </div>
                <h3 class="hero-title">{{ items[0]?.nama }}</h3>
                <p class="hero-desc" v-if="items[0]?.desc">{{ items[0]?.desc }}</p>
                <div class="hero-cta">
                  Lihat Detail Layanan
                  <q-icon name="arrow_forward" size="14px" class="q-ml-xs" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- CTA Mobile -->
        <div class="text-center q-mt-xl pel-cta-mobile">
          <q-btn unelevated rounded no-caps
            label="Lihat Semua Layanan"
            icon-right="arrow_forward"
            class="btn-cta-semua"
            @click="router.push('/pelayanan')"
          />
        </div>
      </template>

      <!-- Empty -->
      <template v-else>
        <div class="text-center q-py-xl text-slate-400">
          <q-icon name="medical_services" size="56px" class="opacity-20 q-mb-md" />
          <div class="text-subtitle1">Data layanan belum tersedia</div>
        </div>
      </template>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = usePelayananWeb()
const sectionRef = ref(null)

const items = computed(() => store.menus || [])
const headerVisible = ref(false)
const visibleCards = ref([false, false, false, false])
let observers = []

const iconList = [
  'favorite', 'biotech', 'science', 'local_hospital',
  'medical_services', 'health_and_safety', 'vaccines', 'psychology'
]
function getServiceIcon(i) { return iconList[i % iconList.length] }

function clickList(val) {
  if (val) store.setTab(val)
  router.push('/pelayanan')
}

const setupObservers = () => {
  observers.forEach((o) => o.disconnect())
  observers = []

  const header = sectionRef.value?.querySelector('.pel-header-row')
  if (header) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headerVisible.value = true; obs.unobserve(header) }
    }, { threshold: 0.01, rootMargin: '150px 0px 100px 0px' })
    obs.observe(header)
    observers.push(obs)
  }

  const cards = sectionRef.value?.querySelectorAll('.reveal-item') || []
  cards.forEach((el, i) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { visibleCards.value[i] = true }, i * 20)
        obs.unobserve(el)
      }
    }, { threshold: 0.01, rootMargin: '150px 0px 100px 0px' })
    obs.observe(el)
    observers.push(obs)
  })
}

watch(() => store.menus, async (v) => {
  if (v?.length) { await nextTick(); setupObservers() }
})

onMounted(async () => {
  await store.getMenu()
  await nextTick()
  setupObservers()
})

onUnmounted(() => observers.forEach((o) => o.disconnect()))
</script>

<style scoped lang="scss">
.pel-section { position: relative; }

// ── Header ───────────────────────────────────────────────────────
.pel-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.section-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0d9488;
  margin-bottom: 0.6rem;
}

.pill-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 8px rgba(13,148,136,0.55);
  flex-shrink: 0;
}

.pel-heading {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin: 0 0 0.4rem;
}

.heading-accent {
  background: linear-gradient(90deg, #0d9488, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pel-subheading {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 520px;
  margin: 0;
}

.btn-semua-desktop {
  flex-shrink: 0;
  font-size: 0.82rem;
  font-weight: 700;
  color: #0d9488 !important;
  border: 1.5px solid rgba(13,148,136,0.3);
  border-radius: 22px;
  padding: 6px 18px;
  transition: all 0.25s ease;
  white-space: nowrap;
  display: none;

  @media (min-width: 768px) { display: inline-flex; }
  &:hover { background: rgba(13,148,136,0.07) !important; border-color: #0d9488; }
}

// ── Grid ─────────────────────────────────────────────────────────
.pel-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: stretch;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
}

.pel-grid-side {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 960px) { order: 1; }
}

.pel-grid-featured {
  @media (min-width: 960px) { order: 2; }
}

.small-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  flex: 1;
}

// ── Reveal ───────────────────────────────────────────────────────
.reveal-item {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);

  &.is-visible { opacity: 1; transform: translateY(0); }
}

// ── Warna ikon — hanya teal ──────────────────────────────────────
.icon-teal {
  color: #0d9488;
}

// ── Card Icon Box ────────────────────────────────────────────────
.card-icon-box {
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(13,148,136,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon-box-sm {
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(13,148,136,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

// ── Card Wide (Kiri Atas) ─────────────────────────────────────────
.card-wide {
  background: white;
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,0.07);
  box-shadow: 0 2px 12px rgba(15,23,42,0.06);
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(15,23,42,0.11);
    .card-arrow { color: #0d9488; transform: translateX(3px) translateY(-3px); }
  }
}

.card-wide-body {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 0.97rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.45;
  margin-top: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  flex-shrink: 0;
  color: #cbd5e1;
  transition: all 0.3s ease;
}

// ── Card Mini-Hero (Kiri Bawah x2) — identik gaya hero kanan ─────
.card-mini-hero {
  background: white;
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,0.07);
  box-shadow: 0 2px 12px rgba(15,23,42,0.06);
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 32px rgba(15,23,42,0.12);
    .mini-icon-wrap { box-shadow: 0 6px 20px rgba(13,148,136,0.18); }
    .card-arrow { color: #0d9488; transform: translateX(2px) translateY(-2px); }
  }
}

.mini-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
  min-height: 120px;
  padding: 1.25rem 0;
}

.mini-icon-wrap {
  position: relative;
  z-index: 1;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: white;
  border: 1px solid rgba(13,148,136,0.15);
  box-shadow: 0 4px 14px rgba(13,148,136,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease;
}

.mini-body {
  padding: 0.9rem 1rem 1rem;
  border-top: 1px solid rgba(15,23,42,0.06);
}

.mini-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.card-title-sm {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}




// ── Card Hero (Kanan Besar) ──────────────────────────────────────
.card-hero {
  background: white;
  border-radius: 22px;
  border: 1px solid rgba(15,23,42,0.07);
  box-shadow: 0 4px 24px rgba(15,23,42,0.08);
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  min-height: 430px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(15,23,42,0.13);
    .hero-icon { transform: scale(1.08); }
    .hero-arrow { color: #0d9488; transform: translateX(3px) translateY(-3px); }
    .hero-cta { letter-spacing: 0.02em; }
  }
}

.hero-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  position: relative;
  overflow: hidden;
  min-height: 260px;
}

// Pola grid subtle sebagai background visual
.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

.hero-icon-wrap {
  position: relative;
  z-index: 1;
  width: 110px;
  height: 110px;
  border-radius: 28px;
  background: white;
  border: 1px solid rgba(13,148,136,0.15);
  box-shadow: 0 8px 32px rgba(13,148,136,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-icon {
  color: #0d9488;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-body {
  padding: 1.4rem 1.6rem 1.5rem;
  border-top: 1px solid rgba(15,23,42,0.06);
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(13,148,136,0.08);
  color: #0d9488;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 20px;
}

.hero-arrow {
  color: #cbd5e1;
  transition: all 0.3s ease;
}

.hero-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
  margin: 0 0 0.45rem;
}

.hero-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #0d9488, #06b6d4);
  padding: 7px 16px;
  border-radius: 20px;
  width: fit-content;
  transition: letter-spacing 0.3s ease;
}

// ── CTA Mobile ────────────────────────────────────────────────────
.pel-cta-mobile {
  @media (min-width: 768px) { display: none; }
}

.btn-cta-semua {
  background: linear-gradient(135deg, #0d9488, #06b6d4) !important;
  color: white !important;
  font-weight: 700;
  padding: 10px 28px;
  box-shadow: 0 6px 20px rgba(13,148,136,0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(13,148,136,0.4);
  }
}
</style>
