<template>
  <div class="blog-layout">
    <h2>博客管理</h2>

    <!-- 子路由导航 -->
    <nav class="sub-nav">
      <router-link to="/blog/list" class="nav-link">文章列表</router-link>
      <router-link to="/blog/create" class="nav-link">写文章</router-link>
      <router-link to="/blog/drafts" class="nav-link">草稿箱</router-link>
      <router-link to="/blog/edit/123" class="nav-link">编辑（路由参数）</router-link>
      <router-link :to="{ path: '/blog/edit/456', query: { from: 'list', tab: 'content' } }" class="nav-link">编辑（query 传参）</router-link>
      <router-link :to="{ name: 'blogEdit', params: { id: 789 }, query: { source: 'router.push' } }" class="nav-link">编辑（name+params）</router-link>
      <button class="nav-btn" @click="goBack">router.goBack()</button>
    </nav>

    <!-- 子路由出口：子页面渲染在这里 -->
    <div class="sub-content">
      <router-view />
      <!-- <RouterView /> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style scoped>
.blog-layout {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h2 { color: #42b883; }
.sub-nav {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}
.nav-link {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: #666;
  background: #f5f7fa;
  transition: all 0.2s;
}
.nav-link:hover { color: #42b883; }
.nav-link.router-link-active {
  color: #fff;
  background: #42b883;
}
.nav-btn {
  padding: 8px 12px;
  border: 1px solid #42b883;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}
.sub-content {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  min-height: 200px;
}
</style>
