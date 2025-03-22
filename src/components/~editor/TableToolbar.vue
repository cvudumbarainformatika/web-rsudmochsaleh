<template>
  <div
    v-if="editor"
    class="table-toolbar q-pa-sm"
  >
    <q-btn-group flat>
      <q-btn
        flat
        dense
        icon="add_box"
        @click="editor.chain().focus().addColumnBefore().run()"
      >
        <q-tooltip>Add Column Before</q-tooltip>
      </q-btn>

      <q-btn
        flat
        dense
        icon="add_box"
        @click="editor.chain().focus().addColumnAfter().run()"
      >
        <q-tooltip>Add Column After</q-tooltip>
      </q-btn>

      <!-- Tambahkan tombol lainnya dengan cara yang sama -->
    </q-btn-group>
  </div>
</template>

<script setup>
defineProps({
  editor: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.table-toolbar {
  .table-btn {
    min-width: 32px;
    padding: 4px;

    &:hover {
      background: $grey-2;
    }
  }
}
</style>
