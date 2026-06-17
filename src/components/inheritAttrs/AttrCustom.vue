<!-- 关闭自动透传，手动控制属性加到哪个元素 -->
<template>
  <div class="attr-custom">
    <p class="label">手动透传（inheritAttrs: false）</p>
    <!-- 这个 div 不会收到 class/data-id -->
    <div class="inner">这个 div 没有外部属性</div>
    <!-- 用 v-bind="$attrs" 手动绑定到想要的元素 -->
    <div v-bind="$attrs" class="target">
      属性加到了这里 ↑
    </div>
  </div>
</template>

<script>
export default {
  // 关闭自动透传
  inheritAttrs: true, // 这是默认值，可以省略
}
</script>

<style scoped>
.attr-custom {
  padding: 12px;
  background: #fef9f9;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 8px;
}
.inner {
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 8px;
}
.target {
  padding: 8px;
  background: #fff3f3;
  border-radius: 4px;
}
</style>
