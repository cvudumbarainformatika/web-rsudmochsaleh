<template>
  <footer class="footer-wrapper">
    <div class="container-padding content-container">
      
      <!-- 3 Columns Cards Row -->
      <div class="row q-col-gutter-lg q-pb-xl">
        <!-- Hospital Info -->
        <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
          <div class="footer-card glass-card p-6 rounded-2xl flex column justify-between h-full">
            <div>
              <div class="flex items-center gap-3 q-mb-md">
                <img
                  :src="logo"
                  alt="Logo RSUD"
                  class="footer-logo"
                />
                <img
                  src="/images/logos/logo-pemkot.png"
                  alt="Logo Pemkot"
                  class="footer-logo pemkot-logo"
                />
              </div>
              <h3 class="footer-title text-white text-weight-bolder leading-tight q-mb-xs">
                {{ store.header.title || 'UOBK RSUD DOKTER MOHAMAD SALEH' }}
              </h3>
              <p class="text-slate-200 text-body2 leading-relaxed q-mb-lg">
                {{ store.header.alamat || 'Jl. Mayjen Panjaitan No.65 Kota Probolinggo' }}
              </p>
            </div>
            
            <!-- Social Media buttons -->
            <div class="flex q-gutter-sm">
              <q-btn
                v-if="store.header.link_fb"
                dense flat round
                icon="ti-facebook"
                size="md"
                class="social-btn"
                :href="store.header.link_fb"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_instagram"
                dense flat round
                icon="ti-instagram"
                size="md"
                class="social-btn"
                :href="store.header.link_instagram"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_youtube"
                dense flat round
                icon="ti-youtube"
                size="md"
                class="social-btn"
                :href="store.header.link_youtube"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_tiktok"
                dense flat round
                icon="ti-tumblr-alt"
                size="md"
                class="social-btn"
                :href="store.header.link_tiktok"
                target="_blank"
              />
            </div>
          </div>
        </div>

        <!-- Contact Us -->
        <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
          <div class="footer-card glass-card p-6 rounded-2xl h-full">
            <h4 class="column-heading text-white text-weight-bold tracking-wider uppercase q-mb-lg">
              Hubungi Kami
            </h4>
            <div class="flex column q-gutter-md">
              <div class="contact-item flex items-start gap-3 text-slate-100">
                <q-icon name="call" class="text-teal-3 q-mt-xs" size="20px" />
                <div>
                  <span class="text-xs text-slate-300 block">Telepon</span>
                  <span class="text-body2 text-white text-weight-medium">{{ store.header.phone || '(0335) 433119' }}</span>
                </div>
              </div>
              
              <div class="contact-item flex items-start gap-3 text-slate-100">
                <q-icon name="email" class="text-teal-3 q-mt-xs" size="20px" />
                <div>
                  <span class="text-xs text-slate-300 block">Email Resmi</span>
                  <span class="text-body2 text-white text-weight-medium break-all">{{ store.header.email || 'rsud@probolinggokota.go.id' }}</span>
                </div>
              </div>
              
              <div
                class="contact-item flex items-start gap-3 cursor-pointer text-slate-100 hover-teal"
                @click="goToLink(store.header.link_map)"
              >
                <q-icon name="place" class="text-teal-3 q-mt-xs" size="20px" />
                <div>
                  <span class="text-xs text-slate-300 block">Lokasi</span>
                  <span class="text-body2 text-white text-weight-bold underline decoration-teal-4">Lihat di Google Maps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Links -->
        <div class="col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12">
          <div class="footer-card glass-card p-6 rounded-2xl h-full">
            <h4 class="column-heading text-white text-weight-bold tracking-wider uppercase q-mb-lg">
              Link Terkait
            </h4>
            <div class="flex column q-gutter-sm">
              <a
                href="https://probolinggokota.go.id"
                target="_blank"
                class="link-item flex items-center gap-2 text-slate-200 hover:text-white"
              >
                <q-icon name="chevron_right" size="18px" class="text-teal-3" />
                <span>Pemkot Probolinggo</span>
              </a>
              <a
                href="https://diskominfo.probolinggokota.go.id"
                target="_blank"
                class="link-item flex items-center gap-2 text-slate-200 hover:text-white"
              >
                <q-icon name="chevron_right" size="18px" class="text-teal-3" />
                <span>Diskominfo Kota</span>
              </a>
              <a
                href="https://www.lapor.go.id/"
                target="_blank"
                class="link-item flex items-center gap-2 text-slate-200 hover:text-white"
              >
                <q-icon name="chevron_right" size="18px" class="text-teal-3" />
                <span>LAPOR.GO.ID</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Google Map Section (Neat and Cohesive Glass Frame) -->
      <div class="map-card-wrapper q-mb-xl">
        <div class="map-frame rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.2113550381034!2d113.21003672914748!3d-7.745245670780843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad951d2eefe7%3A0x84d2e3e5a3dce896!2sRSUD%20dr.%20Mohamad%20Saleh!5e1!3m2!1sid!2sid!4v1673713586077!5m2!1sid!2sid"
            width="100%"
            height="260"
            style="border:0; display:block;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <!-- Footer Bottom Copyright -->
      <div class="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div>
          &copy; {{ new Date().getFullYear() }} RSUD dr. Mohamad Saleh Kota Probolinggo. All rights reserved.
        </div>
        <div class="flex gap-4">
          <span class="hover:text-white cursor-pointer transition-colors duration-200">Syarat & Ketentuan</span>
          <span class="hover:text-white cursor-pointer transition-colors duration-200">Kebijakan Privasi</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from 'src/stores/app'
import { pathImg } from 'src/boot/axios'

const store = useAppStore()

const logo = computed(() => {
  if (store.logo === null) {
    return '/images/logos/logo-rsud.png'
  }
  return pathImg + store.logo
})

function goToLink(val) {
  window.open(val, '_blank')
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: relative;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  color: #ffffff;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.content-container {
  padding-top: 4rem;
  padding-bottom: 2rem;
  z-index: 10;
  position: relative;
}

.footer-logo {
  height: 48px;
  width: auto;
  object-fit: contain;

  &.pemkot-logo {
    height: 42px;
  }
}

.footer-title {
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}

.column-heading {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 6px;
  display: inline-block;
}

.footer-card {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2) !important;
  }
}

.social-btn {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: #ffffff !important;
    color: var(--q-primary) !important;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(255, 255, 255, 0.25) !important;
  }
}

.link-item {
  text-decoration: none;
  font-size: 0.88rem;
  padding: 4px 0;
  transition: all 0.25s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.hover-teal:hover {
  .underline {
    color: #26a69a !important;
  }
}

.map-card-wrapper {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 8px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.map-frame {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1.5rem;
}
</style>
