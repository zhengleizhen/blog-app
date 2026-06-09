<!-- 文件路径：src/components/NavBar.vue -->
<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute()
const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
// 导航栏目前只需要展示，后续会加入搜索和暗黑模式切换
</script>

<template>
  <header class="navbar">
    <RouterLink to="/" class="logo">我的博客</RouterLink>
    <nav>
      <RouterLink to="/" class="nav-link" :class="{ active: isActive('/') }">首页</RouterLink>
      <RouterLink to="/about" class="nav-link" :class="{ active: isActive('/about') }">关于</RouterLink>
      <RouterLink :to="{name:'reactiveDemo'}" class="nav-link" :class="{ active: isActive('/reactive-demo') }">响应式示例</RouterLink>
      <RouterLink :to="{name:'homeView'}" class="nav-link" :class="{ active: isActive('/home-view') }">父传子</RouterLink>
      <RouterLink :to="{name:'emitsDemo'}" class="nav-link" :class="{ active: isActive('/emits-demo') }">子传父</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #42b883;
  text-decoration: none;
}

nav a,
nav .nav-link {
  margin-left: 24px;
  text-decoration: none;
  color: #333;
  font-size: 15px;
  transition: color 0.2s, border-color 0.2s;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}

nav a:hover,
nav .nav-link:hover {
  color: #42b883;
}

nav .nav-link.active {
  color: #42b883;
  border-bottom-color: #42b883;
}
</style>