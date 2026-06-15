<!-- 后代组件：直接用 inject 拿到祖先的数据，不需要经过 Parent -->
<template>
  <div class="child">
    <p class="label">Child（后代）</p>
    <p>用 inject 直接拿到祖先的值：<strong :style="{ color: themeColor }">{{ themeColor }}</strong></p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 直接从祖先拿，不需要 Parent 传 props
const themeColor = inject('themeColor')
</script>

<style scoped>
.child {
  padding: 12px;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background: #fef9f9;
}
.label {
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 8px;
}
</style>
