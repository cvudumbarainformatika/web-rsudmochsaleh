<template>
  <q-page>
    <div
      id="top"
      class="fixed-top"
    />
    <carousel-web :height="400" />
    <section-berita class="q-pb-lg" />
    <SectionPelayanan class="" />
    <!-- <section-one /> -->
    <AppClientOnly>
      <section-two class="q-pb-lg" />
      <section-three class="q-pb-lg" />
    </AppClientOnly>
  </q-page>
</template>

<script setup>
import AppClientOnly from 'src/components/~global/AppClientOnly.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
import SectionBerita from './SectionBerita.vue'
import SectionPelayanan from './SectionPelayanan.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'
</script>
