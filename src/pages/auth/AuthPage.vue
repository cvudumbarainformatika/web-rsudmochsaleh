<template>
  <!-- <AppClientOnly> -->
  <q-page class="flex column flex-center">
    <q-card
      flat
      bordered
      class="card-login"
    >
      <q-card-section>
        <div
          class="text-center"
          style="margin-top:30px"
        >
          <q-avatar>
            <img :src="logo">
          </q-avatar>
          <div class="text-h6 text-white">
            Halaman Login
          </div>
          <div class="text-white">
            Silahkan Anda Login Terlebih Dahulu
          </div>
        </div>
        <q-form
          class="q-pa-md"
          style="margin-top:70px"
          @submit="onSubmit"
        >
          <app-input
            v-model="email"
            dense
            label="email"
            validator="email"
            icon="icon-mat-email"
          />
          <app-input
            v-model="password"
            dense
            type="password"
            label="password"
            icon="icon-mat-key"
            class="q-mt-sm"
          />

          <div style="margin-top:50px">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              no-caps
              class="full-width"
              :disable="storeAuth.loading"
            />
          </div>
          <div class="q-pt-md text-right">
            <q-btn
              label="Kembali Ke Beranda"
              flat
              no-caps
              to="/"
            />
          </div>
        </q-form>
      </q-card-section>
      <div class="absolute-bottom q-pa-lg text-grey-6">
        <q-separator />
        <div class="">
          Aplikasi ini tidak di perjualbelikan secara bebas tanpa seizin dari pembuatnya.
        </div>
        <div class="q-mt-lg text-right f-14">
          ADMIN WEBSITE
        </div>
      </div>
    </q-card>
  </q-page>
  <!-- </AppClientOnly> -->
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { computed, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { useAuthStore } from 'src/stores/auth'
import { useAppStore } from 'src/stores/app'
// eslint-disable-next-line no-unused-vars
import { pathImg } from 'src/boot/axios'

// import AppClientOnly from 'src/components/~global/AppClientOnly.vue'

const $q = useQuasar()

const storeAuth = useAuthStore()

let app
if (process.env.CLIENT) {
  app = useAppStore()

  onMounted(() => {
    app.getAppHeader()
  })
}

// const myForm = ref(null)
// const form = ref({
//   email: '',
//   password: '',
//   device_name: $q.platform.is.name + '-' + $q.platform.is.platform
// })

const email = ref(null)
const password = ref(null)
// eslint-disable-next-line no-unused-vars
const deviceName = ref($q.platform.is.name + '-' + $q.platform.is.platform)

const prim = computed(() => {
  let pri = '#423a8e'
  if (app.themes.length > 0) {
    pri = app.themes[0].value
  }
  return pri
})
const second = computed(() => {
  let sec = '#06b8b8'
  if (app.themes.length > 0) {
    sec = app.themes[1].value
  }
  return sec
})

const logo = computed(() => {
  if (app?.logo === null) {
    return new URL('../../assets/logos/logo-rsud.png', import.meta.url).href
  } else {
    return pathImg + app?.logo
  }
})

const onSubmit = () => {
  const form = {
    email: email.value,
    password: password.value,
    device_name: deviceName.value
  }
  storeAuth.login(form)
}

</script>

<style lang="scss" scoped>
.card-login {
  width:360px;
  min-height:600px;
  overflow: hidden;
  position: relative;
    &::before {
      content: "";
      width:360px;
      height:200px;
      position: absolute;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(-45deg, v-bind(prim), v-bind(second));
      overflow: hidden;
    }
}

@media(max-width:800px){
    .card-login {
        width: 100vw;
        height:100vh;
        border-radius: 0px;
          &::before {
            width: 100vw;
          }
    }
}
</style>
