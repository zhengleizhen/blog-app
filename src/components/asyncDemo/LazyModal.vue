<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>设置弹窗</h3>
      <p>这个弹窗组件是异步加载的，只在点击按钮时才下载。</p>
      <p>好处：首屏不需要加载弹窗代码，减小初始体积。</p>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script setup>
// 模拟加载延迟
await new Promise(resolve => setTimeout(resolve, 600))

defineEmits(['close'])
</script>
