<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import  userPosts  from '../components/usePosts.js'
import { ref, computed, onMounted, watch } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

const {
  articles,
  isLoading,
  error,
  activeCategory,
  keyword,
  categories,
  filteredArticles,
  handleCategoryChange,
  fetchPosts
} = userPosts()

</script>

<template>
  <div class="home">
    <div class="search-bar">
      <input v-model="keyword" type="text" 
      placeholder="搜索文章..." class="search-input"/>
      <span v-if="keyword" class="clear-btn" @click="keyword = ''">✕</span>
    </div>

    <div class="tech-summary">
      <h2>技术说明</h2>
      <p>本项目使用 Vue 3 和 Vite 搭建，采用组合式 API 和组件化结构来组织页面与逻辑。</p>
      <p>文章列表数据由 `usePosts.js` 封装加载，支持搜索、分类筛选和加载状态处理。</p>
      <p>收藏功能由 Pinia 存储 `useFavoriteStore.js` 管理，组件之间通过共享状态实现实时同步。</p>
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
      <button @click="fetchPosts">重试</button>
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

.tech-summary {
  background: #f9fbfe;
  border: 1px solid #e5eff9;
  border-radius: 16px;
  padding: 18px 20px;
  margin-bottom: 24px;
}

.tech-summary h2 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #2f5d9a;
}

.tech-summary p {
  margin: 10px 0 0;
  color: #4a5568;
  line-height: 1.7;
}
</style>