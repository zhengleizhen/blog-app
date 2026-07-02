<template>
  <div class="shallow-demo">
    <h1>shallowRef & shallowReactive</h1>
    <p class="desc">浅层响应式，性能优化用</p>

    <!-- 1. ref vs shallowRef 对比 -->
    <h2>1. ref vs shallowRef</h2>
    <p class="desc">ref 深层响应，shallowRef 只追踪 .value 赋值</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel">
          <h4>ref（深层响应）</h4>
          <p>count: {{ refObj.count }}</p>
          <button @click="refObj.count++">修改内部属性</button>
          <p class="result">{{ refTriggered ? '✅ 触发了更新' : '等待操作...' }}</p>
        </div>
        <div class="panel">
          <h4>shallowRef（浅层响应）</h4>
          <p>count: {{ shallowObj.count }}</p>
          <button @click="shallowObj.count++">修改内部属性</button>
          <p class="result">{{ shallowTriggered ? '✅ 触发了更新' : '❌ 没有触发（预期行为）' }}</p>
        </div>
      </div>
      <button @click="resetRef" class="reset-btn">重置 shallowRef（替换整个对象）</button>
    </div>

    <!-- 2. reactive vs shallowReactive -->
    <h2>2. reactive vs shallowReactive</h2>
    <p class="desc">reactive 深层响应，shallowReactive 只有第一层响应</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel">
          <h4>reactive（深层）</h4>
          <p>user.name: {{ reactiveUser.name }}</p>
          <p>user.profile.age: {{ reactiveUser.profile.age }}</p>
          <button @click="reactiveUser.profile.age++">修改深层属性</button>
          <p class="result">{{ reactiveTriggered ? '✅ 触发了更新' : '等待操作...' }}</p>
        </div>
        <div class="panel">
          <h4>shallowReactive（浅层）</h4>
          <p>user.name: {{ shallowUser.name }}</p>
          <p>user.profile.age: {{ shallowUser.profile.age }}</p>
          <button @click="shallowUser.profile.age++">修改深层属性</button>
          <p class="result">{{ shallowReactiveTriggered ? '✅ 触发了更新' : '❌ 没有触发（预期行为）' }}</p>
        </div>
      </div>
      <button @click="shallowUser.name = '新名字'" class="reset-btn">修改第一层（会触发）</button>
    </div>

    <!-- 3. 使用场景 -->
    <h2>3. 什么时候用？</h2>
    <div class="demo-box scenarios">
      <div class="scenario">
        <h4>用 ref / reactive</h4>
        <p>对象层级不深，需要所有属性都响应</p>
        <code>const form = reactive({ name: '', email: '' })</code>
      </div>
      <div class="scenario">
        <h4>用 shallowRef / shallowReactive</h4>
        <p>对象很大很深，只有部分需要响应</p>
        <code>const bigData = shallowRef({ /* 大量数据 */ })</code>
      </div>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// ref — 深层响应
const obj = ref({ count: 0 })
obj.value.count++  // ✅ 触发更新

// shallowRef — 只有替换整个 value 才触发
const shallow = shallowRef({ count: 0 })
shallow.value.count++        // ❌ 不触发
shallow.value = { count: 1 } // ✅ 触发

// reactive — 深层响应
const user = reactive({ profile: { age: 18 } })
user.profile.age++  // ✅ 触发

// shallowReactive — 只有第一层响应
const shallowUser = shallowReactive({ profile: { age: 18 } })
shallowUser.profile.age++  // ❌ 不触发
shallowUser.name = 'xxx'   // ✅ 触发</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, reactive, shallowReactive } from 'vue'

// --- 1. ref vs shallowRef ---
const refObj = ref({ count: 0 })
const shallowObj = shallowRef({ count: 0 })
const refTriggered = ref(false)
const shallowTriggered = ref(false)

function resetRef() {
  shallowObj.value = { count: shallowObj.value.count + 1 }
  shallowTriggered.value = true
}

// --- 2. reactive vs shallowReactive ---
const reactiveUser = reactive({ name: '张三', profile: { age: 18 } })
const shallowUser = shallowReactive({ name: '李四', profile: { age: 20 } })
const reactiveTriggered = ref(false)
const shallowReactiveTriggered = ref(false)
</script>

<style scoped>
.shallow-demo { max-width: 700px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.reset-btn { border-color: #ff9800; color: #ff9800; }
.reset-btn:hover { background: #ff9800; color: #fff; }
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.panel { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.panel h4 { margin: 0 0 12px; color: #333; }
.panel p { margin: 8px 0; font-size: 14px; }
.result { font-weight: bold; color: #42b883; min-height: 24px; }
.scenarios { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.scenario { padding: 16px; background: #f9f9f9; border-radius: 8px; }
.scenario h4 { margin: 0 0 8px; color: #333; }
.scenario p { font-size: 14px; color: #666; margin-bottom: 8px; }
.scenario code { display: block; background: #1e1e1e; color: #d4d4d4; padding: 8px; border-radius: 4px; font-size: 12px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
