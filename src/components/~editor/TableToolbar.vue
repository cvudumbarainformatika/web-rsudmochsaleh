<template>
  <div
    v-if="editor && editor.isActive('table')"
    class="table-toolbar q-pa-sm"
    :style="toolbarPosition"
  >
    <q-btn-group flat>
      <!-- Table Structure -->
      <q-btn
        flat
        dense
        icon="add"
      >
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item
              v-close-popup
              clickable
              @click="insertTable"
            >
              <q-item-section>Insert Table</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="deleteTable"
            >
              <q-item-section>Delete Table</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- Row Operations -->
      <q-btn
        flat
        dense
        icon="table_rows"
      >
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item
              v-close-popup
              clickable
              @click="addRowBefore"
            >
              <q-item-section>Insert Row Above</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="addRowAfter"
            >
              <q-item-section>Insert Row Below</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              @click="deleteRow"
            >
              <q-item-section>Delete Row</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- Column Operations -->
      <q-btn
        flat
        dense
        icon="view_column"
      >
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item
              v-close-popup
              clickable
              @click="addColumnBefore"
            >
              <q-item-section>Insert Column Left</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="addColumnAfter"
            >
              <q-item-section>Insert Column Right</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              @click="deleteColumn"
            >
              <q-item-section>Delete Column</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- Cell Operations -->
      <q-btn
        flat
        dense
        icon="grid_on"
      >
        <q-menu>
          <q-list style="min-width: 150px">
            <q-item
              v-close-popup
              clickable
              @click="mergeCells"
            >
              <q-item-section>Merge Cells</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="splitCell"
            >
              <q-item-section>Split Cell</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              @click="toggleHeaderCell"
            >
              <q-item-section>Toggle Header</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- Table Styling -->
      <q-btn
        flat
        dense
        icon="format_paint"
      >
        <q-menu>
          <q-list style="min-width: 200px">
            <q-item>
              <q-item-section>
                <q-select
                  v-model="borderStyle"
                  :options="borderStyles"
                  label="Border Style"
                  dense
                  @update:model-value="updateBorderStyle"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-select
                  v-model="borderWidth"
                  :options="borderWidths"
                  label="Border Width"
                  dense
                  @update:model-value="updateBorderWidth"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-color
                  v-model="borderColor"
                  @update:model-value="updateBorderColor"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const toolbarPosition = ref({})

// Function to update toolbar position
function updateToolbarPosition() {
  const selectedTable = props.editor.view.dom.querySelector('.ProseMirror-selectednode')
  if (!selectedTable) return

  const tableRect = selectedTable.getBoundingClientRect()
  const editorRect = props.editor.view.dom.getBoundingClientRect()

  toolbarPosition.value = {
    position: 'absolute',
    left: `${tableRect.left - editorRect.left}px`,
    top: `${tableRect.top - editorRect.top - 40}px`, // 40px offset for toolbar height
    width: `${tableRect.width}px`
  }
}

// Watch for table selection changes
watch(
  () => props.editor.isActive('table'),
  (isActive) => {
    if (isActive) {
      setTimeout(updateToolbarPosition, 0)
    }
  }
)

// Update position on window resize
let resizeObserver
onMounted(() => {
  window.addEventListener('resize', updateToolbarPosition)

  // Observe editor size changes
  resizeObserver = new ResizeObserver(updateToolbarPosition)
  if (props.editor?.view?.dom) {
    resizeObserver.observe(props.editor.view.dom)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateToolbarPosition)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// Table operations
function insertTable() {
  props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

function deleteTable() {
  props.editor.chain().focus().deleteTable().run()
}

// Row operations
function addRowBefore() {
  props.editor.chain().focus().addRowBefore().run()
}

function addRowAfter() {
  props.editor.chain().focus().addRowAfter().run()
}

function deleteRow() {
  props.editor.chain().focus().deleteRow().run()
}

// Column operations
function addColumnBefore() {
  props.editor.chain().focus().addColumnBefore().run()
}

function addColumnAfter() {
  props.editor.chain().focus().addColumnAfter().run()
}

function deleteColumn() {
  props.editor.chain().focus().deleteColumn().run()
}

// Cell operations
function mergeCells() {
  props.editor.chain().focus().mergeCells().run()
}

function splitCell() {
  props.editor.chain().focus().splitCell().run()
}

function toggleHeaderCell() {
  props.editor.chain().focus().toggleHeaderCell().run()
}

// Styling options
const borderStyle = ref('solid')
const borderStyles = ['solid', 'dashed', 'dotted', 'double']
const borderWidth = ref('1px')
const borderWidths = ['1px', '2px', '3px', '4px', '5px']
const borderColor = ref('#000000')

function updateBorderStyle(style) {
  const table = props.editor.view.dom.querySelector('.ProseMirror-selectednode')
  if (!table) return

  // Set CSS variables pada table
  table.style.setProperty('--table-border-style', style)
}

function updateBorderWidth(width) {
  const table = props.editor.view.dom.querySelector('.ProseMirror-selectednode')
  if (!table) return

  // Set CSS variables pada table
  table.style.setProperty('--table-border-width', width)
}

function updateBorderColor(color) {
  const table = props.editor.view.dom.querySelector('.ProseMirror-selectednode')
  if (!table) return

  // Set CSS variables pada table
  table.style.setProperty('--table-border-color', color)
}
</script>

<style lang="scss">
.table-toolbar {
  background: white;
  z-index: 100;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;

  // Ensure toolbar doesn't interfere with table interaction
  pointer-events: all;

  // Add subtle animation
  transition: all 0.2s ease;

  // Prevent toolbar from being cut off
  &:hover {
    z-index: 101;
  }
}

/* Remove previous sticky positioning */
.ProseMirror {
  position: relative; // Ensure absolute positioning works correctly
}
</style>
