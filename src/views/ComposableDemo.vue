<template>
  <div class="composable-demo">
    <h1>Composables 组合式函数</h1>
    <p class="desc">把可复用的逻辑抽成 useXxx 函数，像搭积木一样组合使用</p>

    <!-- 1. 什么是 Composable -->
    <h2>1. 为什么需要 Composable？</h2>
    <p class="desc">两个页面都要「鼠标位置」逻辑，不抽离就得写两遍</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel bad">
          <h4> 不抽离（重复代码）</h4>
          <pre class="mini-code">页面A：
const x = ref(0)
const y = ref(0)
window.on('mousemove', fn)
// ... 一堆代码

页面B：
const x = ref(0)    ← 又写一遍
const y = ref(0)    ← 又写一遍
window.on('mousemove', fn)
</pre>
        </div>
        <div class="panel good">
          <h4>✅ 抽成 useMouse()</h4>
          <pre class="mini-code">composable/useMouse.js：
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  // ... 逻辑只写一次
  return { x, y }
}

页面A/B 都用：
const { x, y } = useMouse()
</pre>
        </div>
      </div>
    </div>

    <!-- 2. useMouse 演示 -->
    <h2>2. useMouse — 追踪鼠标位置</h2>
    <p class="desc">鼠标在下面的框里移动，坐标实时更新</p>
    <div class="demo-box" id="mouse-area">
      <p>X：<strong>{{ mouseX }}</strong> &nbsp; Y：<strong>{{ mouseY }}</strong></p>
      <p class="tip">在灰色区域移动鼠标试试</p>
    </div>

    <!-- 3. useCounter 演示 -->
    <h2>3. useCounter — 计数器</h2>
    <p class="desc">把计数器逻辑封装成一个函数，可以创建多个独立的计数器</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel">
          <h4>计数器 A</h4>
          <p class="big-num">{{ counterA.count }}</p>
          <div class="btn-group">
            <button @click="counterA.decrement()">−</button>
            <button @click="counterA.increment()">+</button>
            <button @click="counterA.reset()">重置</button>
          </div>
        </div>
        <div class="panel">
          <h4>计数器 B</h4>
          <p class="big-num">{{ counterB.count }}</p>
          <div class="btn-group">
            <button @click="counterB.decrement()">−</button>
            <button @click="counterB.increment()">+</button>
            <button @click="counterB.reset()">重置</button>
          </div>
        </div>
      </div>
      <p class="tip">两个计数器完全独立，互不影响 — 因为每次 useCounter() 都创建新的 ref</p>
    </div>

    <!-- 4. useFetch 演示 -->
    <h2>4. useFetch — 封装网络请求</h2>
    <p class="desc">把 loading / error / data 三件套封装起来</p>
    <div class="demo-box">
      <div class="btn-group" style="margin-bottom: 12px;">
        <button @click="url = 'https://jsonplaceholder.typicode.com/posts/1'">获取文章 1</button>
        <button @click="url = 'https://jsonplaceholder.typicode.com/posts/2'">获取文章 2</button>
        <button @click="url = 'https://jsonplaceholder.typicode.com/posts/999'">获取不存在</button>
      </div>
      <p v-if="fetchLoading" class="loading">加载中...</p>
      <p v-else-if="fetchError" class="error">请求失败：{{ fetchError }}</p>
      <div v-else-if="fetchData" class="result-card">
        <h4>{{ fetchData.title }}</h4>
        <p>{{ fetchData.body }}</p>
      </div>
      <p v-else class="hint">点击上方按钮获取数据</p>
    </div>

    <!-- 5. useLocalStorage 演示 -->
    <h2>5. useLocalStorage — 持久化数据</h2>
    <p class="desc">数据自动存到 localStorage，刷新页面不丢失</p>
    <div class="demo-box">
      <p>你的名字：<input v-model="userName" placeholder="输入名字" /></p>
      <p v-if="userName" class="result">你好，<strong>{{ userName }}</strong>！</p>
      <p class="tip">输入后刷新页面，名字还在 — 数据存在 localStorage 里</p>
    </div>

    <!-- 6. 组合使用 -->
    <h2>6. 组合使用</h2>
    <p class="desc">一个页面可以同时用多个 composable</p>
    <div class="demo-box">
      <p>鼠标坐标：({{ comboX }}, {{ comboY }})</p>
      <p>当前时间：<strong>{{ now }}</strong></p>
      <p>计数器：<strong>{{ comboCount }}</strong>
        <button @click="comboIncrement()">+1</button>
        <button @click="comboReset()">重置</button>
      </p>
      <p class="tip">useMouse + useNow + useCounter — 三个 composable 组合在一起</p>
    </div>

    <!-- 代码总结 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// composable/useCounter.js
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initial }
  return { count, increment, decrement, reset }
}

// 使用：
const counterA = useCounter(0)
const counterB = useCounter(100)  // 从 100 开始

// 关键规则：
// 1. 函数名以 use 开头
// 2. 返回 ref / reactive / 函数
// 3. 每次调用都创建独立的响应式状态
// 4. 可以组合多个 composable</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMouse } from '../composables/useMouse.js'
import { useCounter } from '../composables/useCounter.js'
import { useFetch } from '../composables/useFetch.js'
import { useLocalStorage } from '../composables/useLocalStorage.js'
import { useNow } from '../composables/useNow.js'

// ==================== 2. useMouse ====================
const { x: mouseX, y: mouseY } = useMouse()

// ==================== 3. useCounter ====================
const counterA = useCounter(0)
const counterB = useCounter(100)

// ==================== 4. useFetch ====================
const url = ref('')
const { data: fetchData, loading: fetchLoading, error: fetchError } = useFetch(url)

// ==================== 5. useLocalStorage ====================
const userName = useLocalStorage('user-name', '')

// ==================== 6. 组合使用 ====================
const { x: comboX, y: comboY } = useMouse()
const { now } = useNow()
const { count: comboCount, increment: comboIncrement, reset: comboReset } = useCounter(0)
</script>

<style scoped>
.composable-demo { max-width: 700px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.tip { color: #999; font-size: 13px; font-style: italic; margin-top: 8px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }

/* 对比面板 */
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.panel { padding: 16px; border-radius: 8px; }
.panel.bad { background: #fff3cd; }
.panel.good { background: #f0fbf7; }
.panel h4 { margin: 0 0 8px; }
.mini-code { background: #1e1e1e; color: #d4d4d4; padding: 10px; border-radius: 6px; font-size: 11px; white-space: pre; overflow-x: auto; line-height: 1.5; }

/* 鼠标区域 */
#mouse-area { background: #f5f5f5; padding: 24px; border-radius: 8px; min-height: 60px; }
#mouse-area p { margin: 4px 0; font-size: 14px; }

/* 计数器 */
.big-num { font-size: 48px; text-align: center; margin: 12px 0; color: #42b883; font-weight: bold; }
.btn-group { display: flex; gap: 8px; justify-content: center; }

/* fetch */
.loading { color: #888; text-align: center; padding: 20px; }
.error { color: #e74c3c; background: #fdecea; padding: 12px; border-radius: 6px; }
.result-card { background: #f0fbf7; padding: 16px; border-radius: 8px; }
.result-card h4 { margin: 0 0 8px; color: #333; }
.result-card p { color: #666; font-size: 14px; line-height: 1.6; }
.hint { color: #999; text-align: center; padding: 20px; }

/* localStorage */
input { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
input:focus { outline: none; border-color: #42b883; }
.result { margin: 8px 0; font-size: 14px; }

/* 代码块 */
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
