<template>
  <button :class="['btn', type]" @click="$emit('click')">
    <slot>按钮</slot>
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'default' },
})
defineEmits(['click'])
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border: 1px solid #42b883;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
}
.btn.primary {
  background: #42b883;
  color: #fff;
}
</style>
