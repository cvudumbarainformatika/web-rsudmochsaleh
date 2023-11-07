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
      <bubble-menu
        v-if="editor && edited"
        v-show="editor.isActive('custom-image')"
        :editor="editor"
      >
        <!-- <q-btn-group rounded> -->
        <bubble-image :editor="editor" />
      <!-- </q-btn-group> -->
      </bubble-menu>
    </div>
  </div>
</template>

<script setup>
import EditorButton from '../~editor/EditorButton.vue'
import BubbleImage from 'src/components/~editor/BubbleImage.vue'
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
import { onBeforeUnmount, ref, watch } from 'vue'
// import { computed } from 'vue'

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
      types: ['heading', 'paragraph']
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

</script>

<style lang="scss">
  .editor {
    border:1px solid $grey-3;
    height:100vh;
    overflow: auto !important;
  }

[contenteditable=false] {
  color: $grey-10;
  // cursor: none;

  .ProseMirror{
    p:has(img) {
      float:none;
    }
    p {
      img.custom-image{
        &-small {
          width: 200px !important;
          // height: fit-content;
          // height: auto;
        }
        &-medium {
          width: 500px !important;
          // height: fit-content;
          // height: auto;
        }
        &-large {
          width: 100% !important;
          // height: fit-content;
          // height: auto;
        }
        &-left {
          float: left;
          margin-right: 0.5rem;
        }
        &-right {
          float: right;
          margin-left: 0.5rem;
        }
      }
    }
  }
}
.ProseMirror{
  width: 100% !important;
  padding: 10px;
  min-height:300px;
  height:100%;
  // display: flex;
  // flex-direction: column;

  p:has(img) {
    float:none;
  }

   pre {
    background: #0D0D0D;
    color: #FFF;
    // font-family: 'JetBrainsMono', monospace;
    padding: 10px;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    &.ProseMirror-selectednode {
      outline: 3px solid $primary;
    }
  }

  .custom-image-small {
    width: 200px !important;
    height: fit-content;
    // height: auto;
  }
  .custom-image-medium {
    width: 500px !important;
    height: fit-content;
    // height: auto;
  }
  .custom-image-large {
    width: 100% !important;
    height: fit-content;
    // height: auto;
  }
  .custom-image-left {
    float: left;
    margin-right: 0.5rem;
  }
  .custom-image-right {
    float: right;
    margin-left: 0.5rem;
  }

  blockquote {
    padding-left: .75rem;
    border-left: 3px solid rgba(#0D0D0D, 0.1);
  }

  iframe {
    border: 8px solid #000;
    border-radius: 4px;
    min-width: 200px;
    min-height: 200px;
    display: block;
    outline: 0px solid transparent;
  }

  div[data-youtube-video] {
    cursor: move;
    padding-right: 24px;
  }

  .ProseMirror-selectednode iframe {
    transition: outline 0.15s;
    outline: 6px solid #ece111;
  }

}

hr.ProseMirror-selectednode {
  border-top: 1px solid $grey;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
  p {
    margin: 0;
    line-height: 0.8rem;
  }

  li {
    display: flex;
    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }
}

</style>
