<template>
  <div class="teleport-demo">
    <h1>Vue 3 Teleport</h1>
    <p class="desc">把组件渲染到 DOM 的其他位置，不受父组件层级限制</p>

    <!-- 1. 基础用法 -->
    <h2>1. 基础用法：弹窗</h2>
    <p class="desc">弹窗组件写在这里，但实际渲染在 body 下</p>
    <div class="demo-box">
      <button @click="showModal = !showModal">切换弹窗</button>
      <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click="showModal = false">
          <div class="modal" @click.stop>
            <h3>我是弹窗</h3>
            <p>虽然写在这个组件里，但实际挂载在 &lt;body&gt; 下</p>
            <button @click="showModal = false">关闭</button>
          </div>
        </div>
      </Teleport>
    </div>

    <!-- 2. 挂载到指定元素 -->
    <h2>2. 挂载到指定元素</h2>
    <p class="desc">用 CSS 选择器指定目标位置</p>
    <div class="demo-box">
      <div id="tooltip-container" style="position: relative; min-height: 60px;">
        <button @click="showTooltip = !showTooltip">切换提示</button>
        <!-- 目标容器：Teleport 的内容会渲染在这里 -->
        <div ref="tooltipTarget" class="target-box"></div>
      </div>
      <Teleport v-if="showTooltip" :to="tooltipTarget">
        <div class="tooltip">
          我被 Teleport 到了目标容器里
        </div>
      </Teleport>
    </div>

    <!-- 3. 禁用 Teleport -->
    <h2>3. disabled 模式</h2>
    <p class="desc">disabled 时不 teleport，留在原地</p>
    <div class="demo-box">
      <label>
        <input type="checkbox" v-model="disabled" /> 禁用 Teleport
      </label>
      <Teleport to="body" :disabled="disabled">
        <div class="badge">
          {{ disabled ? '留在原地' : '已传送到 body' }}
        </div>
      </Teleport>
    </div>

    <!-- 4. 实际场景：全局通知 -->
    <h2>4. 实际场景：全局通知</h2>
    <p class="desc">子组件发通知，渲染在页面顶部</p>
    <div class="demo-box">
      <button @click="showNotification = !showNotification">显示通知</button>
      <Teleport to="body">
        <div v-if="showNotification" class="notification">
          <p>这是一条全局通知</p>
          <button @click="showNotification = false">关闭</button>
        </div>
      </Teleport>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// 基础用法：传送到 body
&lt;Teleport to="body"&gt;
  &lt;Modal v-if="show" /&gt;
&lt;/Teleport&gt;

// 传送到指定元素
&lt;Teleport to="#target-id"&gt;
  &lt;Tooltip /&gt;
&lt;/Teleport&gt;

// 条件传送
&lt;Teleport to="body" :disabled="isMobile"&gt;
  &lt;Sidebar /&gt;
&lt;/Teleport&gt;</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const showTooltip = ref(false)
const showNotification = ref(false)
const disabled = ref(false)
const tooltipTarget = ref(null)
</script>

<style scoped>
.teleport-demo { max-width: 680px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.target-box { margin-top: 12px; padding: 12px; border: 1px dashed #999; border-radius: 8px; min-height: 40px; }
.badge { display: inline-block; padding: 6px 16px; background: #f0fbf7; border-radius: 20px; font-size: 14px; color: #42b883; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
</style>

<style>
/* 全局样式：Teleport 到 body 的内容不受 scoped 影响 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal h3 { margin: 0 0 12px; color: #42b883; }
.modal p { color: #666; margin-bottom: 16px; }
.tooltip {
  background: #333;
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
}
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #42b883;
  color: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 1000;
}
.notification p { margin: 0 0 8px; }
.notification button {
  background: rgba(255,255,255,0.3);
  border: none;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
