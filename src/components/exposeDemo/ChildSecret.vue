<template>
  <div class="child-secret">
    <p>这是一个没有 expose 的子组件</p>
    <p>内部数据：{{ secret }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const secret = ref('这是子组件的私有数据')

//  没有 defineExpose，父组件什么也拿不到
// defineExpose({ secret })
</script>

<style scoped>
.child-secret { padding: 12px; background: #fff3cd; border-radius: 8px; }
</style>
