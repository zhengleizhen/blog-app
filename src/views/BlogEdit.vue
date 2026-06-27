<template>
  <div class="blog-edit">
    <h3>编辑文章</h3>
    <div class="info">
      <p><strong>文章 ID（路由参数）：</strong>{{ route.params.id }}</p>
      <p><strong>来源（query 参数）：</strong>{{ route.query.from || '无' }}</p>
    </div>
    <form @submit.prevent="submit">
      <input v-model="title" placeholder="标题" class="input" />
      <textarea v-model="content" placeholder="正文..." class="textarea"></textarea>
      <button type="submit" class="btn">保存</button>
    </form>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const title = ref('模拟文章标题')
const content = ref('模拟文章内容')

function submit() {
  alert(`已保存：${title.value}`)
}
</script>

<style scoped>
.blog-edit h3 { color: #42b883; margin-bottom: 16px; }
.info { background: #f0fbf7; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
.info p { margin: 4px 0; }
.info strong { color: #42b883; }
.input { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; }
.textarea { width: 100%; height: 150px; padding: 10px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; resize: vertical; }
.btn { padding: 8px 24px; background: #42b883; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
</style>
