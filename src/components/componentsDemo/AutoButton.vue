<template>
  <button class="auto-btn" @click="$emit('click')">
    <slot>自动注册按钮</slot>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.auto-btn {
  padding: 8px 16px;
  background: #2f5d9a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
