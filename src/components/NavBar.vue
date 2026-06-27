<!-- 文件路径：src/components/NavBar.vue -->
<script setup>
import useDarkMode from './useDarkMode'
import { RouterLink, useRoute } from 'vue-router'
import {useFavoriteStore} from '../stores/useFavoriteStore.js'

const { isDark, toggleDark } = useDarkMode()
const route = useRoute()
const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
// 导航栏目前只需要展示，后续会加入搜索和暗黑模式切换

const favoriteStore = useFavoriteStore()
</script>

<template>
  <header class="navbar">
    <div class="logo-block">
      <RouterLink to="/" class="logo">我的博客</RouterLink>
      <span class="logo-subtitle">Vue 3 + Vite 技术展示</span>
    </div>
    <nav>
      <span class="fav-badge" v-if="favoriteStore.favoriteCount > 0">
        收藏 {{ favoriteStore.favoriteCount }}
      </span>
      <RouterLink to="/" class="nav-link" :class="{ active: isActive('/') }">首页</RouterLink>
      <RouterLink to="/about" class="nav-link" :class="{ active: isActive('/about') }">关于</RouterLink>
      <RouterLink :to="{name:'reactiveDemo'}" class="nav-link" :class="{ active: isActive('/reactive-demo') }">响应式示例</RouterLink>
      <RouterLink :to="{name:'homeView'}" class="nav-link" :class="{ active: isActive('/home-view') }">父传子</RouterLink>
      <RouterLink :to="{name:'emitsDemo'}" class="nav-link" :class="{ active: isActive('/emits-demo') }">子传父</RouterLink>
      <RouterLink to="/blog" class="nav-link" :class="{ active: isActive('/blog') }">博客管理</RouterLink>
      <button class="dark-mode-toggle" @click="toggleDark">
        {{ isDark ? '🌞' : '🌙' }}
      </button>
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
.fav-badge {
  background: #e74c3c;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
}

.logo-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.logo-subtitle {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.2;
}
</style>