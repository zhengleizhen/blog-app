<script setup>
import { ref, computed } from 'vue'

const articles = ref([
  { id: 1, title: 'Vue3 入门完全指南', summary: '从零开始学 Vue3', category: 'Vue', date: '2024-05-10' },
  { id: 2, title: 'JS 异步编程详解', summary: '搞懂 Promise 和 async/await', category: 'JavaScript', date: '2024-05-08' },
  { id: 3, title: 'CSS Grid 布局实战', summary: '用 Grid 实现响应式布局', category: 'CSS', date: '2024-05-05' },
  { id: 4, title: 'Vue3 响应式原理', summary: '深入理解 ref 和 reactive', category: 'Vue', date: '2024-05-03' },
  { id: 5, title: 'Flexbox 完全指南', summary: '一文学会弹性布局', category: 'CSS', date: '2024-05-01' },
])

// 所有分类（去重）
const categories = computed(() => {
  const cats = articles.value.map(a => a.category)
  return ['全部', ...new Set(cats)]  // 前面加上「全部」
})

// 当前选中的分类
const activeCategory = ref('全部')

// 根据分类过滤文章
const filteredArticles = computed(() => {
  if (activeCategory.value === '全部') {
    return articles.value
  }
  return articles.value.filter(a => a.category === activeCategory.value)
})
</script>

<template>
  <div class="home">
    <h2>最新文章</h2>

    <!-- 分类筛选按钮 -->
    <div class="category-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 筛选结果数量 -->
    <p class="result-info">共 {{ filteredArticles.length }} 篇</p>

    <!-- 文章列表 -->
    <div class="article-grid">
      <div v-for="article in filteredArticles" :key="article.id" class="card">
        <span class="tag">{{ article.category }}</span>
        <h3>{{ article.title }}</h3>
        <p>{{ article.summary }}</p>
        <span class="date">{{ article.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.category-bar button {
  padding: 6px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.category-bar button.active {
  background: #42b883;
  color: #fff;
  border-color: #42b883;
}

.category-bar button:hover {
  border-color: #42b883;
}

.result-info {
  color: #999;
  font-size: 14px;
  margin-bottom: 16px;
}
</style>