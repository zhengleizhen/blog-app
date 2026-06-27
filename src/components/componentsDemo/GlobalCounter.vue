<template>
  <div class="global-counter">
    <p class="label">全局组件</p>
    <p>计数：{{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<style scoped>
.global-counter {
  padding: 12px;
  background: #f0f4ff;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #2f5d9a;
  margin: 0 0 8px;
}
button {
  padding: 4px 12px;
  border: 1px solid #2f5d9a;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
</style>
