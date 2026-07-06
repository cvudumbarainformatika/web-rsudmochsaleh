<template>
  <q-page>
    <div
      id="top"
      class="fixed-top"
    />
    <AppClientOnly>
      <carousel-web :height="400" />
      <coba-tt class="q-pb-md" />
      <!-- <section-kelas class="q-pb-md" /> -->
      <section-berita class="q-pb-lg" />
      <SectionPelayanan class="" />
      <!-- <section-one /> -->
      
      <section-two class="q-pb-lg" />
      <section-three class="q-pb-lg" />

      <!-- Floating Button Survey SPBE -->
      <q-page-sticky
        position="bottom-right"
        :offset="[30, 105]"
        style="z-index: 99;"
      >
        <q-btn
          fab
          icon="rate_review"
          color="secondary"
          glossy
          @click="showSurvey = true"
          class="survey-float-btn animate-pulse-glow"
        >
          <q-tooltip 
            anchor="center left" 
            self="center right" 
            :offset="[10, 10]" 
            class="bg-secondary text-white text-bold text-caption shadow-2"
          >
            Isi Survei SPBE
          </q-tooltip>
        </q-btn>
      </q-page-sticky>

      <!-- Dialog Popup Survey SPBE -->
      <q-dialog
        v-model="showSurvey"
        backdrop-filter="blur(5px)"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="survey-card overflow-hidden">
          <!-- Header Bar Dialog -->
          <q-bar class="bg-primary text-white q-py-lg text-bold" style="font-size: 14px; letter-spacing: 0.5px;">
            <q-icon name="poll" size="sm" class="q-mr-xs" />
            <div>SURVEI DIGITAL</div>
            <q-space />
            <q-btn
              dense
              flat
              round
              icon="close"
              v-close-popup
            >
              <q-tooltip class="bg-white text-primary text-bold">Tutup</q-tooltip>
            </q-btn>
          </q-bar>

          <!-- Banner Ilustrasi Survei Kepuasan Masyarakat (Solusi B) -->
          <div class="survey-illustration-box q-py-md text-center">
            <div class="row justify-center items-center">
              <div class="tablet-mockup relative-position shadow-3">
                <div class="tablet-screen bg-white flex justify-center items-center">
                  <img
                    src="/images/logos/logo-pemkot.png"
                    style="height: 52px; width: auto; object-fit: contain;"
                    alt="Logo Pemkot Probolinggo"
                  />
                </div>
                <div class="tablet-home-btn"></div>
              </div>
            </div>
            <div class="text-subtitle2 text-weight-bold text-primary q-mt-sm text-uppercase text-center text-primary-dark" style="letter-spacing: 0.5px;">
              Survei Kepuasan Masyarakat
            </div>
          </div>

          <!-- Body / IFrame -->
          <q-card-section class="q-pa-none" style="height: 60vh;">
            <iframe
              src="https://surveidigital.spbe.go.id/embed/survey/eyJzdXJ2ZXlfaWQiOjIsInNlcnZpY2VfaWQiOjQyMCwiaG9zdCI6Imh0dHBzOi8vcnN1ZC5wcm9ib2xpbmdnb2tvdGEuZ28uaWQiLCJrZXkiOiIyV0tlaWVXbiJ9/embed/view/?jenis_layanan=Website Resmi RSUD dr. Moch. Saleh"
              width="100%"
              height="100%"
              frameborder="0"
              style="border: none; background: #fff;"
            ></iframe>
          </q-card-section>
        </q-card>
      </q-dialog>
    </AppClientOnly>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import AppClientOnly from 'src/components/~global/AppClientOnly.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
import SectionTt from './SectionTt.vue'
import CobaTt from './Cobatt.vue'
import SectionKelas from './SectionKelas.vue'
import SectionBerita from './SectionBerita.vue'
import SectionPelayanan from './SectionPelayanan.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'

const showSurvey = ref(false)

onMounted(() => {
  // Popup otomatis dengan delay 1.5 detik agar transisi load halaman lebih mulus
  setTimeout(() => {
    if (!sessionStorage.getItem('survey_popup_shown')) {
      showSurvey.value = true
      sessionStorage.setItem('survey_popup_shown', 'true')
    }
  }, 1500)
})
</script>

<style lang="scss" scoped>
.survey-card {
  width: 900px;
  max-width: 95vw;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.survey-illustration-box {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(180deg, #fdfdfd 0%, #f4f5f7 100%);
}

.tablet-mockup {
  width: 100px;
  height: 80px;
  border-radius: 10px;
  border: 4px solid #333;
  background: #333;
  padding: 3px;
}

.tablet-screen {
  width: 100%;
  height: 58px;
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
}

.tablet-home-btn {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #888;
  margin: 2px auto 0;
}

.text-primary-dark {
  color: #1a4f80;
}

.survey-float-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.survey-float-btn:hover {
  transform: translateY(-3px) scale(1.08);
}

.animate-pulse-glow {
  animation: pulse-glow-effect 2s infinite;
}

@keyframes pulse-glow-effect {
  0% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.8);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(38, 166, 154, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0);
  }
}
</style>
