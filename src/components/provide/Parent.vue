<!-- 中间组件：不做任何传递，只是个"透明"层 -->
<template>
  <div class="parent">
    <p class="label">Parent（中间层）</p>
    <p>这个组件没有传递任何 props，只是个中间层</p>
    <Child />
  </div>
</template>

<script setup>
import Child from './Child.vue'
</script>

<style scoped>
.parent {
  padding: 12px;
  border: 2px dashed #aaa;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #888;
  margin: 0 0 8px;
}
</style>
