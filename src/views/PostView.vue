<!-- 文件路径：src/views/PostView.vue -->
<script setup>
import userPosts from '../components/usePosts.js'
import {ref,computed,onMounted} from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useFavoriteStore } from '../stores/useFavoriteStore.js'

// useRoute 返回当前路由对象
const route = useRoute()
const id = route.params.id

const favoriteStore = useFavoriteStore()

const {
  isLoading,
  error,
  getArticleById,
} = userPosts()

const article = computed(() => {
  const x1 = getArticleById(id)
  console.log('找到的文章：', x1)
  return x1
})

// route.params 包含 URL 中的参数
// 例如 URL 为 /post/3，则 route.params.id === '3'
console.log('文章 ID：', route.params.id)
</script>

<template>
  <div class="post-view">
    <p v-if="isLoading">加载中...</p>
    <div v-else-if="!article" class="not-found">
      <h2>文章未找到{{ error }}</h2>
      <p>抱歉，您访问的文章不存在或已被删除。</p>
      <RouterLink to="/" class="back-link">返回首页</RouterLink>
    </div>

    <!-- 文章存在，展示完整内容 -->
    <article v-else>
      <div class="tech-info">
        <p>本页面通过 `vue-router` 路由参数加载文章详情，数据来源于 `usePosts.js` 中封装的文章仓库。</p>
        <p>收藏按钮使用 Pinia `useFavoriteStore` 管理状态，支持组件间实时同步收藏数。</p>
      </div>
      <span class="category-tag">{{ article.category }}</span>
      <h1>{{ article.title }}</h1>
      <time>{{ article.date }}</time>
      <!-- v-html 渲染 HTML 字符串 -->
      <div class="content" v-html="article.content"></div>
      <button
        type="button"
        class="fav-btn"
        :class="{ active: favoriteStore.isFavorite(article.id) }"
        @click="favoriteStore.toggleFavorite(article.id)"
      >
        {{ favoriteStore.isFavorite(article.id) ? '♥ 已收藏' : '♡ 收藏' }}
      </button>
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

.fav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  margin-top: 30px;
  border: 1px solid #42b883;
  border-radius: 999px;
  background: #fff;
  color: #42b883;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.fav-btn:hover {
  transform: translateY(-1px);
  background: #f0fbf7;
}

.fav-btn.active {
  background: #42b883;
  color: #fff;
  border-color: transparent;
  box-shadow: 0 12px 28px rgba(66, 184, 131, 0.2);
}

.back-link {
  display: inline-block;
  margin-top: 40px;
  color: #42b883;
  text-decoration: none;
}

.tech-info {
  background: #f7fbf8;
  border: 1px solid #d8f0e1;
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 22px;
  color: #2f6f53;
}

.tech-info p {
  margin: 0 0 8px;
  line-height: 1.7;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}
</style>