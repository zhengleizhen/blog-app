<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

// 文章数据
const articles = ref([])
// 当前选中的分类
const activeCategory = ref('全部')
const keyword = ref('')       // 搜索关键词
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

// 根据分类过滤文章
const filteredArticles = computed(() => {
  let result = articles.value;
  if (activeCategory.value !== '全部') 
    result = articles.value.filter(a => a.category === activeCategory.value)
  
    // 关键词搜索
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    result = result.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      a.summary.toLowerCase().includes(kw)
    )
  }
  return result
})

// 处理子组件发来的分类切换事件
function handleCategoryChange(cat) {
  activeCategory.value = cat
}
</script>

<template>
  <div class="home">
    <div class="search-bar">
      <input v-model="keyword" type="text" 
      placeholder="搜索文章..." class="search-input"/>
      <span v-if="keyword" class="clear-btn" @click="keyword = ''">✕</span>
    </div>

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

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #42b883;
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}
</style>