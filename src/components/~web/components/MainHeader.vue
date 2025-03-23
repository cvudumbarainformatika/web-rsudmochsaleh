<template>
  <div class="header__main q-pa-md">
    <div class="container">
      <div class="row items-center justify-between">
        <!-- Logo -->
        <div class="col-auto">
          <q-img
            :src="logo"
            width="200px"
            class="cursor-pointer"
            alt="logo rsud mohamad saleh"
            @click="$router.push('/')"
          />
        </div>

        <!-- Mobile Menu Button -->
        <div class="col-auto q-gutter-x-md">
          <q-btn
            v-if="$q.platform.is.mobile"
            flat
            round
            color="white"
            icon="menu"
            @click="$emit('toggle-drawer')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

defineProps({
  store: {
    type: Object,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  drawer: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-drawer'])
</script>

<style scoped>
.header__main {
  background: linear-gradient(to right, var(--q-primary), var(--q-secondary));
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .header__main {
    padding: 0.5rem;
  }

  .q-img {
    width: 150px !important;
  }
}
</style>
