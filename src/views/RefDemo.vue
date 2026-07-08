<template>
  <div class="ref-demo">
    <h1>模板引用 ref</h1>
    <p class="desc">用 ref 获取 DOM 元素或子组件实例，直接操作它们</p>

    <!-- 1. 基础：获取 DOM 元素 -->
    <h2>1. 获取 DOM 元素</h2>
    <p class="desc">在模板上写 ref="xxx"，在 script 里就能拿到真实的 DOM</p>
    <div class="demo-box">
      <div class="btn-group">
        <button @click="focusInput">点击输入框自动聚焦</button>
        <button @click="changeBg">随机改背景色</button>
        <button @click="showSize">查看输入框尺寸</button>
      </div>
      <input ref="inputRef" class="demo-input" placeholder="我是一个 input" />
      <p>背景 div：<strong ref="bgRef" class="color-box">点按钮改我的颜色</strong></p>
      <p v-if="sizeInfo" class="result">{{ sizeInfo }}</p>
    </div>

    <!-- 2. 获取子组件实例 -->
    <h2>2. 获取子组件实例</h2>
    <p class="desc">拿到子组件的实例，调用它的方法</p>
    <div class="demo-box">
      <div class="btn-group">
        <button @click="childRef?.reset()">调用子组件 reset()</button>
        <button @click="childRef?.double()">调用子组件 double()</button>
        <button @click="childRef?.add(5)">调用子组件 add(5)</button>
      </div>
      <ChildCounter ref="childRef" />
    </div>

    <!-- 3. v-for 里的 ref -->
    <h2>3. v-for 里的多个 ref</h2>
    <p class="desc">列表里每项都有 ref，拿到的是一个数组</p>
    <div class="demo-box">
      <button @click="highlightAll">全部高亮</button>
      <button @click="clearAll">清除高亮</button>
      <ul class="list">
        <li
          v-for="item in listItems"
          :key="item.id"
          ref="listRefs"
          class="list-item"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>

    <!-- 4. 实际场景：表单自动聚焦 -->
    <h2>4. 实际场景：弹窗自动聚焦</h2>
    <p class="desc">弹窗打开后，输入框自动获得焦点</p>
    <div class="demo-box">
      <button @click="showModal = true">打开搜索弹窗</button>
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-content">
          <h3>搜索</h3>
          <input ref="searchRef" class="modal-input" placeholder="输入搜索关键词..." />
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 5. 实际场景：获取组件 DOM -->
    <h2>5. 获取组件的根 DOM</h2>
    <p class="desc">用 $el 获取组件渲染出来的真实 DOM 元素</p>
    <div class="demo-box">
      <button @click="logElSize">获取 ToggleSwitch 的尺寸</button>
      <ToggleSwitch ref="toggleRef" v-model="toggleVal" />
      <p v-if="elSize" class="result">{{ elSize }}</p>
    </div>

    <!-- 代码总结 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// 1. 获取 DOM 元素
const inputRef = ref(null)
&lt;input ref="inputRef" /&gt;

// 2. mounted 后使用（因为这时 DOM 才渲染好）
onMounted(() => {
  inputRef.value.focus()     // inputRef.value 就是真实的 DOM
  inputRef.value.clientWidth // 获取宽度
})

// 3. 获取子组件实例
const childRef = ref(null)
&lt;ChildCounter ref="childRef" /&gt;

onMounted(() => {
  childRef.value.reset()     // 调用子组件方法
  childRef.value.count       // 访问子组件数据（需 defineExpose）
})

// 4. v-for 中的 ref
const listRefs = ref([])
&lt;li v-for="item in items" :key="item.id" ref="listRefs"&gt;

onMounted(() => {
  listRefs.value.forEach(el => el.style.color = 'red')
})

// 5. 获取组件的根 DOM
const compRef = ref(null)
compRef.value.$el  // 组件渲染的真实 DOM 元素</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChildCounter from '../components/ref/ChildCounter.vue'
import ToggleSwitch from '../components/vmodel/ToggleSwitch.vue'

// ==================== 1. 获取 DOM 元素 ====================
const inputRef = ref(null)
const bgRef = ref(null)
const sizeInfo = ref('')

function focusInput() {
  inputRef.value.focus()
}

function changeBg() {
  const colors = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc', '#ffccff', '#ccffff']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  bgRef.value.style.backgroundColor = randomColor
}

function showSize() {
  const el = inputRef.value
  sizeInfo.value = `输入框宽度：${el.clientWidth}px，高度：${el.clientHeight}px`
}

// ==================== 2. 获取子组件实例 ====================
const childRef = ref(null)

// ==================== 3. v-for 里的 ref ====================
const listItems = ref([
  { id: 1, text: 'Vue 入门教程' },
  { id: 2, text: 'JavaScript 基础' },
  { id: 3, text: 'CSS 布局技巧' },
  { id: 4, text: 'TypeScript 指南' },
])
const listRefs = ref([])

function highlightAll() {
  listRefs.value.forEach(el => {
    el.style.backgroundColor = '#fff3cd'
    el.style.fontWeight = 'bold'
  })
}

function clearAll() {
  listRefs.value.forEach(el => {
    el.style.backgroundColor = ''
    el.style.fontWeight = ''
  })
}

// ==================== 4. 弹窗自动聚焦 ====================
const showModal = ref(false)
const searchRef = ref(null)

// watch showModal，弹出后自动聚焦
import { watch, nextTick } from 'vue'
watch(showModal, async (val) => {
  if (val) {
    // nextTick 等 DOM 更新完再获取焦点
    await nextTick()
    searchRef.value?.focus()
  }
})

// ==================== 5. 获取组件 DOM ====================
const toggleRef = ref(null)
const toggleVal = ref(false)
const elSize = ref('')

function logElSize() {
  const el = toggleRef.value?.$el
  if (el) {
    elSize.value = `ToggleSwitch 宽度：${el.clientWidth}px，高度：${el.clientHeight}px`
  }
}
</script>

<style scoped>
.ref-demo { max-width: 650px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.tip { color: #999; font-size: 13px; font-style: italic; margin-top: 8px; }
.result { margin: 8px 0; font-size: 14px; padding: 8px 12px; background: #f0fbf7; border-radius: 6px; }
.btn-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
button { padding: 8px 16px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; font-size: 14px; }
button:hover { background: #42b883; color: #fff; }

/* 输入框 */
.demo-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 12px;
}
.demo-input:focus { outline: none; border-color: #42b883; }

/* 颜色块 */
.color-box {
  display: inline-block;
  padding: 8px 20px;
  background: #e0e0e0;
  border-radius: 6px;
  transition: background 0.3s;
}

/* 列表 */
.list { list-style: none; padding: 0; }
.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s;
  cursor: pointer;
}
.list-item:hover { background: #f9f9f9; }

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
}
.modal-content h3 { margin: 0 0 16px; color: #42b883; }
.modal-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 12px;
}
.modal-input:focus { outline: none; border-color: #42b883; }

/* 代码块 */
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
