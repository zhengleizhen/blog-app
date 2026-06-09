<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 文章数据（与首页保持一致，后续改为 API 加载）
const articlesData = ref([
  {
    id: 1,
    title: 'Vue3 入门完全指南',
    date: '2026-05-10',
    category: 'Vue',
    cover: '/images/vue.svg',
    content: `
      <h2>什么是 Vue3？</h2>
      <p>Vue3 是 Vue.js 的最新主要版本，带来了全新的组合式 API（Composition API）、更好的 TypeScript 支持以及显著的性能提升。</p>
      <h2>组合式 API</h2>
      <p>组合式 API 是 Vue3 最大的变化之一。它提供了一种更灵活的方式来组织组件逻辑，特别适合大型项目。</p>
      <h3>ref 和 reactive</h3>
      <p>在 Vue3 中，我们使用 <code>ref</code> 和 <code>reactive</code> 来创建响应式数据：</p>
      <pre><code>import { ref, reactive } from 'vue'

const count = ref(0)
const user = reactive({
  name: 'Vue',
  version: '3.0'
})</code></pre>
      <h3>computed 计算属性</h3>
      <p>计算属性可以基于响应式依赖自动缓存和更新：</p>
      <pre><code>const doubleCount = computed(() => count.value * 2)</code></pre>
      <h2>总结</h2>
      <p>Vue3 的组合式 API 让代码组织更加灵活，配合 TypeScript 可以提供更好的开发体验。建议从新项目开始尝试 Vue3！</p>
    `
  },
  {
    id: 2,
    title: 'JavaScript 异步编程详解',
    date: '2026-05-08',
    category: 'JavaScript',
    cover: '/images/js.svg',
    content: `
      <h2>异步编程的意义</h2>
      <p>JavaScript 是单线程的，但异步编程让我们可以非阻塞地执行任务，比如网络请求、文件读取等。</p>
      <h2>Promise</h2>
      <p>Promise 是异步编程的基础，它代表一个异步操作的最终完成或失败：</p>
      <pre><code>fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))</code></pre>
      <h2>async/await</h2>
      <p>async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码：</p>
      <pre><code>async function getData() {
  try {
    const res = await fetch('/api/data')
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}</code></pre>
      <h2>事件循环</h2>
      <p>理解事件循环是掌握异步编程的关键。JavaScript 引擎通过事件循环来处理任务队列和微任务队列。</p>
      <h2>总结</h2>
      <p>掌握 Promise、async/await 和事件循环，是成为高级前端开发者的必修课。</p>
    `
  },
  {
    id: 3,
    title: 'CSS Grid 布局实战',
    date: '2026-05-05',
    category: 'CSS',
    cover: '/images/css.svg',
    content: `
      <h2>为什么选择 Grid？</h2>
      <p>CSS Grid 是目前最强大的 CSS 布局方案，它允许我们在二维空间（行和列）上同时控制布局。</p>
      <h2>基础概念</h2>
      <p>Grid 布局由容器和子元素组成。容器通过 <code>display: grid</code> 声明为网格容器：</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}</code></pre>
      <h2>常用属性</h2>
      <ul>
    <li><code>grid-template-columns</code>：定义列</li>
    <li><code>grid-template-rows</code>：定义行</li>
    <li><code>gap</code>：间距</li>
    <li><code>grid-column</code>：元素跨列</li>
    <li><code>grid-area</code>：命名区域</li>
  </ul>
      <h2>实战：响应式卡片布局</h2>
      <p>结合 <code>auto-fill</code> 和 <code>minmax</code> 可以一行代码实现响应式布局：</p>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}</code></pre>
      <h2>总结</h2>
      <p>CSS Grid 让复杂布局变得简单。掌握它，你将不再需要为布局问题头疼。</p>
    `
  }
])

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
