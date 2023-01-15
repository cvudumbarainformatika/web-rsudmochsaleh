<template>
  <div
    class="bgr-model"
  >
    <!-- <div class="bgr-1" />
    <div class="bgr-2" /> -->
    <div class="full-width q-mt-lg text-white tempat--text">
      <div class="container-padding">
        <div class="row q-col-gutter-lg">
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="text-h5 text-weight-bold">
              {{ store.header.title }}
            </div>
            <div class="f-12">
              {{ store.header.alamat }}
            </div>
            <div class="q-py-lg">
              <q-btn
                dense
                flat
                icon="ti-facebook"
                size="lg"
                :href="store.header.link_fb"
                target="_blank"
              />
              <q-btn
                dense
                flat
                icon="ti-instagram"
                size="lg"
                :href="store.header.link_instagram"
                target="_blank"
              />
              <q-btn
                dense
                flat
                icon="ti-youtube"
                size="lg"
                :href="store.header.link_youtube"
                target="_blank"
              />
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="text-h5 text-weight-bold q-mb-lg">
              HUBUNGI KAMI :
            </div>
            <div class="q-pr-md row text-center f-12 q-mb-sm">
              <q-icon
                name="call"
                class="q-pr-sm"
                size="14px"
              /> <span>{{ store.header.phone }}</span>
            </div>
            <div class="q-pr-md row text-center f-12 q-mb-sm">
              <q-icon
                name="email"
                class="q-pr-sm"
                size="14px"
              /> <span>{{ store.header.email }}</span>
            </div>
            <div
              class="q-pr-md row text-center f-12 q-mb-sm cursor-pointer"
              @click="goToLink(store.header.link_map)"
            >
              <q-icon
                name="place"
                class="q-pr-sm"
                size="14px"
              /> <span>lihat lokasi</span>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="text-h5 text-weight-bold q-mb-lg">
              LINK TERKAIT :
            </div>
            <div @click="goToLink('https://probolinggokota.go.id')">
              probolinggokota.go.id
            </div>
          </div>
        </div>

        <!-- map -->
        <div style="width: 100%">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.2113550381034!2d113.21003672914748!3d-7.745245670780843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad951d2eefe7%3A0x84d2e3e5a3dce896!2sRSUD%20dr.%20Mohamad%20Saleh!5e1!3m2!1sid!2sid!4v1673713586077!5m2!1sid!2sid"
            width="100%"
            height="300"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const $q = useQuasar()
const mobile = ref($q.platform.is.mobile)
console.log('footer', mobile)

const store = useAppStore()

function goToLink(val) {
  window.open(val, '_blank')
}

const prim = computed(() => {
  let pri = '#423a8e'
  if (store.themes.length > 0) {
    pri = store.themes[0].value
  }
  return pri
})
const second = computed(() => {
  let sec = '#06b8b8'
  if (store.themes.length > 0) {
    sec = store.themes[1].value
  }
  return sec
})
</script>

<style lang="scss" scoped>
.bgr-model{
  position: relative;
  // padding-top: 20px;
  padding-bottom: 40px;
  background: linear-gradient(-180deg, v-bind(prim), v-bind(second));
  // background-color: v-bind(prim);
  overflow: hidden;
  &::before {
    // z-index: -1;
      content: "";
      width:100%;
      height:300px;
      position: absolute;
      // transform: translateY(-100px) translateX(30px) rotate(45deg);
      background-color:rgb(255, 255, 255);
      border-radius: 100%;
      top:0;
      transform: translateY(-150px);
      // left: 50%;
      // transform: translate(-52%, 0) translateY(-128px) rotate(5deg);
      // overflow: hidden;
    }
    // &::after {
    //   // z-index: -1;
    //   content: "";
    //   width:300px;
    //   height:300px;
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    //   transform: translateY(-150px) translateX(-30px)  rotate(45deg);
    //   background-color:rgb(255, 255, 255);
    //   border-radius: 20px;
    //   // overflow: hidden;
    // }

  .bgr-1{
      width:200px;
      height:200px;
      position: absolute;
      transform: translateY(-100px) translateX(30px) rotate(45deg);
      background-color:rgb(255, 255, 255);
      border-radius: 20px;
      overflow: hidden;
  }

  .bgr-2 {
      width:300px;
      height:300px;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(-150px) translateX(-30px)  rotate(45deg);
      background-color:rgb(255, 255, 255);
      border-radius: 20px;
      overflow: hidden;
  }
}

.tempat--text {
  padding-top: 200px;
  z-index: 100;
}
</style>
