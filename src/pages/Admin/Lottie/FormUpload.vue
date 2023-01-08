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
        <q-uploader
          bordered
          label="Upload Animasi Json"
          :url="SERVER+'/v1/lottie/upload'"
          field-name="images[]"
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
              <!-- {{ scope }} -->
              </div>
              <div
                v-else
                class="row q-col-gutter-md"
                style="min-height:250px"
              >
                <div
                  v-for="file in scope.files"
                  :key="file.__key"
                  class="col-4"
                >
                  <q-card>
                    <!-- <q-img
                    v-if="file.__img"
                    thumbnail
                    :ratio="16/9"
                    fit="cover"
                    :src="file.__img.src"
                  >
                    <div class="absolute-bottom">
                      <div class="f-12 ellipsis">
                        {{ file.name }}
                      </div>
                      <div class="f-10">
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </div>
                    </div>
                    <div class="absolute no-padding transparent">
                      <q-icon
                        :name="file.__status==='uploaded'?'done_all':'warnimg'"
                        size="sm"
                        :color="file.__status==='idle'?'negative':'green-5'"
                        class="q-pa-xs"
                      />
                    </div>
                  </q-img> -->
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        round
                        color="grey"
                        size="sm"
                        icon="content_copy"
                      />
                      <q-btn
                        flat
                        round
                        color="negative"
                        size="sm"
                        icon="delete"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </template>
        </q-uploader>
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
import { SERVER } from 'src/boot/axios'
import * as storage from 'src/modules/storage'

const token = storage.getLocalToken()
const emits = defineEmits(['onOk', 'onClose'])

function onRejected (entries) {
  console.log(entries)
}
</script>
