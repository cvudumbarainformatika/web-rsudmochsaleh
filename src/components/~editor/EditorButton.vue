<template>
  <div v-if="editor">
    <div class="row items-center q-gutter-xs q-mb-sm bg-grey-2 q-py-xs">
      <!-- <add-more-btn
        @code-block="editor.chain().focus().toggleCodeBlock().run()"
      /> -->

      <menu-bar-btn
        icon="undo"
        tooltip="kembali -1 langkah"

        @click="editor.chain().focus().undo().run()"
      />
      <menu-bar-btn
        icon="redo"
        tooltip="kembali +1 langkah"
        @click="editor.chain().focus().redo().run()"
      />
      <q-separator
        vertical
      />
      <menu-bar-btn
        icon="format_bold"
        :active="editor.isActive('bold')"
        tooltip="Huruf Tebal"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <menu-bar-btn
        icon="format_italic"
        tooltip="Huruf Miring"
        :active="editor.isActive('italic')"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <menu-bar-btn
        icon="format_underlined"
        tooltip="Garis Bawah"
        :active="editor.isActive('underline')"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
      <menu-bar-btn
        icon="strikethrough_s"
        tooltip="Garis tengah"
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <menu-bar-btn
        icon="code"
        tooltip="Model Code"
        :active="editor.isActive('code')"
        @click="editor.chain().focus().toggleCode().run()"
      />
      <q-separator
        vertical
      />

      <heading-dropdown
        :headings="headings"
        @paragraph="editor.chain().focus().setParagraph().run()"
        @heading="handleClickHeading"
      />
      <heading-dropdown
        :headings="aligns"
        icon="subject"
        avatar
        label-first="Left"
        icon-first="format_align_left"
        tooltip="Align format"
        @paragraph="editor.chain().focus().setTextAlign('left').run()"
        @heading="(val)=>editor.chain().focus().setTextAlign(val).run()"
      />
      <btn-dropdown-color
        icon="border_color"
        @set-color="(val)=> editor.chain().focus().toggleHighlight({ color: val }).run()"
      />
      <btn-dropdown-color
        @set-color="(val)=> editor.chain().focus().setColor(val).run()"
      />
      <menu-bar-btn
        icon="subscript"
        tooltip="Subscript"
        :active="editor.isActive('subscript')"
        @click="editor.chain().focus().toggleSubscript().run()"
      />
      <menu-bar-btn
        icon="superscript"
        tooltip="Superscript"
        :active="editor.isActive('superscript')"
        @click="editor.chain().focus().toggleSuperscript().run()"
      />
      <q-separator
        vertical
      />
      <menu-bar-btn
        icon="format_quote"
        tooltip="Quote"
        :active="editor.isActive('blockquote')"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
      <menu-bar-btn
        icon="data_object"
        tooltip="Code Block"
        :active="editor.isActive('codeBlock')"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
      <q-separator
        vertical
      />
      <menu-bar-btn
        icon="format_list_bulleted"
        tooltip="Format list Bullet"
        :active="editor.isActive('bulletList')"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <menu-bar-btn
        icon="format_list_numbered"
        tooltip="Format list Nomor"
        :active="editor.isActive('orderedList')"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <menu-bar-btn
        icon="checklist"
        tooltip="List Check"
        :active="editor.isActive('taskList')"
        @click="editor.chain().focus().toggleTaskList().run()"
      />
      <menu-bar-btn
        icon="horizontal_rule"
        tooltip="Garis Mendatar"
        @click="editor.chain().focus().setHorizontalRule().run()"
      />
      <q-separator
        vertical
      />
      <menu-bar-btn
        icon="format_clear"
        tooltip="Format Clear"
        @click="editor.chain().focus().unsetAllMarks().run()"
      />
      <menu-bar-btn
        icon="layers_clear"
        tooltip="Clear Fiture"
        @click="editor.chain().focus().clearNodes().run()"
      />
      <q-separator
        vertical
      />
      <!-- <menu-bar-btn
        icon="image"
        tooltip="masukkan gambar"
      /> -->
      <menu-bar-btn
        icon="image"
        tooltip="gallery & upload gambar"
        @click="dialogGallery"
      />

      <menu-bar-btn
        icon="icon-my-word"
        tooltip="upload doc word"
        @click="pickFile"
      />
      <q-file
        ref="refWord"
        v-model="word"
        label="Word"
        dense
        accept=".doc, .docx"
        class="hidden"
        @update:model-value="startImport"
      />

      <menu-bar-btn
        icon="smart_display"
        tooltip="upload doc word"
        @click="emits('onAddYoutube')"
      />
      <menu-bar-btn
        icon="share"
        tooltip="Buat Link"
        :active="editor.isActive('link')"
        @click="setLink"
      />
      <menu-bar-btn
        icon="link_off"
        tooltip="Remove Link"
        :disabled="!editor.isActive('link')"
        @click="editor.chain().focus().unsetLink().run()"
      />

      <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
      <q-separator vertical />
      <menu-bar-btn
        icon="table_chart"
        tooltip="Insert Table"
        :active="editor.isActive('table')"
        @click="insertTable"
      />
    </div>
    <!-- dialog gallery -->
    <!-- <app-dialog
      v-model="dialogImage"
      label="File Image Manager"
      @on-ok="getImage"
      @on-close="dialogImage = false"
    >
      <template #default>
        <app-gallery @select-image="imageGetter" />
      </template>
    </app-dialog> -->

    <q-dialog
      v-model="dialogImage"
      full-width
      full-height
      persistent
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            File Image Manager
          </div>
        </q-card-section>

        <q-separator />
        <div
          style="max-height: 80vh; height:73vh"
          class="scroll"
        >
          <app-gallery @select-image="imageGetter" />
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="dark"
            no-caps
            label="Close"
            @click="dialogImage = false"
          />
          <q-btn
            label="OK"
            no-caps
            color="primary"
            @click="getImage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <table-toolbar
    v-if="editor && editor.isActive('table')"
    :editor="editor"
  />
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'

// import AddMoreBtn from 'src/components/~editor/components/AddMoreBtn.vue'
import MenuBarBtn from './components/MenuBarBtn.vue'
import HeadingDropdown from 'src/components/~editor/components/HeadingDropdown.vue'
import BtnDropdownColor from './BtnDropdownColor.vue'
import TableToolbar from './TableToolbar.vue'

const props = defineProps({
  editor: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['onimportword', 'onAddYoutube'])

const word = ref(null)
const refWord = ref(null)
const dialogImage = ref(false)
// const url = ref(prompt('Enter YouTube URL'))

const imageSelected = ref(null)

const headings = ref([
  { label: 'Heading 1', icon: 'H1', value: 1 },
  { label: 'Heading 2', icon: 'H2', value: 2 },
  { label: 'Heading 3', icon: 'H3', value: 3 },
  { label: 'Heading 4', icon: 'H4', value: 4 },
  { label: 'Heading 5', icon: 'H5', value: 5 }
])
const aligns = ref([
  { label: 'center', icon: 'format_align_center', value: 'center' },
  { label: 'right', icon: 'format_align_right', value: 'right' },
  { label: 'justify', icon: 'format_align_justify', value: 'justify' }
])
// const listsMenu = ref([
//   { link: 'Upload Gambar', icon: 'cloud' },
//   { link: 'Gallery', icon: 'collections' }
// ])

function pickFile() {
  refWord.value.pickFiles()
}

function getImage() {
  console.log('on-ok', imageSelected.value)
  if (imageSelected.value === null) {
    return notifErrVue('pilih Gambar terlebih dahulu')
  }
  dialogImage.value = false
  props.editor.chain().focus().setImage({ src: imageSelected.value }).run()
}
function imageGetter(val) {
  imageSelected.value = val
}

async function startImport() {
  console.log('word', word.value)
  const formData = new FormData()
  formData.append('doc', word.value)
  try {
    await api.post('/v1/berita/upload_word', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((resp) => {
      // console.log(resp)
      emits('onimportword', resp.data)
    })
  } catch (error) {
    // this.loading = false
  }
}

function handleClickHeading(val) {
  props.editor.chain().focus().toggleHeading({ level: val }).run()
}

function dialogGallery() {
  dialogImage.value = true
}

function setLink() {
  const previousUrl = props.editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()
  }

  // update link
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

function insertTable() {
  if (!props.editor) return
  props.editor.chain()
    .focus()
    .insertTable({
      rows: 3,
      cols: 3,
      withHeaderRow: true
    })
    .run()
}

</script>
