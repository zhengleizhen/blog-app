<template>
  <div class="directives-demo">
    <h1>Vue 3 directives 属性</h1>
    <p class="desc">自定义指令：直接操作 DOM，实现特殊效果</p>

    <!-- 1. 局部注册指令 -->
    <h2>1. 局部注册指令</h2>
    <p class="desc">用 v-focus 自动聚焦输入框</p>
    <div class="demo-box">
      <input v-focus type="text" placeholder="页面加载自动聚焦" class="input" />
    </div>

    <!-- 2. 带参数的指令 -->
    <h2>2. 带参数的指令</h2>
    <p class="desc">v-color="'red'" 设置文字颜色</p>
    <div class="demo-box">
      <p v-color="'#e74c3c'">这段文字是红色</p>
      <p v-color="'#42b883'">这段文字是绿色</p>
    </div>

    <!-- 3. 带修饰符的指令 -->
    <h2>3. 带修饰符的指令</h2>
    <p class="desc">v-scroll.smooth 平滑滚动到顶部</p>
    <div class="demo-box">
      <div class="scroll-area" v-scroll.smooth>
        <p v-for="i in 20" :key="i">第 {{ i }} 行内容</p>
      </div>
      <button @click="scrollTarget?.scrollIntoView({ behavior: 'smooth' })">
        平滑滚动到顶部
      </button>
    </div>

    <!-- 4. 全局指令 -->
    <h2>4. 全局指令（main.js 注册）</h2>
    <p class="desc">v-highlight 全局可用，黄色高亮背景</p>
    <div class="demo-box">
      <p v-highlight>这段文字有黄色高亮背景（全局指令）</p>
    </div>

    <!-- 5. 指令生命周期 -->
    <h2>5. 指令生命周期钩子</h2>
    <div class="code-block">
      <pre><code>// 指令的钩子函数（Vue 3）
const myDirective = {
  mounted(el, binding) {
    // 元素插入 DOM 时执行
    el.style.color = binding.value
  },
  updated(el, binding) {
    // 组件更新时执行
  },
  unmounted(el) {
    // 元素移除时执行（清理工作）
  },
}

// 简写：如果只需要 mounted + updated
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})</code></pre>
    </div>
  </div>
</template>

<script>
// 局部注册指令
const vFocus = {
  mounted: (el) => el.focus(),
}

const vColor = {
  mounted: (el, binding) => {
    el.style.color = binding.value
  },
  updated: (el, binding) => {
    el.style.color = binding.value
  },
}

const vScroll = {
  mounted: (el) => {
    // 记录元素引用，供按钮使用
    el._scrollTarget = el
  },
}

export default {
  directives: {
    focus: vFocus,
    color: vColor,
    scroll: vScroll,
  },
  data() {
    return {
      scrollTarget: null,
    }
  },
  mounted() {
    // 获取滚动区域的引用
    this.scrollTarget = this.$el.querySelector('.scroll-area')
  },
}
</script>

<style scoped>
.directives-demo {
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
.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.scroll-area {
  height: 120px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
}
.scroll-area p {
  margin: 4px 0;
}
button {
  padding: 6px 16px;
  border: 1px solid #42b883;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
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
