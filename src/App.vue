<script setup>
import { RouterView, useRoute } from 'vue-router'
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

html.dark body {
  background: #121212;
  color: #e8e8e8;
}

html.dark .navbar {
  background: #1f1f1f;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

html.dark .logo,
html.dark .nav-link,
html.dark .dark-mode-toggle {
  color: #b7f0c3;
}

html.dark .nav-link.active {
  color: #7be0ad;
  border-bottom-color: #7be0ad;
}

html.dark .nav-link:hover,
html.dark .dark-mode-toggle:hover {
  color: #7be0ad;
}

.dark-mode-toggle {
  margin-left: 24px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s, transform 0.2s;
}

.dark-mode-toggle:hover {
  color: #42b883;
  transform: translateY(-1px);
}

html.dark .footer {
  background: #181818;
  color: #bbb;
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
