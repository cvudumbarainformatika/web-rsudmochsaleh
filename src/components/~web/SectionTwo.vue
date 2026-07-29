<template>
  <div :class="admin ? 'q-px-md bg-white' : 'container-padding section-container light-grid-bg'">
    <div class="q-py-xl">
      <div class="row justify-center q-col-gutter-lg relative-position">
        <div
          v-for="(item, i) in lists"
          :key="i"
          class="col-12 col-md-3"
          :class="admin ? 'cursor-pointer' : ''"
        >
          <div class="feature-item glass-card-light hover-lift q-pa-lg">
            <div class="icon-x text-teal-8 bg-teal-1">
              <q-icon
                v-if="!store.loading"
                :name="item.icon"
              />
              <q-skeleton
                v-else
                type="circle"
              />
            </div>
            <div class="text-h6 bold q-mb-md">
              <span
                v-if="!store.loading"
                class="text-slate-900 text-weight-bold"
              >
                {{ item.name }}
                <q-popup-edit
                  v-if="admin"
                  v-slot="scope"
                  v-model="item.name"
                  :cover="true"
                  :offset="[0, 0]"
                  auto-save
                  :validate="val => val.length > 0"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    counter
                    :rules="[
                      val => scope.validate(val) || 'Harap diisi'
                    ]"
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </span>
              <q-skeleton
                v-else
                type="rect"
              />
            </div>
            <div
              v-if="!store.loading"
              class="text-slate-600 text-subtitle2 font-normal"
            >
              {{ item.desc }}
              <q-popup-edit
                v-if="admin"
                v-slot="scope"
                v-model="item.desc"

                auto-save
                :validate="val => val.length > 0"
              >
                <q-input
                  v-model="scope.value"
                  type="textarea"
                  autofocus
                  counter
                  :rules="[
                    val => scope.validate(val) || 'Harap diisi'
                  ]"
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
            <div v-else>
              <q-skeleton type="text" />
              <q-skeleton type="text" />
              <q-skeleton type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- save btn -->
    <div
      v-if="admin"
      class="q-py-lg"
    >
      <q-separator class="q-my-md opacity-20" />
      <app-btn
        label="Simpan Perubahan"
        type="button"
        @click="store.setSectionTwo()"
      />
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})

const store = useAppStore()

const lists = computed(() => store.section_two)

</script>

<style lang="scss" scoped>
.section-container {
  position: relative;
}

.feature-item {
  text-align: center;
  position: relative;
  border-radius: 24px !important;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon-x {
    height: 70px;
    width: 70px;
    margin: 0 auto 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    border-radius: 50%;
    transition: all 0.4s ease;
  }

  &:hover {
    .icon-x {
      background: linear-gradient(135deg, #00b4db, #0083b0);
      color: #ffffff !important;
      transform: scale(1.1);
      box-shadow: 0 0 25px rgba(0, 180, 219, 0.4);
    }
  }
}
</style>
