<!-- 文件路径：src/views/PostView.vue -->
<script setup>
import {ref,computed,onMounted} from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// useRoute 返回当前路由对象
const route = useRoute()
const id = route.params.id

// 所有文章数据（后续章节会抽离到公共模块）
const articles = ref([])

async function fetchArticles(){
  try {
    const res = await fetch('/posts.json')
    const data = await res.json()
    articles.value = data
  }catch(err){
    console.log('加载文章失败：', err)
  }
}

onMounted(() => {
  fetchArticles()
})

const article = computed(() => {
  const x1 = articles.value.find(a => a.id === parseInt(id))
  console.log('找到的文章：', x1)
  return x1
})

// route.params 包含 URL 中的参数
// 例如 URL 为 /post/3，则 route.params.id === '3'
console.log('文章 ID：', route.params.id)
</script>

<template>
  <div class="post-view">
    <div v-if="!article" class="not-found">
      <h2>文章未找到</h2>
      <p>抱歉，您访问的文章不存在或已被删除。</p>
      <RouterLink to="/" class="back-link">返回首页</RouterLink>
    </div>

    <!-- 文章存在，展示完整内容 -->
    <article v-else>
      <span class="category-tag">{{ article.category }}</span>
      <h1>{{ article.title }}</h1>
      <time>{{ article.date }}</time>
      <!-- v-html 渲染 HTML 字符串 -->
      <div class="content" v-html="article.content"></div>
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    </article>
  </div>
</template>

<style scoped>
.post-view {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

h1 {
  font-size: 32px;
  margin-bottom: 12px;
  line-height: 1.4;
}

time {
  display: block;
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}

.content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.content :deep(h2) {
  margin: 24px 0 12px;
  font-size: 22px;
}

.content :deep(p) {
  margin-bottom: 12px;
}

.back-link {
  display: inline-block;
  margin-top: 40px;
  color: #42b883;
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}
</style>