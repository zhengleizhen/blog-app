<template>
  <div class="child-counter">
    <p>子组件计数器：<strong>{{ count }}</strong></p>
    <button @click="increment">子组件内部 +1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function reset() {
  count.value = 0
}

// ⭐ defineExpose 暴露给父组件
defineExpose({ count, increment, reset })
</script>

<style scoped>
.child-counter { padding: 12px; background: #f0fbf7; border-radius: 8px; margin-bottom: 12px; }
button { padding: 4px 12px; border: 1px solid #42b883; border-radius: 4px; background: #fff; cursor: pointer; }
</style>
