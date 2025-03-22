<template>
  <div>
    <editor-button
      v-if="edited"
      :editor="editor"
      @onimportword="setcontenteditor"
      @on-add-youtube="addVideo"
    />
    <div :class="edited?'editor':''">
      <editor-content
        :editor="editor"
      />
      <!-- Image Bubble Menu -->
      <div class="bubble-menu-wrapper">
        <bubble-menu
          v-if="editor && edited"
          v-show="editor.isActive('custom-image')"
          :editor="editor"
          :tippy-options="tippyOptions"
        >
          <bubble-image :editor="editor" />
        </bubble-menu>
      </div>

      <!-- Table Bubble Menu -->
      <div class="bubble-menu-wrapper">
        <bubble-menu
          v-if="editor && edited"
          v-show="editor.isActive('table')"
          :editor="editor"
          :should-show="shouldShowTableMenu"
          :tippy-options="tableTippyOptions"
        >
          <table-toolbar :editor="editor" />
        </bubble-menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import EditorButton from '../~editor/EditorButton.vue'
import BubbleImage from 'src/components/~editor/BubbleImage.vue'
import TableToolbar from 'src/components/~editor/TableToolbar.vue'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// plugins
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import CustomImage from '../~editor/extensions/custom-image'
import { onBeforeUnmount, ref, watch, onMounted } from 'vue'
// import { computed } from 'vue'

import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  edited: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  editable: props.edited,
  extensions: [
    StarterKit,
    Underline,
    Superscript,
    Subscript,
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
    TaskList, TaskItem,
    TextAlign.configure({
      types: ['heading', 'paragraph', 'table']
    }),
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'custom-table'
      }
    }),
    TableRow.configure({
      HTMLAttributes: {
        class: 'custom-table-row'
      }
    }),
    TableHeader.configure({
      HTMLAttributes: {
        class: 'custom-table-header'
      }
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: 'custom-table-cell'
      }
    }),
    Youtube.configure({
      inline: false,
      controls: true,
      nocookie: true,
      allowFullscreen: true,
      autoplay: true
    }),
    CustomImage.configure({
      inline: true,
      HTMLAttributes: {
        class: 'custom-image'
      }
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        // Change rel to different value
        // Allow search engines to follow links(remove nofollow)
        rel: 'noopener noreferrer',
        // Remove target entirely so links open in current tab
        target: null
      }
    }),
    BubbleMenu
    // new TipTapCustomImage()
  ],
  onUpdate: () => {
    emits('update:modelValue', editor.value.getHTML())
  }
})

function setcontenteditor(content) {
  const isSame = editor.value.getHTML() === content
  if (isSame) {
    return
  }

  const index = content.indexOf('{"result":')
  editor.value.commands.setContent(content.substring(0, index - 1), false)
  emits('update:modelValue', editor.value.getHTML())
}

const vWidth = ref('360')
const vHeight = ref('210')

function addVideo() {
  const url = prompt('Enter YouTube URL')

  editor.value.commands.setYoutubeVideo({
    src: url,
    width: Math.max(320, parseInt(vWidth.value, 10)) || 360,
    height: Math.max(180, parseInt(vHeight.value, 10)) || 210
  })
}

watch(() => props.modelValue, (first, prev) => {
  // console.log('watch', first)
  const isSame = editor.value.getHTML() === first

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame) {
    return
  }

  editor.value.commands.setContent(first, false)
})
watch(() => props.edited, (first, prev) => {
  console.log('watch edited', first)
  editor.value.setEditable(first, false)
})

onBeforeUnmount(() => {
  editor.value.destroy()
})

// Tambahkan fungsi untuk membuat tabel

// Expose the editor instance itself instead of individual functions
defineExpose({
  editor
})

const shouldShowTableMenu = ({ editor }) => {
  return editor.isActive('table')
}

function getTableRect() {
  if (!editor.value) return { top: 0, left: 0, width: 0, height: 0 }

  const { view } = editor.value
  if (!view) return { top: 0, left: 0, width: 0, height: 0 }

  // First try: check for selected node
  const selectedNode = view.dom.querySelector('.ProseMirror-selectednode')
  if (selectedNode) {
    return selectedNode.getBoundingClientRect()
  }

  // Second try: check for table element in selection
  const selection = view.state.selection
  if (selection.$anchor.depth > 0) {
    const currentNode = selection.$anchor
    let depth = selection.$anchor.depth

    // Traverse up the node tree to find table node
    while (depth > 0) {
      const node = currentNode.node(depth)
      if (node.type.name === 'table') {
        // Find the DOM element for this position
        const pos = currentNode.before(depth)
        const domAtPos = view.domAtPos(pos)
        if (domAtPos) {
          const tableElement = domAtPos.node.closest('table')
          if (tableElement) {
            return tableElement.getBoundingClientRect()
          }
        }
        break
      }
      depth--
    }
  }

  // Fallback: try to find any table in the editor
  const tableElement = view.dom.querySelector('table')
  if (tableElement) {
    return tableElement.getBoundingClientRect()
  }

  // Last resort: return default values
  return { top: 0, left: 0, width: 0, height: 0 }
}

const tippyOptions = ref({
  interactive: true
})

const tableTippyOptions = ref({
  placement: 'top',
  interactive: true
})

onMounted(() => {
  // Set appendTo option after component is mounted
  tippyOptions.value.appendTo = document.body
  tableTippyOptions.value.appendTo = document.body
  tableTippyOptions.value.getReferenceClientRect = getTableRect
})
</script>

<style lang="scss">
  .editor {
    border: 1px solid $grey-3;
    height: 100vh;
    overflow: auto !important;
  }

[contenteditable=false] {
  color: $grey-10;

  .ProseMirror {
    p:has(img) {
      float: none;
    }
    p {
      font-size: 16px !important;
      line-height: 1.6 !important;
      margin-bottom: 1rem !important;

      img.custom-image {
        &-small {
          width: 200px !important;
        }
        &-medium {
          width: 500px !important;
        }
        &-large {
          width: 100% !important;
        }
        &-left {
          float: left;
          margin-right: 1rem;
        }
        &-right {
          float: right;
          margin-left: 1rem;
        }
      }
    }
  }
}
.ProseMirror {
  width: 100% !important;
  padding: 20px;
  min-height: 300px;
  height: 100%;
  font-size: 16px !important;
  line-height: 1.6 !important;

  p {
    margin-bottom: 1rem !important;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem !important;
    margin-bottom: 1rem !important;
    line-height: 1.2 !important;
  }

  h1 { font-size: 2rem !important; }
  h2 { font-size: 1.75rem !important; }
  h3 { font-size: 1.5rem !important; }
  h4 { font-size: 1.25rem !important; }
  h5 { font-size: 1.1rem !important; }
  h6 { font-size: 1rem !important; }

  p:has(img) {
    float: none;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  img {
    max-width: 100%;
    &.ProseMirror-selectednode {
      outline: 3px solid $primary;
    }
  }

  // Keep existing image size classes
  .custom-image-small {
    width: 200px !important;
    height: fit-content;
  }
  .custom-image-medium {
    width: 500px !important;
    height: fit-content;
  }
  .custom-image-large {
    width: 100% !important;
    height: fit-content;
  }
  .custom-image-left {
    float: left;
    margin-right: 1rem;
  }
  .custom-image-right {
    float: right;
    margin-left: 1rem;
  }

  blockquote {
    padding: 1rem 1.5rem;
    border-left: 4px solid rgba(#0D0D0D, 0.1);
    margin: 1rem 0;
    font-size: 1.1rem;
    font-style: italic;
    background: rgba(#0D0D0D, 0.05);
  }

  iframe {
    border: 8px solid #000;
    border-radius: 4px;
    min-width: 200px;
    min-height: 200px;
    display: block;
    outline: 0px solid transparent;
    margin: 1rem 0;
  }

  div[data-youtube-video] {
    cursor: move;
    padding-right: 24px;
    margin: 1rem 0;
  }

  .ProseMirror-selectednode iframe {
    transition: outline 0.15s;
    outline: 6px solid #ece111;
  }
}

hr.ProseMirror-selectednode {
  border-top: 2px solid $grey;
  margin: 1.5rem 0;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  p {
    font-size: 16px !important;
    margin: 0;
    line-height: 1.4 !important;
  }

  li {
    display: flex;
    margin-bottom: 0.5rem;

    > label {
      flex: 0 0 auto;
      margin-right: 0.75rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }
}

.custom-table {
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;
  table-layout: fixed;

  td, th {
    border-style: solid !important;
    border-width: 1px !important;
    border-color: $grey-4 !important;
    padding: 0.75rem;
    position: relative;
    min-width: 100px;
    word-break: break-word;

    &.selectedCell {
      background-color: rgba($primary, 0.1);
    }
  }

  th {
    background-color: $grey-2;
    font-weight: bold;
  }

  /* Pastikan border style tidak di-override oleh style lain */
  &[style*="border-style"],
  &[style*="border-width"],
  &[style*="border-color"] {
    td, th {
      border-style: inherit !important;
      border-width: inherit !important;
      border-color: inherit !important;
    }
  }
}

// Tambahkan style untuk toolbar tabel yang muncul saat tabel aktif
.table-toolbar {
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 4px;
  z-index: 10;
}

/* Styling untuk tabel dalam editor */
.ProseMirror {
  table {
    border-collapse: collapse !important;
    table-layout: fixed !important;
    width: 100% !important;
    margin: 1rem 0;
    overflow: hidden;

    // Default border styles
    border: 1px solid $grey-4 !important;

    &.ProseMirror-selectednode {
      outline: 2px solid $primary;
    }
  }
}

/* Style untuk table dengan custom classes */
table {
  &:has(.custom-table-row) {
    @extend .custom-table;
  }

  .custom-table-header,
  .custom-table-cell {
    border: 1px solid $grey-4 !important;
    border-style: inherit !important;
    border-width: inherit !important;
    border-color: inherit !important;
    padding: 0.75rem !important;
    position: relative;
    min-width: 100px;
    word-break: break-word;
  }

  .custom-table-header {
    background-color: $grey-2;
    font-weight: bold;
  }
}

.custom-table {
  border-collapse: collapse !important;
  table-layout: fixed !important;
  width: 100% !important;
  margin: 1rem 0;

  // Explicit border properties
  border-style: solid !important;
  border-width: 1px !important;
  border-color: $grey-4 !important;

  &[style*="border-style"],
  &[style*="border-width"],
  &[style*="border-color"] {
    .custom-table-header,
    .custom-table-cell {
      border-style: inherit !important;
      border-width: inherit !important;
      border-color: inherit !important;
    }
  }
}

/* Column resize handle */
.column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: $primary;
  cursor: col-resize;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

/* Table wrapper untuk responsiveness */
.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

/* Selection styles */
.selectedCell {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba($primary, 0.1);
    pointer-events: none;
  }
}

/* Style untuk toolbar tabel */
.table-toolbar {
  position: absolute;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 4px;
}

/* Base table styles */
.tableWrapper {
  table {
    border-collapse: collapse !important;
    table-layout: fixed !important;
    width: 100% !important;
    margin: 1rem 0;
    border: 1px solid $grey-4 !important;

    // Style untuk table yang memiliki custom-table-row
    &:has(.custom-table-row) {
      border-style: var(--table-border-style, solid) !important;
      border-width: var(--table-border-width, 1px) !important;
      border-color: var(--table-border-color, $grey-4) !important;
    }

    &.ProseMirror-selectednode {
      outline: 2px solid $primary;
    }

    // Styles untuk header dan cell
    .custom-table-header,
    .custom-table-cell {
      border: 1px solid $grey-4 !important;
      border-style: var(--table-border-style, solid) !important;
      border-width: var(--table-border-width, 1px) !important;
      border-color: var(--table-border-color, $grey-4) !important;
      padding: 0.75rem !important;
      position: relative;
      min-width: 100px;
      word-break: break-word;
    }

    .custom-table-header {
      background-color: $grey-2;
      font-weight: bold;
    }
  }
}

/* Add styles to ensure toolbar stays above table */
.ProseMirror {
  .tableWrapper {
    margin-top: 40px; // Add space for toolbar
  }
}

.bubble-menu-wrapper {
  position: relative;
  z-index: 50;
}

/* Tambahkan style untuk memastikan menu tetap terlihat */
.tippy-box {
  z-index: 99999 !important;
}
</style>
