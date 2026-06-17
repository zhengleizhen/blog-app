<!-- 默认行为：inheritAttrs: true（默认值） -->
<!-- 父组件传的 class、data-id 会自动加到根 div 上 -->
<template>
  <div class="attr-default">
    <p class="label">默认透传（inheritAttrs: true）</p>
    <p>class 和 data-id 自动加到了根元素 div 上</p>
    <p class="hint">看外面红色边框，说明 class="red-border" 生效了</p>
  </div>
</template>

<script setup>
// 没有声明任何 props
// 父组件传的 class、data-id 等属性自动透传到根元素
// 使用 defineOptions 在<script setup>中声明组件选项，避免重复默认导出
defineOptions({
  inheritAttrs: true, // 这是默认值，可以省略
})
</script>

<style scoped>
.attr-default {
  padding: 12px;
  background: #f0fbf7;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #42b883;
  margin: 0 0 8px;
}
.hint {
  font-size: 12px;
  color: #999;
}
</style>
