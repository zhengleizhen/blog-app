<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 文章数据（与首页保持一致，后续改为 API 加载）
const articlesData = ref([])

async function fetchArticles() {
  try {
    const res = await fetch('/posts.json')
    const data = await res.json()
    articlesData.value = data
  } catch (err) {
    console.error('加载文章失败：', err)
  }
}

onMounted(() => {
  fetchArticles()
})

const article = computed(() => {
  const x1 = articlesData.value.find(a => a.id === parseInt(route.params.id))
  return x1
})
</script>

<template>
  <div v-if="article" class="article-detail">
    <div class="article-header">
      <img :src="article.cover" :alt="article.title" class="detail-cover">
      <div class="article-meta">
        <span class="card-category">{{ article.category }}</span>
        <h1 class="detail-title">{{ article.title }}</h1>
        <span class="card-date">{{ article.date }}</span>
      </div>
    </div>

    <div class="article-body" v-html="article.content"></div>

    <router-link to="/" class="back-link">&larr; 返回首页</router-link>
  </div>

  <div v-else class="not-found">
    <p class="empty-tip">文章不存在。</p>
    <p>抱歉，您访问的文章不存在或已被删除。</p>
    <router-link to="/" class="back-link">&larr; 返回首页</router-link>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
}

.article-header {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.detail-cover {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.article-meta {
  padding: 20px 24px;
}

.detail-title {
  font-size: 28px;
  margin: 12px 0;
  color: #222;
  line-height: 1.4;
}

.card-category {
  display: inline-block;
  padding: 2px 10px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 12px;
}

.card-date {
  font-size: 12px;
  color: #999;
}

.article-body {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  color: #333;
}

.article-body :deep(h2) {
  font-size: 22px;
  margin: 24px 0 12px;
  color: #222;
}

.article-body :deep(h3) {
  font-size: 18px;
  margin: 20px 0 10px;
  color: #333;
}

.article-body :deep(p) {
  margin-bottom: 16px;
}

.article-body :deep(pre) {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.article-body :deep(code) {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  color: #e96900;
}

.article-body :deep(pre code) {
  background: none;
  padding: 0;
  color: #333;
}

.article-body :deep(ul) {
  margin-bottom: 16px;
  padding-left: 24px;
}

.article-body :deep(li) {
  margin-bottom: 6px;
}

.back-link {
  display: inline-block;
  margin-top: 24px;
  color: #42b883;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.empty-tip {
  color: #999;
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
