<template>
  <div class="article-list">
    <h3>文章列表</h3>
    <ul>
      <li v-for="article in articles" :key="article.id" class="article-item">
        <router-link :to="`/post/${article.id}`">{{ article.title }}</router-link>
        <span class="date">{{ article.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const articles = [
  { id: 1, title: 'Vue 3 响应式基础', date: '2026-01-15' },
  { id: 2, title: '组合式 API 入门', date: '2026-02-20' },
  { id: 3, title: 'Pinia 状态管理', date: '2026-03-10' },
]
</script>

<style scoped>
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
a { text-decoration: none; color: #333; }
a:hover { color: #42b883; }
.date { color: #999; font-size: 14px; }
</style>
