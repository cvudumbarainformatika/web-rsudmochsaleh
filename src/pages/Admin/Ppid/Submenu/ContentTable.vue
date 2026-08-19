<template>
  <div class="admin-table-container">
    <div v-if="items.length === 0" class="column flex-center text-slate-400 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200/80">
      <q-icon name="view_list" size="36px" class="opacity-40 q-mb-xs" />
      <div class="text-xs font-bold text-slate-500">Belum ada data submenu PPID</div>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="(item, n) in items"
        :key="n"
        class="admin-item-card bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-5"
      >
        <!-- KIRI: Thumbnail + Details (grow) -->
        <div class="flex items-center gap-3.5 grow overflow-hidden">
          <!-- Thumbnail dengan Fallback Standard Img -->
          <div class="w-[100px] h-[65px] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-100 relative">
            <img
              :src="getImage(item.thumbnail)"
              alt="Thumbnail"
              class="w-full h-full object-cover rounded-xl"
              @error="handleImgError"
            />
          </div>

          <!-- Lottie Animation Preview (Bila Ada) -->
          <div v-if="item.animation" class="w-11 h-11 shrink-0 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center p-1">
            <app-lottie :url="item.animation" />
          </div>

          <!-- Details -->
          <div class="grow overflow-hidden pr-2">
            <h3 class="text-sm font-extrabold text-slate-900 margin-0 truncate leading-snug">
              {{ item.nama }}
            </h3>
            <p v-if="item.content" class="text-xs text-slate-500 margin-0 mt-1 line-clamp-1 font-medium">
              {{ stripHtml(item.content) }}
            </p>
          </div>
        </div>

        <!-- KANAN UJUNG: Action Controls (Right-Aligned) -->
        <div class="flex items-center gap-1.5 shrink-0 justify-end border-l border-slate-100 pl-3">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit_note"
            class="hover:bg-blue-50"
            @click="emits('onEdit', item)"
          >
            <q-tooltip class="bg-primary text-white">Edit Submenu</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete_outline"
            class="hover:bg-rose-50"
            @click="emits('onDelete', item)"
          >
            <q-tooltip class="bg-negative text-white">Hapus Submenu</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import fallbackImg from '../../../../assets/images/no-image.png'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['onDelete', 'onEdit'])

function handleImgError(e) {
  e.target.src = fallbackImg
}

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim()
}

function getImage(image) {
  if (!image || image === null || image === '' || image === 'null') {
    return fallbackImg
  }
  if (image.startsWith('http') || image.startsWith('/')) {
    return image
  }
  return pathImg + image
}
</script>

<style scoped lang="scss">
:deep(img), :deep(figure), :deep(iframe) {
  display: none !important;
}
</style>
