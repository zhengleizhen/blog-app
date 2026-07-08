<template>
  <div class="child-counter">
    <h4>子组件计数器</h4>
    <p class="counter-value">{{ count }}</p>
    <button @click="count++">内部 +1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

// 父组件能调用这些方法
function reset() {
  count.value = 0
}

function double() {
  count.value *= 2
}

function add(n) {
  count.value += n
}

// 暴露给父组件
defineExpose({ count, reset, double, add })
</script>

<style scoped>
.child-counter {
  padding: 16px;
  background: #f0fbf7;
  border-radius: 8px;
  text-align: center;
}
.child-counter h4 { margin: 0 0 8px; color: #42b883; }
.counter-value { font-size: 36px; font-weight: bold; color: #333; margin: 12px 0; }
button {
  padding: 8px 20px;
  border: 1px solid #42b883;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}
button:hover { background: #42b883; color: #fff; }
</style>
