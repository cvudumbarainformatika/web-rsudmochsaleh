<template>
  <q-page>
    <div
      id="top"
      class="fixed-top"
    />
    <carousel-web :height="400" />
    <section-berita class="q-pb-lg" />
    <section-pelayanan class="" />
    <!-- <section-one /> -->
    <section-two class="q-pb-lg" />
    <section-three class="q-pb-lg" />
  </q-page>
</template>

<script setup>
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'
import SectionBerita from './SectionBerita.vue'
import SectionPelayanan from './SectionPelayanan.vue'
</script>
