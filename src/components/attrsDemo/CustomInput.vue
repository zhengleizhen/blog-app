<template>
  <div class="custom-input">
    <label class="label">封装的 Input 组件</label>
    <!-- v-bind="attrs" 把所有属性传给原生 input -->
    <input class="input" v-bind="attrs" />
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<style scoped>
.custom-input { display: flex; flex-direction: column; gap: 8px; }
.label { font-size: 14px; color: #555; font-weight: bold; }
.input { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.input:focus { outline: none; border-color: #42b883; }
</style>
