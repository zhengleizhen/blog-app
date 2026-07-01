<template>
  <div class="reactive-demo">
    <h1>Vue 3 reactive 与 watch</h1>

    <!-- 1. reactive 基础 -->
    <h2>1. reactive — 对象响应式</h2>
    <p class="desc">ref 适合单个值，reactive 适合对象</p>
    <div class="demo-box">
      <p>用户：<strong>{{ user.name }}</strong>，年龄：<strong>{{ user.age }}</strong></p>
      <button @click="user.age++">年龄 +1</button>
      <button @click="user.name = '李四'">改名</button>
    </div>

    <!-- 2. reactive 嵌套对象 -->
    <h2>2. 嵌套对象也响应</h2>
    <p class="desc">reactive 深层递归响应</p>
    <div class="demo-box">
      <p>城市：{{ user.address.city }}</p>
      <button @click="user.address.city = '深圳'">换城市</button>
    </div>

    <!-- 3. ref vs reactive 对比 -->
    <h2>3. ref vs reactive 对比</h2>
    <p class="desc">解构会丢失响应式！</p>
    <div class="demo-box">
      <p>ref 解构：<strong>{{ count }}</strong>（正常）</p>
      <p>reactive 解构：<strong>{{ name }}</strong>（丢失响应式，点下面按钮没反应）</p>
      <button @click="count++">ref +1</button>
      <button @click="person.name = '王五'">reactive 整体改</button>
    </div>

    <!-- 4. watch 基础 -->
    <h2>4. watch — 监听单个值</h2>
    <p class="desc">数据变化时执行副作用</p>
    <div class="demo-box">
      <input v-model="searchText" placeholder="输入搜索..." class="input" />
      <p class="log">最后搜索：{{ lastSearch }}</p>
    </div>

    <!-- 5. watch 监听对象 -->
    <h2>5. watch 监听整个对象</h2>
    <p class="desc">用 deep: true 深度监听</p>
    <div class="demo-box">
      <input v-model="user.name" placeholder="改名字" class="input" />
      <p class="log">{{ logMsg }}</p>
    </div>

    <!-- 6. watchEffect -->
    <h2>6. watchEffect — 自动收集依赖</h2>
    <p class="desc">不用指定监听谁，函数里用了什么响应式数据就自动监听</p>
    <div class="demo-box">
      <p>计数器：<strong>{{ counter }}</strong></p>
      <p>双倍：<strong>{{ double }}</strong></p>
      <button @click="counter++">+1</button>
      <p class="log">watchEffect 执行了 {{ effectCount }} 次</p>
    </div>

    <!-- 7. 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// ref — 单个值，访问用 .value
const count = ref(0)
count.value++

// reactive — 对象，访问不用 .value
const user = reactive({ name: '张三', age: 18 })
user.age++

// watch — 指定监听谁
watch(searchText, (newVal, oldVal) => {
  console.log('变了：', oldVal, '→', newVal)
})

// watchEffect — 自动追踪依赖
watchEffect(() => {
  console.log('counter 或 double 变了')
})</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from 'vue'

// --- 1. reactive 基础 ---
const user = reactive({
  name: '张三',
  age: 18,
  address: { city: '北京' }
})

// --- 3. ref vs reactive 解构对比 ---
const count = ref(0)
const person = reactive({ name: '赵六' })
// 直接解构会丢失响应式！
const { name } = person  //  name 变成普通字符串，不再响应

// --- 4. watch 基础 ---
const searchText = ref('')
const lastSearch = ref('无')

watch(searchText, (newVal, oldVal) => {
  lastSearch.value = newVal || '清空了'
})

// --- 5. watch 监听对象 ---
const logMsg = ref('修改 user.name 试试')

watch(user, (newVal) => {
  logMsg.value = `名字变成了：${newVal.name}`
}, { deep: true })

// --- 6. watchEffect ---
const counter = ref(0)
const effectCount = ref(0)
const double = ref(0)

watchEffect(() => {
  // 读了 counter，所以 counter 一变就自动重新执行
  double.value = counter.value * 2
  effectCount.value++
})
</script>

<style scoped>
.reactive-demo { max-width: 680px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 12px; }
.log { background: #f7f7f7; padding: 10px; border-radius: 6px; font-size: 14px; color: #e83e8c; margin-top: 8px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
