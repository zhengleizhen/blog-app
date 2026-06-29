<template>
  <div class="blog-layout">
    <h2 class="page-title">博客管理</h2>

    <!-- 子路由导航 -->
    <nav class="sub-nav">
      <router-link to="/blog/list" class="nav-link">文章列表</router-link>
      <router-link to="/blog/create" class="nav-link">写文章</router-link>
      <router-link to="/blog/drafts" class="nav-link">草稿箱</router-link>
      <router-link to="/blog/edit/123" class="nav-link">编辑（1个路由参数）</router-link>
      <router-link to="/blog/edit/789/draft" class="nav-link">编辑（2个路由参数）</router-link>
      <router-link :to="{ path: '/blog/view/456', query: { from: 'list', tab: 'content' } }" class="nav-link">
        编辑（query 传参）
      </router-link>
      <router-link to="/blog/detail/999/technology" class="nav-link">
        详情（props: true）
      </router-link>
      <router-link :to="{ name: 'blogDetailFn', params: { id: 888 } }" class="nav-link">
        详情（props 函数1）
      </router-link>
      <router-link :to="{ path: '/blog/detail-fn/666' }" class="nav-link">
        详情（props 函数2）
      </router-link>
      <router-link to="/blog/detail-fn/999" class="nav-link">
        详情（props 函数3）
      </router-link>
      <button class="nav-btn" @click="goBack">← 返回</button>
    </nav>

    <!-- 子路由出口：子页面渲染在这里 -->
    <div class="sub-content">
      <router-view />
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
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
}

.page-title {
  color: #42b883;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e0e0e0;
}

.sub-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.nav-link {
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  background: #f5f7fa;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: #42b883;
  background: #e8f5e9;
  border-color: #42b883;
}

.nav-link.router-link-active {
  color: #fff;
  background: #42b883;
  border-color: #42b883;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}

.nav-btn {
  padding: 8px 16px;
  border: 1px dashed #42b883;
  border-radius: 8px;
  background: #fff;
  color: #42b883;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-btn:hover {
  background: #42b883;
  color: #fff;
}

.sub-content {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
</style>
