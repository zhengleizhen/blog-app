<template>
  <div class="components-demo">
    <h1>Vue 3 components 属性</h1>
    <p class="desc">局部注册组件：只在该组件内可用</p>

    <!-- 1. 局部注册 -->
    <h2>1. 局部注册组件</h2>
    <p class="desc">通过 components 选项注册，只在这个组件能用</p>
    <div class="demo-box">
      <LocalButton type="primary">局部按钮</LocalButton>
      <InfoCard />
    </div>

    <!-- 2. 全局注册对比 -->
    <h2>2. 全局注册（main.js 中注册）</h2>
    <p class="desc">全局组件任何地方直接用，不需要 components 注册</p>
    <div class="demo-box">
      <GlobalCounter />
    </div>

    <!-- 3. script setup 自动注册 -->
    <h2>3. script setup 自动注册</h2>
    <p class="desc">import 了就能直接用，Vue 自动注册</p>
    <div class="demo-box">
      <AutoButton>自动注册的按钮</AutoButton>
    </div>

    <!-- 4. 动态组件 -->
    <h2>4. 动态注册组件</h2>
    <p class="desc">computed 返回组件，按需加载</p>
    <div class="demo-box">
      <button @click="showA = !showA">切换组件</button>
      <component :is="currentComponent" />
    </div>

    <!-- 代码对照 -->
    <h2> 各种注册方式对比</h2>
    <div class="code-block">
      <pre><code>// 1. 局部注册（Options API）
export default {
  components: { LocalButton, InfoCard }
}

// 2. 全局注册（main.js）
app.component('GlobalCounter', GlobalCounter)

// 3. script setup 自动注册（推荐）
import AutoButton from './AutoButton.vue'
// 模板直接用 &lt;AutoButton /&gt;

// 4. 动态组件
const currentComponent = computed(() => showA.value ? ComponentA : ComponentB)</code></pre>
    </div>
  </div>
</template>

<script>
import LocalButton from '../components/componentsDemo/LocalButton.vue'
import InfoCard from '../components/componentsDemo/InfoCard.vue'
import AutoButton from '../components/componentsDemo/AutoButton.vue'
import ComponentA from '../components/componentsDemo/ComponentA.vue'
import ComponentB from '../components/componentsDemo/ComponentB.vue'

export default {
  // 局部注册：只在这个组件能用
  components: {
    LocalButton,
    InfoCard,
    AutoButton,
    ComponentA,
    ComponentB,
  },
  data() {
    return {
      showA: true,
    }
  },
  computed: {
    currentComponent() {
      return this.showA ? 'ComponentA' : 'ComponentB'
    },
  },
}
</script>

<style scoped>
.components-demo {
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
