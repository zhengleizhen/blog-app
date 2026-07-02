<template>
  <div class="async-component">
    <h3>我是异步加载的组件</h3>
    <p>这个组件是用 defineAsyncComponent 延迟加载的</p>
    <p>只有在父组件显示它时才会被下载</p>
  </div>
</template>

<script setup>
// 模拟加载延迟（3秒，方便看到 loading 效果）
await new Promise(resolve => setTimeout(resolve, 800))
</script>

<style scoped>
.async-component {
  padding: 16px;
  background: #f0fbf7;
  border-radius: 8px;
  margin-top: 12px;
}
.async-component h3 { color: #42b883; margin-bottom: 8px; }
.async-component p { color: #666; font-size: 14px; margin: 4px 0; }
</style>
