<!-- 祖先组件：提供数据 -->
<template>
  <div class="grandparent">
    <p class="label">GrandParent（祖先）</p>
    <p>提供了主题色：<strong>{{ themeColor }}</strong></p>
    <Parent />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import Parent from './Parent.vue'

// 提供一个字符串给所有后代
const themeColor = ref('#42b883')
provide('themeColor', themeColor)
</script>

<style scoped>
.grandparent {
  padding: 16px;
  border: 2px solid #42b883;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #42b883;
  margin: 0 0 8px;
}
</style>
