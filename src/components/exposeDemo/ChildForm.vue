<template>
  <div class="child-form">
    <p>子组件表单</p>
    <input v-model="formData.name" placeholder="姓名" />
    <input v-model="formData.email" placeholder="邮箱" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({ name: '', email: '' })

function clearForm() {
  formData.name = ''
  formData.email = ''
}

function fillDemo() {
  formData.name = '张三'
  formData.email = 'zhangsan@example.com'
}

//  暴露响应式数据和方法
defineExpose({ formData, clearForm, fillDemo })
</script>

<style scoped>
.child-form { padding: 12px; background: #f0fbf7; border-radius: 8px; margin-bottom: 12px; }
input { display: block; width: 100%; padding: 8px; margin: 4px 0; border: 1px solid #ddd; border-radius: 4px; }
</style>
