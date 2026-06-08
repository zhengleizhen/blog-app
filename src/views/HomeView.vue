<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import { ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'

const articles = ref([
  {
    id: 1,
    title: 'Vue3 入门完全指南',
    summary: '从零开始学习 Vue3 组合式 API，涵盖 ref、reactive、computed 等核心概念。',
    date: '2026-05-10',
    category: 'Vue',
    cover: '/images/vue.svg'
  },
  {
    id: 2,
    title: 'JavaScript 异步编程详解',
    summary: '一文搞懂 Promise、async/await、事件循环与微任务队列。',
    date: '2026-05-08',
    category: 'JavaScript',
    cover: '/images/js.svg'
  },
  {
    id: 3,
    title: 'CSS Grid 布局实战',
    summary: '用 CSS Grid 轻松实现复杂的响应式布局。',
    date: '2026-05-05',
    category: 'CSS',
    cover: '/images/css.svg'
  }
])
</script>

<template>
  <div class="home">
    <h2 class="section-title">最新文章</h2>

    <p v-if="!articles.length" class="empty-tip">还没有文章，敬请期待。</p>

    <div v-else class="article-grid">
      <BlogCard
        v-for="article in articles"
        :key="article.id"
        :title="article.title"
        :summary="article.summary"
        :date="article.date"
        :category="article.category"
        :cover="article.cover"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 60px 0;
  font-size: 16px;
}
</style>
