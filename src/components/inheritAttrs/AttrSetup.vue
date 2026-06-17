<!-- script setup 写法：用 defineOptions 设置 inheritAttrs -->
<template>
  <div class="attr-setup">
    <p class="label">script setup 写法</p>
    <!-- 只把 class 透传过来，data-id 不要 -->
    <div v-bind="{ class: $attrs.class }" class="target">
      只接收 class，忽略 data-id
    </div>
  </div>
</template>

<script setup>
// script setup 默认 inheritAttrs: true
// 如果需要设为 false，用 defineOptions（Vue 3.3+）
defineOptions({
  inheritAttrs: false,
})
</script>

<style scoped>
.attr-setup {
  padding: 12px;
  background: #f0f4ff;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #2f5d9a;
  margin: 0 0 8px;
}
.target {
  padding: 8px;
  background: #e8f0ff;
  border-radius: 4px;
}
</style>
