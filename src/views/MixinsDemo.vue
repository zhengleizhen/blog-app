<template>
  <div class="mixins-demo">
    <h1>Vue 3 Mixins 学习</h1>
    <p class="desc">⚠️ Vue 3 官方不推荐用 mixins，推荐用 Composables（组合式函数）替代。这里演示是为了理解老项目代码。</p>

    <!-- 1. 基本用法 -->
    <h2>1. 基本用法：混入公共逻辑</h2>
    <p class="desc">两个组件都用了同一个 mixin，共享了 data 和 methods</p>
    <div class="demo-row">
      <div class="demo-box">
        <MixinComponentA />
      </div>
      <div class="demo-box">
        <MixinComponentB />
      </div>
    </div>

    <!-- 2. 合并策略 -->
    <h2>2. 合并策略：同名怎么合并</h2>
    <p class="desc">组件自己的 data 和 mixin 的 data 同名时，组件自己的优先级更高</p>
    <div class="demo-box">
      <MergeStrategyDemo />
    </div>

    <!-- 3. 为什么不用了 -->
    <h2>3. 为什么 Vue 3 不推荐 mixins</h2>
    <div class="code-block">
      <pre><code>问题1：数据来源不清晰
  组件里用了 this.xxx，不知道是从 mixin 还是自己定义的

问题2：命名冲突
  多个 mixin 都定义了同名 data/method，会覆盖

问题3：难以复用类型
  TypeScript 不好推导 mixin 的类型

Vue 3 推荐方案：Composables（组合式函数）
  // composables/useCounter.js
  export function useCounter() {
    const count = ref(0)
    function increment() { count.value++ }
    return { count, increment }
  }

  // 组件里用
  const { count, increment } = useCounter()  ← 来源清晰，IDE 自动补全</code></pre>
    </div>
  </div>
</template>

<script setup>
import MixinComponentA from '../components/mixins/MixinComponentA.vue'
import MixinComponentB from '../components/mixins/MixinComponentB.vue'
import MergeStrategyDemo from '../components/mixins/MergeStrategyDemo.vue'
</script>

<style scoped>
.mixins-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-row {
  display: flex;
  gap: 16px;
}
.demo-row > * {
  flex: 1;
}
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
