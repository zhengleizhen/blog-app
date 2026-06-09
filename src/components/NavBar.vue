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
    <a href="/" class="logo">我的博客</a>
    <nav>
      <a href="/">首页</a>
      <a href="/about">关于</a>
      <RouterLink :to="{name:'reactiveDemo'}" :class="{ active: isActive('/reactive-demo') }">响应式示例</RouterLink>
      <RouterLink :to="{name:'homeView'}" :class="{active: isActive('/home-view')}"> 父传子</RouterLink>
      <RouterLink :to="{name:'emitsDemo'}" :class="{active: isActive('/emits-demo')}"> 子传父</RouterLink>
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

nav a {
  margin-left: 24px;
  text-decoration: none;
  color: #333;
  font-size: 15px;
}

nav a:hover {
  color: #42b883;
}
</style>