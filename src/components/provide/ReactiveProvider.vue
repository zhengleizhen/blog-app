<!-- 响应式 provide：值变化，所有 inject 的组件自动更新 -->
<template>
  <div class="reactive-provider">
    <p class="label">祖先组件</p>
    <input v-model="message" type="text" placeholder="输入点什么..." class="input" />
    <p>当前值：<strong>{{ message }}</strong></p>
    <ReactiveChild />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import ReactiveChild from './ReactiveChild.vue'

const message = ref('你好，provide！')
provide('sharedMessage', message)
</script>

<style scoped>
.reactive-provider {
  padding: 16px;
  border: 2px solid #42b883;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #42b883;
  margin: 0 0 8px;
}
.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
