<template>
  <div class="blog-edit">
    <h3>编辑文章</h3>
    <div class="info">
      <p><strong>文章 ID：</strong>{{ route.params.id || '无' }}</p>
      <p v-if="route.params.type"><strong>文章类型：</strong>{{ route.params.type }}</p>
      <p v-if="route.query.from"><strong>来源：</strong>{{ route.query.from }}</p>
      <p v-if="route.query.tab"><strong>Tab：</strong>{{ route.query.tab }}</p>
      <p v-if="route.query.source"><strong>跳转方式：</strong>{{ route.query.source }}</p>
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
