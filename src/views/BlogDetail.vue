<template>
  <div class="blog-detail">
    <h3>文章详情（props 传参）</h3>
    <div class="info">
      <p><strong>文章 ID（props）：</strong>{{ id }}</p>
      <p><strong>分类（props）：</strong>{{ category }}</p>
    </div>
    <p class="tip">组件不依赖 useRoute()，直接通过 props 接收路由参数，组件更通用、好测试。</p>
  </div>
</template>

<script setup>
// 直接 defineProps 接收，不用 useRoute()
const props = defineProps({
  id: { 
    type: [String, Number], 
    default: '' 
  },
  category: { 
    type: String, 
    default: '不传的话，我是默认值' 
  },
})
</script>

<style scoped>
.blog-detail h3 { color: #42b883; margin-bottom: 16px; }
.info { background: #f0fbf7; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
.info p { margin: 4px 0; }
.info strong { color: #42b883; }
.tip { color: #888; font-size: 13px; font-style: italic; }
</style>
