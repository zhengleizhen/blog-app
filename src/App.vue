<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
const route = useRoute()

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 页面内容 -->
    <main class="main">
      <RouterView />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2026 我的博客 &middot; Powered by Vue</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #42b883;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav a {
  color: #666;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
}

.nav a:hover {
  color: #42b883;
}

.nav a.active {
  color: #42b883;
  border-bottom-color: #42b883;
}

/* 主内容区 */
.main {
  flex: 1;
}

/* 页脚 */
.footer {
  background: #f5f5f5;
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: #999;
}
</style>
