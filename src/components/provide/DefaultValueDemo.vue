<!-- inject 带默认值：祖先没 provide 时用默认值兜底 -->
<template>
  <div class="default-value-demo">
    <p class="label">没有 provide 的祖先</p>
    <p>这个组件树的祖先没有 provide 任何值</p>
    <DefaultValueChild />
  </div>
</template>

<script setup>
import DefaultValueChild from './DefaultValueChild.vue'
</script>

<style scoped>
.default-value-demo {
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #999;
  margin: 0 0 8px;
}
</style>
