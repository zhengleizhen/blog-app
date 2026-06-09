<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import { ref, computed } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

// 文章数据
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
  },
  {
    id: 4,
    title: 'TypeScript 高级类型体操',
    summary: '深入理解泛型、条件类型、映射类型等高级技巧。',
    date: '2026-05-03',
    category: 'TypeScript',
    cover: '/images/vue.svg'
  },
  {
    id: 5,
    title: 'Node.js 服务端开发',
    summary: '用 Express + MongoDB 搭建 RESTful API 服务。',
    date: '2026-05-01',
    category: 'JavaScript',
    cover: '/images/js.svg'
  },
])

// 提取所有分类（去重）
const categories = computed(() => {
  const cats = articles.value.map(a => a.category)
  return ['全部', ...new Set(cats)]
})

// 当前选中的分类
const activeCategory = ref('全部')

// 根据分类过滤文章
const filteredArticles = computed(() => {
  debugger
  if (activeCategory.value === '全部') return articles.value
  return articles.value.filter(a => a.category === activeCategory.value)
})

// 处理子组件发来的分类切换事件
function handleCategoryChange(cat) {
  activeCategory.value = cat
}
</script>

<template>
  <div class="home">
    <h2 class="section-title">最新文章</h2>

    <!-- 分类筛选组件 -->
    <CategoryFilter
      :categories="categories"
      :active-category="activeCategory"
      @update-category="handleCategoryChange"
    />

    <!-- 空状态 -->
    <p v-if="filteredArticles.length === 0" class="empty-tip">
      该分类下暂无文章
    </p>

    <!-- 文章卡片列表 -->
    <div v-else class="article-grid">
      <BlogCard
        v-for="article in filteredArticles"
        :key="article.id"
        :title="article.title"
        :summary="article.summary"
        :date="article.date"
        :category="article.category"
        :cover1="article.cover"
      />
    </div>
  </div>
</template>

<style scoped>
.home { max-width: 960px; margin: 0 auto; padding: 20px; }
.section-title { font-size: 24px; margin-bottom: 20px; }
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}
.empty-tip { text-align: center; color: #999; padding: 60px 0; }
</style>