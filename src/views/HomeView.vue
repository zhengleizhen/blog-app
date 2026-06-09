<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

// 文章数据
const articles = ref([])
const isLoading = ref(true)     // 加载状态
const error = ref(null)         // 错误信息

async function fetchArticles() {
  isLoading.value = true
  error.value = null
  try {
    const res = await fetch('/public/posts.json')
    //await new Promise(resolve => setTimeout(resolve, 3000)) // 模拟网络延迟
    const data = await res.json()
    articles.value = data
  } catch (err) {
    console.log('加载文章失败：', err)
    error.value = '加载文章失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

onMounted(() =>{
  fetchArticles();
})

// 提取所有分类（去重）
const categories = computed(() => {
  const cats = articles.value.map(a => a.category)
  return ['全部', ...new Set(cats)]
})

// 当前选中的分类
const activeCategory = ref('全部')

// 根据分类过滤文章
const filteredArticles = computed(() => {
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

    <!-- 加载中状态 -->
    <p v-if="isLoading" class="status-msg">加载中，请稍候...</p>

    <!-- 错误状态 -->
    <p v-else-if="error" class="status-msg error">
      加载失败：{{ error }}
      <button @click="fetchArticles">重试</button>
    </p>

    <!-- 空数据状态 -->
    <p v-else-if="articles.length === 0" class="status-msg">
      还没有文章，敬请期待。
    </p>

    <!-- 空状态 -->
    <p v-if="filteredArticles.length === 0" class="empty-tip">
      该分类下暂无文章
    </p>

    <!-- 文章卡片列表 -->
    <div v-else class="article-grid">
      <BlogCard
        v-for="article in filteredArticles"
        :key="article.id"
        :id="article.id"
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