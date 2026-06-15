<!-- 子组件 inject 响应式数据，自动同步更新 -->
<template>
  <div class="reactive-child">
    <p class="label">后代组件</p>
    <p>inject 拿到的值：<strong>{{ sharedMessage }}</strong></p>
    <p class="hint">（在祖先输入框里打字，这里自动更新）</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const sharedMessage = inject('sharedMessage')
</script>

<style scoped>
.reactive-child {
  padding: 12px;
  border: 2px dashed #aaa;
  border-radius: 8px;
  margin-top: 12px;
}
.label {
  font-weight: bold;
  color: #888;
  margin: 0 0 8px;
}
.hint {
  color: #999;
  font-size: 12px;
  margin: 4px 0 0;
}
</style>
