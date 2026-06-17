<template>
  <div class="extends-demo">
    <h1>Vue 3 extends 属性</h1>
    <p class="desc">⚠️ Vue 3 已废弃 extends，推荐用 Composables 替代。这里演示是为了理解老项目代码。</p>

    <!-- 1. 基本用法 -->
    <h2>1. 基本用法：继承组件选项</h2>
    <p class="desc">BaseComponent 提供基础逻辑，ExtendedComponent 继承它并扩展</p>
    <div class="demo-row">
      <div class="demo-box">
        <BaseComponent />
      </div>
      <div class="demo-box">
        <ExtendedComponent />
      </div>
    </div>

    <!-- 2. extends vs mixins 的区别 -->
    <h2>2. extends vs mixins</h2>
    <div class="code-block">
      <pre><code>// mixins: 可以混入多个，是"附加"关系
mixins: [mixinA, mixinB, mixinC]

// extends: 只能继承一个，是"父子"关系
extends: BaseComponent

// 合并优先级（从高到低）：
// 组件自身 > extends > mixins</code></pre>
    </div>

    <!-- 3. 为什么不推荐了 -->
    <h2>3. 为什么 Vue 3 废弃了</h2>
    <div class="code-block">
      <pre><code>和 mixins 一样的问题：
1. 数据来源不清晰（this.xxx 从基类来的？）
2. 只能单继承，灵活性差
3. TypeScript 类型推导困难

Vue 3 推荐：Composables（组合式函数）
  const { count, increment } = useCounter()  ← 清晰、灵活、可组合</code></pre>
    </div>
  </div>
</template>

<script setup>
import BaseComponent from '../components/extends/BaseComponent.vue'
import ExtendedComponent from '../components/extends/ExtendedComponent.vue'
</script>

<style scoped>
.extends-demo {
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
