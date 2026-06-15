<template>
  <div class="compiler-demo">
    <h1>Vue 3 compilerOptions 学习</h1>

    <!-- 1. 自定义元素 -->
    <h2>1. 自定义元素（customElements）</h2>
    <p class="desc">告诉 Vue 某些标签不是组件，是原生 HTML 标签，避免报 "未注册组件" 的警告</p>
    <div class="code-block">
      <pre><code>// vite.config.js
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        // 所有 &lt;my-card&gt; 标签都当原生元素，不解析成 Vue 组件
        isCustomElement: (tag) => tag.startsWith('my-')
      }
    }
  }
})</code></pre>
    </div>
    <!-- 下面这个标签会被当作原生元素，不会报组件未注册警告 -->
    <my-card>我是一个自定义原生标签</my-card>

    <!-- 2. 注释处理 -->
    <h2>2. comments 属性</h2>
    <p class="desc">生产环境默认移除 HTML 注释，开发时可以保留</p>
    <div class="code-block">
      <pre><code>compilerOptions: {
  // true = 保留注释（包体积大一点）
  // false = 移除注释（默认，生产环境）
  comments: true
}</code></pre>
    </div>
    <!-- 这是一个测试注释，comments: true 时会保留在编译结果中 -->

    <!-- 3. 换行符处理 -->
    <h2>3. whitespace 属性</h2>
    <p class="desc">控制模板中空白字符的处理方式</p>
    <div class="code-block">
      <pre><code>compilerOptions: {
  // 'condense' = 默认值，压缩多余空白
  // 'preserve' = 保留所有空白
  whitespace: 'preserve'
}</code></pre>
    </div>

    <h2>4. nodeTransforms 和 directiveTransforms</h2>
    <p class="desc">编译时钩，可以自定义 AST 转换逻辑（高级用法）</p>
    <div class="code-block">
      <pre><code>// 自定义编译转换，比如自动给所有图片加 loading="lazy"
compilerOptions: {
  nodeTransforms: [
    (node) => {
      if (node.tag === 'img' && !node.props.find(p => p.name === 'loading')) {
        node.props.push({ name: 'loading', value: 'lazy' })
      }
    }
  ]
}</code></pre>
    </div>
  </div>
</template>

<script setup>
// compilerOptions 配置在 vite.config.js 中，不在组件里写
</script>

<style scoped>
.compiler-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  margin-bottom: 16px;
}
.code-block code {
  font-family: 'Consolas', 'Courier New', monospace;
}
my-card {
  display: block;
  padding: 12px;
  background: #f0fbf7;
  border: 2px dashed #42b883;
  border-radius: 8px;
  color: #2f6f53;
}
</style>
