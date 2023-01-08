<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <div class="text-h6">
        Upload Animasi
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section class="bg-grey-2">
      <div
        style="max-height: 70vh; height:68vh"
        class="scroll"
      >
        <!-- <q-uploader
          bordered
          label="Upload Animasi Json"
          :url="SERVER+'/v1/lottie/upload'"
          field-name="jsons[]"
          :headers="[
            {name: 'Authorization', value: `Bearer ${token}`}
          ]"
          accept=".json"
          class="full-width"
          auto-upload
          multiple
          max-files="9"
          flat
          @rejected="onRejected"
        >
          <template #list="scope">
            <div>
              <div
                v-if="scope.files.length===0"
                class="column flex-1 flex-center"
                style="min-height: 250px;"
              >
                <q-icon
                  name="cloud_upload"
                  size="40px"
                  color="primary"
                />
                <div class="f-10">
                  Seret Gambar Kesini
                </div>
                <div class="text-grey-5 f-10">
                  atau
                </div>
                <div class="f-10">
                  Klik tanda plus diatas
                </div>
              </div>
              <div
                v-else
                class="row q-col-gutter-md"
                style="min-height:250px"
              >
                <q-list separator>
                  <q-item
                    v-for="file in scope.files"
                    :key="file.__key"
                  >
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ file.name }}
                      </q-item-label>

                      <q-item-label caption>
                        Status: {{ file.__status }}
                      </q-item-label>

                      <q-item-label caption>
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section
                      v-if="file.__img"
                      thumbnail
                      class="gt-xs"
                    >
                      <img :src="file.__img.src">
                    </q-item-section>

                    <q-item-section
                      top
                      side
                    >
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="scope.removeFile(file)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </template>
        </q-uploader> -->

        <q-uploader
          url="/assets/upload-lottie"
          style="max-width: 300px"
        />
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn
        color="dark"
        no-caps
        label="Close"
        @click="emits('onClose')"
      />
      <q-btn
        label="OK"
        no-caps
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
// import { LottieAnimation } from 'lottie-web-vue'
// import { SERVER } from 'src/boot/axios'
// import * as storage from 'src/modules/storage'
// import { ref } from 'vue'

// const token = storage.getLocalToken()
const emits = defineEmits(['onOk', 'onClose'])

// const anim = ref(null)

// const loopComplete = () => {
//   console.log('loopComplete')
// }

// const complete = () => {
//   console.log('complete')
// }

// const enterFrame = () => {
//   console.log('enterFrame')
// }

// function onRejected (entries) {
//   console.log(entries)
// }

</script>
