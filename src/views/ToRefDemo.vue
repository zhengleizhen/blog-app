<template>
  <div class="toref-demo">
    <h1>toRef & toRefs</h1>
    <p class="desc">解构 reactive 对象时保持响应式</p>

    <!-- 1. 问题演示 -->
    <h2>1. 为什么需要 toRefs？</h2>
    <p class="desc">直接解构 reactive 会丢失响应式</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel bad">
          <h4> 直接解构</h4>
          <p>name: <strong>{{ badName }}</strong></p>
          <button @click="user1.name = '李四'">改 user1.name</button>
          <p class="result">上面的 name 会变吗？</p>
        </div>
        <div class="panel good">
          <h4>✅ toRefs 解构</h4>
          <p>name: <strong>{{ goodName }}</strong></p>
          <button @click="user2.name = '李四'">改 user2.name</button>
          <p class="result">上面的 name 会变吗？</p>
        </div>
      </div>
    </div>

    <!-- 2. toRef 单个属性 -->
    <h2>2. toRef — 转单个属性</h2>
    <p class="desc">把 reactive 的某个属性变成 ref，两边同步</p>
    <div class="demo-box">
      <p>原始：user.age = <strong>{{ user3.age }}</strong></p>
      <p>toRef：ageRef = <strong>{{ ageRef }}</strong></p>
      <button @click="user3.age++">改 user3.age</button>
      <button @click="ageRef++">改 ageRef</button>
      <p class="result">改任意一个，两边都变</p>
    </div>

    <!-- 代码对照 -->
    <h2> 一句话总结</h2>
    <div class="code-block">
      <pre><code>const user = reactive({ name: '张三', age: 18 })

//  直接解构 — name 变成普通字符串，不响应
const { name } = user

// ✅ toRefs — name 变成 ref，保持响应式
const { name } = toRefs(user)

// ✅ toRef — 单个属性转 ref
const age = toRef(user, 'age')</code></pre>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRef, toRefs } from 'vue'

// 1. 对比演示
const user1 = reactive({ name: '张三' })
const user2 = reactive({ name: '张三' })

// 直接解构（丢失响应式）
const { name: badName } = user1

// toRefs 解构（保持响应式）
const { name: goodName } = toRefs(user2)

// 2. toRef 演示
const user3 = reactive({ age: 18 })
const ageRef = toRef(user3, 'age')
</script>

<style scoped>
.toref-demo { max-width: 600px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.panel { padding: 16px; border-radius: 8px; }
.panel.bad { background: #fff3cd; }
.panel.good { background: #f0fbf7; }
.panel h4 { margin: 0 0 12px; }
.panel p { margin: 8px 0; font-size: 14px; }
.result { color: #666; font-style: italic; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
