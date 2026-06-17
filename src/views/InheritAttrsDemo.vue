<template>
  <div class="inherit-attrs-demo">
    <h1>Vue 3 inheritAttrs 属性</h1>
    <p class="desc">控制非 prop 属性是否自动透传到组件根元素</p>

    <!-- 1. 默认行为（inheritAttrs: true） -->
    <h2>1. 默认行为：属性自动透传</h2>
    <p class="desc">没被 props 接收的属性，会自动加到根元素上</p>
    <div class="demo-box">
      <AttrDefault class="red-border" data-id="123" title="默认透传" />
    </div>
    <div class="code-block">
      <pre><code>&lt;AttrDefault class="red-border" data-id="123" /&gt;
           ↑ 这些属性组件没声明为 props
           → 自动加到根元素 &lt;div class="red-border" data-id="123"&gt;</code></pre>
    </div>

    <!-- 2. 关闭透传（inheritAttrs: false） -->
    <h2>2. 关闭透传：属性不自动加到根元素</h2>
    <p class="desc">配合 $attrs 手动指定透传位置</p>
    <div class="demo-box">
      <AttrCustom class="red-border" data-id="456" title="手动透传" />
    </div>
    <div class="code-block">
      <pre><code>// 子组件设置 inheritAttrs: false
// 然后用 $attrs 手动绑定到想要的元素上
&lt;div&gt;不是根元素&lt;/div&gt;
&lt;div v-bind="$attrs"&gt;属性加到这里&lt;/div&gt;</code></pre>
    </div>

    <!-- 3. script setup 写法 -->
    <h2>3. script setup 写法</h2>
    <div class="demo-box">
      <AttrSetup class="red-border" data-id="789" />
    </div>
  </div>
</template>

<script setup>
import AttrDefault from '../components/inheritAttrs/AttrDefault.vue'
import AttrCustom from '../components/inheritAttrs/AttrCustom.vue'
import AttrSetup from '../components/inheritAttrs/AttrSetup.vue'
</script>

<style scoped>
.inherit-attrs-demo {
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
  margin-bottom: 16px;
}
.code-block code {
  font-family: 'Consolas', 'Courier New', monospace;
}
.red-border {
  border: 3px solid #e74c3c !important;
  padding: 8px;
  border-radius: 6px;
}
</style>
