<template>
  <div class="provide-demo">
    <h1>Vue 3 provide / inject 学习</h1>
    <p class="desc">祖先组件提供数据，任意后代组件直接使用，无需逐层传递 props</p>

    <!-- 1. 基本用法 -->
    <h2>1. 基本用法：跨层级传值</h2>
    <p class="desc">GrandParent 提供主题色，Child 不用经过 Parent 就能拿到</p>
    <div class="demo-box">
      <GrandParent />
    </div>

    <!-- 2. 响应式 provide -->
    <h2>2. 响应式 provide</h2>
    <p class="desc">provide 的值变化了，所有 inject 它的组件自动更新</p>
    <div class="demo-box">
      <ReactiveProvider />
    </div>

    <!-- 3. 默认值 -->
    <h2>3. inject 默认值</h2>
    <p class="desc">祖先没 provide 时，inject 可以用默认值兜底</p>
    <div class="demo-box">
      <DefaultValueDemo />
    </div>

    <!-- 代码示例 -->
    <h2> 关键代码对照</h2>
    <div class="code-block">
      <pre><code>// 祖先组件：提供数据
import { provide, ref } from 'vue'
provide('themeColor', ref('#42b883'))

// 后代组件：注入使用（任意层级）
import { inject } from 'vue'
const color = inject('themeColor')

// 带默认值（祖先没提供时用这个）
const color = inject('themeColor', '#999')</code></pre>
    </div>
  </div>
</template>

<script setup>
import GrandParent from '../components/provide/GrandParent.vue'
import ReactiveProvider from '../components/provide/ReactiveProvider.vue'
import DefaultValueDemo from '../components/provide/DefaultValueDemo.vue'
</script>

<style scoped>
.provide-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}
.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
}
.code-block code {
  font-family: 'Consolas', 'Courier New', monospace;
}
</style>
