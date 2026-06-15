<!-- 祖先没 provide 时，inject 用默认值 -->
<template>
  <div class="default-value-child">
    <p class="label">后代组件</p>
    <p>注入的值：<strong>{{ themeColor }}</strong></p>
    <p class="hint">（祖先没 provide，所以用的是默认值 "#999"）</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 第二个参数就是默认值，祖先没 provide 时用这个
const themeColor = inject('themeColor', '#999')
</script>

<style scoped>
.default-value-child {
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin-top: 12px;
  background: #f9f9f9;
}
.label {
  font-weight: bold;
  color: #999;
  margin: 0 0 8px;
}
.hint {
  color: #bbb;
  font-size: 12px;
  margin: 4px 0 0;
}
</style>
