<template>
  <q-page>
    <div
      id="top"
      class="fixed-top"
    />
    <AppClientOnly>
    <carousel-web :height="400" />
    <!-- <section-tt class="q-pb-md" /> -->
    <section-kelas class="q-pb-md" />
    <section-berita class="q-pb-lg" />
    <SectionPelayanan class="" />
    <!-- <section-one /> -->
    
      <section-two class="q-pb-lg" />
      <section-three class="q-pb-lg" />
    </AppClientOnly>
  </q-page>
</template>

<script setup>
import AppClientOnly from 'src/components/~global/AppClientOnly.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
// import SectionTt from './SectionTt.vue'
// import CobaTt from './CobaTt.vue'
import SectionKelas from './SectionKelas.vue'
import SectionBerita from './SectionBerita.vue'
import SectionPelayanan from './SectionPelayanan.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'
</script>
