<template>
  <section class="news-section light-grid-bg q-py-xl" ref="sectionRef">
    <div class="container-padding">

      <!-- Section Header -->
      <div class="news-header-row">
        <div class="reveal-card" :class="{ 'is-visible': headerVisible }" style="--delay: 0ms">
          <div class="section-pill">
            <span class="pill-dot" />
            Informasi Terbaru
          </div>
          <h2 class="news-heading">
            Portal Berita
            <span class="heading-accent">&amp; Informasi</span>
          </h2>
          <p class="news-subheading">
            Kabar terkini seputar layanan, kegiatan, dan informasi kesehatan RSUD dr. Mohamad Saleh Kota Probolinggo.
          </p>
        </div>
        <q-btn
          flat no-caps
          class="btn-semua-desktop"
          @click="router.push('/berita/all')"
        >
          Lihat Semua <q-icon name="arrow_forward" size="16px" class="q-ml-xs" />
        </q-btn>
      </div>

      <!-- Skeleton Loading -->
      <template v-if="store.loading">
        <div class="news-grid-layout">
          <div class="grid-featured"><q-skeleton height="100%" style="min-height:500px;border-radius:24px" /></div>
          <div class="grid-side">
            <q-skeleton height="230px" style="border-radius:18px;margin-bottom:16px" />
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <q-skeleton height="200px" style="border-radius:18px" />
              <q-skeleton height="200px" style="border-radius:18px" />
            </div>
          </div>
        </div>
      </template>

      <!-- Grid Layout -->
      <template v-else-if="store.beranda && store.beranda.length">
        <div class="news-grid-layout">

          <!-- ── KIRI: Kartu Hero Besar ── -->
          <div
            class="grid-featured reveal-card"
            :class="{ 'is-visible': visibleCards[0] }"
            style="--delay: 0ms"
          >
            <article class="card-hero" @click="beritaClick(store.beranda[0])">
              <!-- Gambar penuh -->
              <q-img
                :src="pathImg + store.beranda[0].thumbnail"
                class="hero-img"
                referrerpolicy="no-referrer"
              >
                <template #loading>
                  <div class="full-width full-height flex flex-center" style="background:#f1f5f9">
                    <q-spinner-dots color="teal" size="36px" />
                  </div>
                </template>
              </q-img>

              <!-- Overlay bawah -->
              <div class="hero-overlay">
                <div class="hero-top-row">
                  <span class="hero-badge">
                    <q-icon name="fiber_manual_record" size="8px" class="q-mr-xs text-teal-3" />
                    Terbaru
                  </span>
                  <span class="hero-date">
                    <q-icon name="calendar_today" size="12px" class="q-mr-xs" />
                    {{ dateHuman(store.beranda[0].tanggal) }}
                  </span>
                </div>
                <h3 class="hero-title">{{ store.beranda[0].judul }}</h3>
                <div class="hero-read-btn">
                  Baca Selengkapnya
                  <q-icon name="arrow_forward" size="14px" class="q-ml-xs" />
                </div>
              </div>
            </article>
          </div>

          <!-- ── KANAN: Stack Kartu ── -->
          <div class="grid-side">

            <!-- Kartu 2: Wide horizontal (gambar atas, teks bawah, lebih tinggi) -->
            <div
              v-if="store.beranda[1]"
              class="reveal-card"
              :class="{ 'is-visible': visibleCards[1] }"
              style="--delay: 100ms"
            >
              <article class="card-wide" @click="beritaClick(store.beranda[1])">
                <div class="wide-img-wrap">
                  <q-img
                    :src="pathImg + store.beranda[1].thumbnail"
                    class="wide-img"
                    :ratio="16/7"
                    referrerpolicy="no-referrer"
                  >
                    <template #loading>
                      <div class="full-width full-height flex flex-center" style="background:#f1f5f9">
                        <q-spinner-dots color="teal" size="24px" />
                      </div>
                    </template>
                  </q-img>
                  <div class="wide-img-badge">
                    <q-icon name="calendar_today" size="11px" class="q-mr-xs" />
                    {{ dateHuman(store.beranda[1].tanggal) }}
                  </div>
                </div>
                <div class="wide-body">
                  <div class="wide-title">{{ store.beranda[1].judul }}</div>
                  <div class="wide-arrow">
                    <q-icon name="arrow_outward" size="16px" />
                  </div>
                </div>
              </article>
            </div>

            <!-- Kartu 3 & 4: Grid 2 kolom kecil -->
            <div class="small-cards-grid">
              <div
                v-for="(item, i) in store.beranda.slice(2, 4)"
                :key="i"
                class="reveal-card"
                :class="{ 'is-visible': visibleCards[i + 2] }"
                :style="`--delay: ${200 + i * 100}ms`"
              >
                <article class="card-small" @click="beritaClick(item)">
                  <div class="small-img-wrap">
                    <q-img
                      :src="pathImg + item.thumbnail"
                      class="small-img"
                      :ratio="4/3"
                      referrerpolicy="no-referrer"
                    >
                      <template #loading>
                        <div class="full-width full-height flex flex-center" style="background:#f1f5f9">
                          <q-spinner-dots color="teal" size="20px" />
                        </div>
                      </template>
                    </q-img>
                  </div>
                  <div class="small-body">
                    <span class="small-date">
                      <q-icon name="calendar_today" size="10px" class="q-mr-xs" />
                      {{ dateHuman(item.tanggal) }}
                    </span>
                    <div class="small-title">{{ item.judul }}</div>
                    <span class="small-read">Baca →</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA mobile -->
        <div class="text-center q-mt-xl news-cta-mobile">
          <q-btn
            unelevated rounded no-caps
            label="Lihat Semua Berita"
            icon-right="arrow_forward"
            class="btn-cta-semua"
            @click="router.push('/berita/all')"
          />
        </div>
      </template>

      <!-- Empty -->
      <template v-else>
        <div class="text-center q-py-xl text-slate-400">
          <q-icon name="newspaper" size="56px" class="opacity-20 q-mb-md" />
          <div class="text-subtitle1">Belum ada berita tersedia</div>
        </div>
      </template>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useBeritaWeb } from 'src/stores/web/berita'
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useBeritaWeb()
const sectionRef = ref(null)

const headerVisible = ref(false)
const visibleCards = ref([false, false, false, false])
let observers = []

function beritaClick(val) {
  const slug = String(val.slug).replace(/^"+|"+$/g, '') || 'all'
  store.getContent({ q: slug, slug }).then(() => {
    router.replace({ name: 'berita-detail', params: { slug } })
  })
}

const setupObservers = () => {
  observers.forEach((o) => o.disconnect())
  observers = []

  // Observe header
  const header = sectionRef.value?.querySelector('.news-header-row')
  if (header) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headerVisible.value = true; obs.unobserve(header) }
    }, { threshold: 0.01, rootMargin: '150px 0px 100px 0px' })
    obs.observe(header)
    observers.push(obs)
  }

  // Observe kartu
  const cards = sectionRef.value?.querySelectorAll('.reveal-card') || []
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

watch(() => store.beranda, async (v) => {
  if (v?.length) { await nextTick(); setupObservers() }
})

onMounted(async () => {
  await store.getData('all')
  await nextTick()
  setupObservers()
})

onUnmounted(() => observers.forEach((o) => o.disconnect()))
</script>

<style scoped lang="scss">

// ── Section ──────────────────────────────────────────────────────
.news-section {
  position: relative;
}

// ── Header ───────────────────────────────────────────────────────
.news-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1rem;
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
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 8px rgba(13, 148, 136, 0.6);
  flex-shrink: 0;
}

.news-heading {
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

.news-subheading {
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
  letter-spacing: 0.05em;
  color: #0d9488 !important;
  border: 1.5px solid rgba(13, 148, 136, 0.3);
  border-radius: 22px;
  padding: 6px 18px;
  transition: all 0.25s ease;
  white-space: nowrap;
  display: none;

  @media (min-width: 768px) { display: inline-flex; }

  &:hover {
    background: rgba(13, 148, 136, 0.07) !important;
    border-color: #0d9488;
  }
}

// ── Grid Layout ──────────────────────────────────────────────────
.news-grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: start;

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
}

.grid-side {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.small-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

// ── Scroll Reveal ────────────────────────────────────────────────
.reveal-card {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// ── Card Hero (Kiri Besar) ───────────────────────────────────────
.card-hero {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  min-height: 480px;
  display: block;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.1);

  &:hover {
    .hero-img { transform: scale(1.04); }
    .hero-read-btn { gap: 6px; background: rgba(13, 148, 136, 0.95); }
  }
}

.hero-img {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  min-height: 480px;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 15, 30, 0.92) 0%,
    rgba(5, 15, 30, 0.45) 45%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.75rem 1.75rem 1.5rem;
}

.hero-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(13, 148, 136, 0.85);
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 4px 12px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
}

.hero-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  display: inline-flex;
  align-items: center;
}

.hero-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
  line-height: 1.4;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-read-btn {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  background: rgba(13, 148, 136, 0.7);
  padding: 7px 16px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  width: fit-content;
}

// ── Card Wide (Kanan Atas) ────────────────────────────────────────
.card-wide {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(15, 23, 42, 0.07);
  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.06);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.13);
    .wide-img { transform: scale(1.05); }
    .wide-arrow { color: #0d9488; transform: translateX(3px) translateY(-3px); }
  }
}

.wide-img-wrap {
  position: relative;
  overflow: hidden;
}

.wide-img {
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
}

.wide-img-badge {
  position: absolute;
  bottom: 10px;
  left: 14px;
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  color: white;
  background: rgba(15, 23, 42, 0.6);
  padding: 3px 10px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
}

.wide-body {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  position: relative;
}

.wide-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.wide-arrow {
  flex-shrink: 0;
  color: #cbd5e1;
  margin-top: 2px;
  transition: all 0.3s ease;
}

// ── Card Small (Kanan Bawah x2) ──────────────────────────────────
.card-small {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(15, 23, 42, 0.07);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.13);
    .small-img { transform: scale(1.06); }
    .small-read { color: #0d9488; }
  }
}

.small-img-wrap {
  overflow: hidden;
  flex-shrink: 0;
}

.small-img {
  width: 100%;
  display: block;
  transition: transform 0.5s ease;
}

.small-body {
  padding: 0.85rem 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.small-date {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  color: #94a3b8;
}

.small-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.small-read {
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  transition: color 0.25s ease;
  margin-top: auto;
}

// ── CTA ──────────────────────────────────────────────────────────
.news-cta-mobile {
  @media (min-width: 768px) { display: none; }
}

.btn-cta-semua {
  background: linear-gradient(135deg, #0d9488, #06b6d4) !important;
  color: white !important;
  font-weight: 700;
  padding: 10px 28px;
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(13, 148, 136, 0.4);
  }
}
</style>
