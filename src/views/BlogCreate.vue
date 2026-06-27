<template>
  <div class="blog-create">
    <h3>写文章</h3>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="标题" class="input" />
      <textarea v-model="content" placeholder="正文..." class="textarea"></textarea>
      <button type="submit" class="btn">发布</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const content = ref('')

function submit() {
  alert(`发布文章：${title.value}\n内容：${content.value}`)
}
</script>

<style scoped>
.input { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; }
.textarea { width: 100%; height: 150px; padding: 10px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; resize: vertical; }
.btn { padding: 8px 24px; background: #42b883; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
.btn:hover { background: #3aa876; }
</style>
