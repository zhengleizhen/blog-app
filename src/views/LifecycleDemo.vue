<template>
  <div class="lifecycle-demo">
    <h1>Vue 3 生命周期</h1>
    <p class="desc">组件从创建到销毁的完整过程</p>

    <!-- 1. 生命周期流程图 -->
    <h2>1. 生命周期流程图</h2>
    <div class="demo-box flow-chart">
      <div class="stage create">
        <span class="label">创建阶段</span>
        <p>beforeCreate → created</p>
        <span class="desc-text">组件初始化，data/computed 已准备好</span>
      </div>
      <div class="arrow">↓</div>
      <div class="stage mount">
        <span class="label">挂载阶段</span>
        <p>beforeMount → <strong>mounted</strong></p>
        <span class="desc-text">DOM 渲染完成，可以操作元素</span>
      </div>
      <div class="arrow">↓</div>
      <div class="stage update">
        <span class="label">更新阶段</span>
        <p>beforeUpdate → <strong>updated</strong></p>
        <span class="desc-text">数据变化 → DOM 重新渲染</span>
      </div>
      <div class="arrow">↓</div>
      <div class="stage destroy">
        <span class="label">销毁阶段</span>
        <p>beforeUnmount → <strong>unmounted</strong></p>
        <span class="desc-text">组件移除，清理定时器/事件监听</span>
      </div>
    </div>

    <!-- 2. 交互式演示 -->
    <h2>2. 交互式演示</h2>
    <p class="desc">点击按钮切换子组件，观察生命周期执行顺序</p>
    <div class="demo-box">
      <button @click="showChild = !showChild">{{ showChild ? '销毁' : '创建' }}子组件</button>
      <button @click="updateCount">修改数据（触发更新）</button>
      <p>当前计数：{{ count }}</p>

      <ChildLifecycle v-if="showChild" :count="count" />
    </div>

    <!-- 3. 生命周期日志 -->
    <h2>3. 实时日志</h2>
    <p class="desc">下面是子组件生命周期执行的记录</p>
    <div class="demo-box">
      <div class="log-container">
        <p v-for="(log, index) in logs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-name" :class="log.type">{{ log.name }}</span>
          <span class="log-msg">{{ log.msg }}</span>
        </p>
        <p v-if="logs.length === 0" class="empty">暂无日志，先创建子组件</p>
      </div>
      <button @click="logs = []" class="clear-btn">清空日志</button>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>&lt;script setup&gt;
import { onMounted, onUpdated, onUnmounted } from 'vue'

// 挂载完成
onMounted(() => {
  console.log('DOM 已渲染，可以操作元素')
})

// 数据更新后
onUpdated(() => {
  console.log('DOM 已更新')
})

// 组件销毁前
onUnmounted(() => {
  console.log('清理定时器、事件监听等')
})
&lt;/script&gt;</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ChildLifecycle from '../components/lifecycleDemo/ChildLifecycle.vue'

const showChild = ref(false)
const count = ref(0)
const logs = ref([])

function updateCount() {
  count.value++
}

// 监听子组件的生命周期事件
function handleLog(e) {
  logs.value.unshift(e.detail)  // 新日志放最前面
}

onMounted(() => {
  window.addEventListener('lifecycle-log', handleLog)
})

onUnmounted(() => {
  window.removeEventListener('lifecycle-log', handleLog)
})
</script>

<style scoped>
.lifecycle-demo { max-width: 700px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.clear-btn { border-color: #e74c3c; color: #e74c3c; }
.clear-btn:hover { background: #e74c3c; color: #fff; }

/* 流程图 */
.flow-chart { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.stage { padding: 12px 20px; border-radius: 8px; text-align: center; width: 100%; }
.stage .label { display: block; font-weight: bold; margin-bottom: 4px; }
.stage .desc-text { font-size: 13px; color: #666; }
.create { background: #e3f2fd; border-left: 4px solid #2196f3; }
.mount { background: #e8f5e9; border-left: 4px solid #4caf50; }
.update { background: #fff3e0; border-left: 4px solid #ff9800; }
.destroy { background: #fce4ec; border-left: 4px solid #e91e63; }
.arrow { font-size: 20px; color: #999; }

/* 日志 */
.log-container { max-height: 300px; overflow-y: auto; }
.log-item { font-size: 13px; padding: 6px 0; border-bottom: 1px solid #f0f0f0; display: flex; gap: 12px; align-items: center; }
.log-time { color: #999; font-family: monospace; min-width: 70px; }
.log-name { padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
.log-name.mount { background: #e8f5e9; color: #2e7d32; }
.log-name.update { background: #fff3e0; color: #e65100; }
.log-name.destroy { background: #fce4ec; color: #c62828; }
.log-name.create { background: #e3f2fd; color: #1565c0; }
.log-msg { color: #555; }
.empty { color: #999; text-align: center; padding: 20px; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
