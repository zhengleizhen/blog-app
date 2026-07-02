<template>
  <div class="child-lifecycle">
    <h3>子组件（观察生命周期）</h3>
    <p>计数（从父组件传入）：<strong>{{ count }}</strong></p>
    <p>内部状态：<strong>{{ localCount }}</strong></p>
    <button @click="localCount++">内部 +1</button>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, watch } from 'vue'

const props = defineProps({ count: Number })
const localCount = ref(0)

// 记录生命周期执行时间
function log(name, type, msg = '') {
  const time = new Date().toLocaleTimeString()
  // 通过 window 事件传递日志（简单演示用）
  window.dispatchEvent(new CustomEvent('lifecycle-log', {
    detail: { time, name, type, msg }
  }))
}

// --- 创建阶段 ---
log('beforeCreate', 'create', '组件实例刚创建，data 还未初始化')

// --- 挂载阶段 ---
onBeforeMount(() => {
  log('beforeMount', 'mount', 'DOM 即将渲染，但还没渲染')
})

onMounted(() => {
  log('mounted', 'mount', 'DOM 已渲染完成，可以操作元素')
})

// --- 更新阶段 ---
onBeforeUpdate(() => {
  log('beforeUpdate', 'update', '数据变了，DOM 即将更新')
})

onUpdated(() => {
  log('updated', 'update', 'DOM 已更新完毕')
})

// --- 销毁阶段 ---
onBeforeUnmount(() => {
  log('beforeUnmount', 'destroy', '组件即将被销毁')
})

onUnmounted(() => {
  log('unmounted', 'destroy', '组件已销毁，清理完成')
})

// 监听 props 变化
watch(() => props.count, (newVal) => {
  log('watch', 'update', `父组件 count 变成 ${newVal}`)
})
</script>

<style scoped>
.child-lifecycle {
  padding: 16px;
  background: #f0fbf7;
  border-radius: 8px;
  margin-top: 12px;
}
.child-lifecycle h3 { color: #42b883; margin-bottom: 8px; }
.child-lifecycle p { color: #555; font-size: 14px; margin: 4px 0; }
button { padding: 4px 12px; border: 1px solid #42b883; border-radius: 4px; background: #fff; cursor: pointer; margin-top: 8px; }
</style>
