<template>
  <footer class="footer-section text-slate-300">
    <!-- Top Glow Accent Line -->
    <div class="footer-glow-line" />

    <div class="container-padding py-12 md:py-16">
      <div class="row q-col-gutter-lg">
        
        <!-- KOLOM 1: Brand & Kontak Utama -->
        <div class="col-12 col-md-4 col-lg-4">
          <div class="footer-brand-wrap">
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
            <div class="footer-subtitle text-teal-4 text-weight-bold text-caption uppercase tracking-wider q-mb-md">
              Kota Probolinggo
            </div>
            <p class="footer-desc text-slate-400 text-body2 leading-relaxed q-mb-lg">
              {{ store.header.alamat || 'Jl. Mayjen Panjaitan No.65 Kota Probolinggo' }}
            </p>
            
            <!-- Sosmed Buttons -->
            <div class="flex gap-2">
              <q-btn
                v-if="store.header.link_fb"
                dense flat round
                icon="ti-facebook"
                size="md"
                class="social-icon-btn"
                :href="store.header.link_fb"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_instagram"
                dense flat round
                icon="ti-instagram"
                size="md"
                class="social-icon-btn"
                :href="store.header.link_instagram"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_youtube"
                dense flat round
                icon="ti-youtube"
                size="md"
                class="social-icon-btn"
                :href="store.header.link_youtube"
                target="_blank"
              />
              <q-btn
                v-if="store.header.link_tiktok"
                dense flat round
                icon="ti-tumblr-alt"
                size="md"
                class="social-icon-btn"
                :href="store.header.link_tiktok"
                target="_blank"
              />
            </div>
          </div>
        </div>

        <!-- KOLOM 2: Hubungi Kami -->
        <div class="col-12 col-sm-6 col-md-2.5 col-lg-2.5">
          <div class="footer-links-col">
            <h4 class="column-heading text-white text-weight-bold tracking-wider uppercase q-mb-lg">
              Hubungi Kami
            </h4>
            <ul class="contact-list">
              <li class="flex items-start gap-2.5 q-mb-md">
                <q-icon name="call" size="18px" class="text-teal-4 q-mt-xs" />
                <div>
                  <span class="text-xs text-slate-500 block">Telepon</span>
                  <span class="text-body2 text-slate-300 font-medium block">{{ store.header.phone || '(0335) 433119' }}</span>
                </div>
              </li>
              <li class="flex items-start gap-2.5 q-mb-md">
                <q-icon name="email" size="18px" class="text-teal-4 q-mt-xs" />
                <div>
                  <span class="text-xs text-slate-500 block">Email Resmi</span>
                  <span class="text-body2 text-slate-300 font-medium break-all block">{{ store.header.email || 'rsud@probolinggokota.go.id' }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- KOLOM 3: Link Terkait -->
        <div class="col-12 col-sm-6 col-md-2.5 col-lg-2.5">
          <div class="footer-links-col">
            <h4 class="column-heading text-white text-weight-bold tracking-wider uppercase q-mb-lg">
              Link Terkait
            </h4>
            <div class="flex flex-col gap-3">
              <a
                href="https://probolinggokota.go.id"
                target="_blank"
                class="footer-link-item flex items-center gap-1 text-slate-400 hover:text-teal-4 transition-colors duration-250"
              >
                <q-icon name="chevron_right" size="16px" class="text-teal-5" />
                Pemkot Probolinggo
              </a>
              <a
                href="https://diskominfo.probolinggokota.go.id"
                target="_blank"
                class="footer-link-item flex items-center gap-1 text-slate-400 hover:text-teal-4 transition-colors duration-250"
              >
                <q-icon name="chevron_right" size="16px" class="text-teal-5" />
                Diskominfo Kota
              </a>
              <a
                href="https://www.lapor.go.id/"
                target="_blank"
                class="footer-link-item flex items-center gap-1 text-slate-400 hover:text-teal-4 transition-colors duration-250"
              >
                <q-icon name="chevron_right" size="16px" class="text-teal-5" />
                LAPOR.GO.ID
              </a>
            </div>
          </div>
        </div>

        <!-- KOLOM 4: Peta Lokasi (Sekarang di dalam grid footer) -->
        <div class="col-12 col-md-3 col-lg-3">
          <div class="footer-links-col">
            <h4 class="column-heading text-white text-weight-bold tracking-wider uppercase q-mb-md">
              Lokasi Kami
            </h4>
            
            <div class="footer-map-card overflow-hidden rounded-xl border border-slate-800 shadow-lg q-mb-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.2113550381034!2d113.21003672914748!3d-7.745245670780843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad951d2eefe7%3A0x84d2e3e5a3dce896!2sRSUD%20dr.%20Mohamad%20Saleh!5e1!3m2!1sid!2sid!4v1673713586077!5m2!1sid!2sid"
                width="100%"
                height="130"
                style="border:0; display:block;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <q-btn
              flat no-caps
              size="sm"
              icon="directions"
              label="Petunjuk Arah Maps"
              class="text-teal-4 btn-directions p-0"
              @click="goToLink(store.header.link_map || 'https://maps.google.com')"
            />
          </div>
        </div>

      </div>

      <!-- Footer Bottom Copyright -->
      <div class="footer-bottom border-t border-slate-800/60 pt-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {{ new Date().getFullYear() }} RSUD dr. Mohamad Saleh Kota Probolinggo.
        </div>
        <div class="flex gap-4">
          <span class="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan</span>
          <span class="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
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
.footer-section {
  background: #090d16;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-glow-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, #0d9488 0%, #06b6d4 50%, #0d9488 100%);
  opacity: 0.8;
}

.footer-logo {
  height: 44px;
  width: auto;
  object-fit: contain;

  &.pemkot-logo {
    height: 38px;
  }
}

.footer-title {
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}

.column-heading {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  border-bottom: 2px solid rgba(13, 148, 136, 0.15);
  padding-bottom: 6px;
  display: inline-block;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link-item {
  text-decoration: none;
  font-size: 0.88rem;
  transition: all 0.25s ease;
  
  &:hover {
    transform: translateX(4px);
  }
}

.social-icon-btn {
  background: rgba(255, 255, 255, 0.03) !important;
  color: #94a3b8 !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  width: 38px;
  height: 38px;
  transition: all 0.25s ease !important;

  &:hover {
    background: rgba(13, 148, 136, 0.1) !important;
    color: #0d9488 !important;
    border-color: #0d9488 !important;
    transform: translateY(-2px);
  }
}

.footer-map-card {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    border-color: rgba(13, 148, 136, 0.4);
    box-shadow: 0 4px 20px rgba(13, 148, 136, 0.1);
  }
}

.btn-directions {
  transition: color 0.25s ease;
  &:hover {
    color: #06b6d4 !important;
  }
}
</style>
