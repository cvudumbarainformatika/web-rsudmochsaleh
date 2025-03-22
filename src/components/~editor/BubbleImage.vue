<template>
  <div
    v-if="editor"
    class="bubble-image-toolbar"
  >
    <div class="toolbar-group">
      <div class="toolbar-label">
        Size
      </div>
      <div class="size-buttons">
        <q-btn
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :label="size"
          :class="['size-btn', { active: isActive('size', size) }]"
          flat
          dense
          no-caps
          @click="editor.chain().focus().setSize({ size }).run()"
        />
      </div>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group">
      <div class="toolbar-label">
        Position
      </div>
      <div class="position-buttons">
        <q-btn
          v-for="position in ['left', 'middle', 'right']"
          :key="position"
          :icon="getPositionIcon(position)"
          :class="['position-btn', { active: isActive('pos', position) }]"
          flat
          dense
          @click="editor.chain().focus().setPos({ pos: position }).run()"
        >
          <q-tooltip>{{ position }}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed } from 'vue'

const props = defineProps({
  editor: {
    type: Object,
    default: null
  }
})

const isActive = (attr, value) => {
  return props.editor?.isActive('custom-image', { [attr]: value })
}

const getPositionIcon = (position) => {
  const icons = {
    left: 'format_align_left',
    middle: 'format_align_center',
    right: 'format_align_right'
  }
  return icons[position]
}
</script>

<style lang="scss">
.bubble-image-toolbar {
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 8px;
  gap: 12px;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.1),
    0 1px 3px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.3);

  .toolbar-group {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .toolbar-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: rgba(0,0,0,0.6);
      margin-left: 4px;
    }
  }

  .toolbar-divider {
    width: 1px;
    height: 24px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0) 0%,
      rgba(0,0,0,0.1) 50%,
      rgba(255,255,255,0) 100%
    );
  }

  .size-buttons, .position-buttons {
    display: flex;
    gap: 2px;
  }

  .size-btn, .position-btn {
    min-width: 36px;
    height: 28px;
    font-size: 0.8rem;
    border-radius: 6px;
    color: rgba(0,0,0,0.7);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0,0,0,0.05);
      transform: translateY(-1px);
    }

    &.active {
      background: linear-gradient(145deg, var(--q-primary) 0%, darken($primary, 10%) 100%);
      color: white;
      box-shadow:
        0 2px 4px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.2);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: inherit;
    border-left: 1px solid rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.3);
  }
}
</style>
