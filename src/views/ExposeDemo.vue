<template>
  <div class="expose-demo">
    <h1>Vue 3 defineExpose</h1>
    <p class="desc">让父组件访问子组件的方法和数据</p>

    <!-- 1. 基础用法 -->
    <h2>1. 基础用法</h2>
    <p class="desc">子组件用 defineExpose 暴露方法，父组件通过 ref 调用</p>
    <div class="demo-box">
      <ChildCounter ref="counterRef" />
      <button @click="counterRef?.increment()">调用子组件 increment()</button>
      <button @click="counterRef?.reset()">调用子组件 reset()</button>
      <p>子组件的 count：<strong>{{ counterRef?.count ?? '未初始化' }}</strong></p>
    </div>

    <!-- 2. 暴露数据 -->
    <h2>2. 暴露数据</h2>
    <p class="desc">子组件可以暴露 ref、reactive 等响应式数据</p>
    <div class="demo-box">
      <ChildForm ref="formRef" />
      <button @click="formRef?.clearForm()">清空表单</button>
      <button @click="formRef?.fillDemo()">填充示例数据</button>
      <p>表单 name 值：<strong>{{ formRef?.formData?.name ?? '未初始化' }}</strong></p>
    </div>

    <!-- 3. 对比：不暴露会怎样 -->
    <h2>3. 不暴露 = 父组件访问不到</h2>
    <p class="desc">没有 defineExpose 的子组件，父组件拿不到任何东西</p>
    <div class="demo-box">
      <ChildSecret ref="secretRef" />
      <button @click="tryAccessSecret()">尝试访问子组件数据</button>
      <p class="log">{{ accessResult }}</p>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// 子组件：ChildCounter.vue
const count = ref(0)
function increment() { count.value++ }

// ⭐ 必须 expose 暴露出去，父组件才能访问
defineExpose({ count, increment })

// 父组件：
const counterRef = ref(null)
counterRef.value.increment()  // 调用子组件方法
console.log(counterRef.value.count)  // 读取子组件数据</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildCounter from '../components/exposeDemo/ChildCounter.vue'
import ChildForm from '../components/exposeDemo/ChildForm.vue'
import ChildSecret from '../components/exposeDemo/ChildSecret.vue'

const counterRef = ref(null)
const formRef = ref(null)
const secretRef = ref(null)
const accessResult = ref('点击按钮试试')

function tryAccessSecret() {
  if (secretRef.value) {
    accessResult.value = `secretRef.value = ${JSON.stringify(secretRef.value)}（空对象，因为子组件没 expose）`
  }
}
</script>

<style scoped>
.expose-demo { max-width: 680px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.log { background: #fff3cd; padding: 10px; border-radius: 6px; font-size: 14px; color: #856404; margin-top: 8px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
