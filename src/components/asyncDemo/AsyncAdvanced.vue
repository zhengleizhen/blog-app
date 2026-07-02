<template>
  <div class="async-advanced">
    <h3>高级异步组件</h3>
    <p>支持自定义 loading、error、延迟、超时等配置</p>
    <ul>
      <li>✅ 加载中显示 spinner</li>
      <li>✅ 加载失败显示错误信息</li>
      <li>✅ 可配置延迟显示 loading</li>
      <li>✅ 可配置超时时间</li>
    </ul>
  </div>
</template>

<script setup>
// 模拟加载延迟（3秒）
await new Promise(resolve => setTimeout(resolve, 3000))
</script>

<style scoped>
.async-advanced {
  padding: 16px;
  background: #f0fbf7;
  border-radius: 8px;
  margin-top: 12px;
}
.async-advanced h3 { color: #42b883; margin-bottom: 8px; }
.async-advanced p { color: #666; font-size: 14px; margin-bottom: 12px; }
.async-advanced li { color: #555; font-size: 14px; margin: 4px 0; }
</style>
