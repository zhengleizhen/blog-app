<script setup>
import { ref } from 'vue'

// 文章数据（目前是硬编码，后续章节会改成 fetch 加载）
const articles = ref([
  {
    id: 1,
    title: 'Vue3 入门完全指南',
    summary: '从零开始学习 Vue3 组合式 API，涵盖 ref、reactive、computed 等核心概念。',
    date: '2026-05-10',
    category: 'Vue',
    cover: '/images/vue.png'
  },
  {
    id: 2,
    title: 'JavaScript 异步编程详解',
    summary: '一文搞懂 Promise、async/await、事件循环与微任务队列。',
    date: '2026-05-08',
    category: 'JavaScript',
    cover: '/images/js.png'
  },
  {
    id: 3,
    title: 'CSS Grid 布局实战',
    summary: '用 CSS Grid 轻松实现复杂的响应式布局。',
    date: '2026-05-05',
    category: 'CSS',
    cover: '/images/css.png'
  }
])
</script>

<template>
  <div class="home">
    <h2 class="section-title">最新文章</h2>

    <!-- 加载中 -->
    <p v-if="!articles.length" class="empty-tip">还没有文章，敬请期待。</p>

    <!-- 文章卡片列表 -->
    <div v-else class="article-grid">
      <div
        v-for="article in articles"
        :key="article.id"
        class="article-card"
      >
        <img :src="article.cover" :alt="article.title" class="card-cover">
        <div class="card-content">
          <span class="card-category">{{ article.category }}</span>
          <h3 class="card-title">{{ article.title }}</h3>
          <p class="card-summary">{{ article.summary }}</p>
          <span class="card-date">{{ article.date }}</span>
        </div>
      </div>
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

.article-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-category {
  display: inline-block;
  padding: 2px 10px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #222;
}

.card-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.card-date {
  font-size: 12px;
  color: #999;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 60px 0;
  font-size: 16px;
}
</style>