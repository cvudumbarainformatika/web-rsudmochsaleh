<template>
  <div class="footer-wrapper bg-slate-100">
    <div class="glow-top-line" />
    <div class="full-width content-container">
      <div class="container-padding">
        <div class="row q-col-gutter-xl q-pb-xl">
          <!-- Hospital Info -->
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="footer-card glass-card-light p-6 rounded-2xl">
              <div class="text-h5 text-weight-bolder text-teal-8 q-mb-xs">
                {{ store.header.title }}
              </div>
              <div class="text-caption text-slate-600 line-height-relaxed q-mb-md">
                {{ store.header.alamat }}
              </div>
              <div class="flex q-gutter-sm">
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-facebook"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="store.header.link_fb"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-instagram"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="store.header.link_instagram"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-youtube"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="store.header.link_youtube"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-tumblr-alt"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="store.header.link_tiktok"
                  target="_blank"
                />
              </div>
            </div>
          </div>

          <!-- Contact Us -->
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="footer-card glass-card-dark p-6 rounded-2xl glow-border">
              <div class="text-subtitle1 text-weight-bolder text-cyan-3 tracking-wider q-mb-md uppercase">
                HUBUNGI KAMI
              </div>
              <div class="contact-item row items-center q-mb-sm text-grey-3">
                <q-icon
                  name="call"
                  class="q-mr-sm text-cyan-4"
                  size="18px"
                /> <span>{{ store.header.phone }}</span>
              </div>
              <div class="contact-item row items-center q-mb-sm text-grey-3">
                <q-icon
                  name="email"
                  class="q-mr-sm text-cyan-4"
                  size="18px"
                /> <span>{{ store.header.email }}</span>
              </div>
              <div
                class="contact-item row items-center cursor-pointer text-cyan-3 hover-cyan"
                @click="goToLink(store.header.link_map)"
              >
                <q-icon
                  name="place"
                  class="q-mr-sm"
                  size="18px"
                /> <span class="text-weight-bold">Lihat Lokasi di Maps</span>
              </div>
            </div>
          </div>

          <!-- Related Links -->
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
            <div class="footer-card glass-card-dark p-6 rounded-2xl glow-border">
              <div class="text-subtitle1 text-weight-bolder text-cyan-3 tracking-wider q-mb-md uppercase">
                LINK TERKAIT
              </div>
              <div class="links-list flex column q-gutter-xs">
                <div
                  class="link-item cursor-pointer text-grey-3"
                  @click="goToLink('https://probolinggokota.go.id')"
                >
                  <q-icon name="chevron_right" size="16px" class="text-cyan-4 q-mr-xs" /> Pemkot Probolinggo
                </div>
                <div
                  class="link-item cursor-pointer text-grey-3"
                  @click="goToLink('https://diskominfo.probolinggokota.go.id')"
                >
                  <q-icon name="chevron_right" size="16px" class="text-cyan-4 q-mr-xs" /> Diskominfo
                </div>
                <div
                  class="link-item cursor-pointer text-grey-3"
                  @click="goToLink('https://www.lapor.go.id/')"
                >
                  <q-icon name="chevron_right" size="16px" class="text-cyan-4 q-mr-xs" /> LAPOR.GO.ID
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Google Map Section -->
        <div class="map-container glass-card-dark rounded-2xl overflow-hidden glow-border q-mb-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.2113550381034!2d113.21003672914748!3d-7.745245670780843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad951d2eefe7%3A0x84d2e3e5a3dce896!2sRSUD%20dr.%20Mohamad%20Saleh!5e1!3m2!1sid!2sid!4v1673713586077!5m2!1sid!2sid"
            width="100%"
            height="260"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>

        <!-- Copyright -->
        <q-separator dark class="opacity-20 q-mb-md" />
        <div class="text-center text-caption text-grey-5 q-pb-lg">
          &copy; {{ new Date().getFullYear() }} RSUD dr. Mohamad Saleh Kota Probolinggo. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'

const store = useAppStore()

function goToLink(val) {
  window.open(val, '_blank')
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: relative;
  background: #f1f5f9;
  color: #0f172a;
  overflow: hidden;
}

.glow-top-line {
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--q-primary) 0%, var(--q-secondary) 50%, var(--q-primary) 100%);
  box-shadow: 0 0 15px var(--q-secondary);
}

.content-container {
  padding-top: 3rem;
  z-index: 10;
  position: relative;
}

.footer-card {
  height: 100%;
  min-height: 200px;
  border-radius: 20px !important;
}

.social-btn {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--q-secondary) !important;
  border: 1px solid var(--q-secondary) !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: var(--q-secondary) !important;
    color: white !important;
    transform: translateY(-3px);
    box-shadow: 0 0 15px var(--q-secondary) !important;
  }
}

.link-item {
  transition: all 0.3s ease;
  padding: 4px 0;

  &:hover {
    color: #00f2fe !important;
    transform: translateX(5px);
  }
}

.contact-item {
  font-size: 0.9rem;
}

.hover-cyan:hover {
  color: #00f2fe !important;
}

.map-container {
  border-radius: 20px !important;
}
</style>
