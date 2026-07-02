<template>
  <div class="async-demo">
    <h1>Vue 3 异步组件 + Suspense</h1>
    <p class="desc">按需加载组件，加载期间显示 Loading 态</p>

    <!-- 1. defineAsyncComponent 基础 -->
    <h2>1. 异步组件基础</h2>
    <p class="desc">用 defineAsyncComponent 延迟加载组件</p>
    <div class="demo-box">
      <button @click="loadAsync = !loadAsync">{{ loadAsync ? '卸载' : '加载' }}异步组件</button>
      <Suspense v-if="loadAsync">
        <template #default>
          <AsyncComponent />
        </template>
        <template #fallback>
          <div class="loading">加载中...</div>
        </template>
      </Suspense>
      <p v-else class="hint">点击按钮加载组件</p>
    </div>

    <!-- 2. 带 loading 和 error -->
    <h2>2. 自定义 loading 和 error</h2>
    <p class="desc">可以配置加载中显示什么、报错时显示什么</p>
    <div class="demo-box">
      <button @click="loadAdvanced = !loadAdvanced">{{ loadAdvanced ? '卸载' : '加载' }}高级异步组件</button>
      <Suspense v-if="loadAdvanced">
        <template #default>
          <AsyncAdvanced />
        </template>
        <template #fallback>
          <div class="loading">
            <span class="spinner"></span> 正在加载，请稍候...
          </div>
        </template>
      </Suspense>
      <p v-else class="hint">点击按钮加载组件</p>
    </div>

    <!-- 3. 实际场景：懒加载弹窗 -->
    <h2>3. 实际场景：懒加载弹窗</h2>
    <p class="desc">弹窗组件只在需要时才加载，减小首屏体积</p>
    <div class="demo-box">
      <button @click="showModal = true">打开设置弹窗</button>
      <Teleport to="body">
        <Suspense v-if="showModal">
          <template #default>
            <LazyModal @close="showModal = false" />
          </template>
          <template #fallback>
            <div class="modal-overlay">
              <div class="modal loading-modal">加载中...</div>
            </div>
          </template>
        </Suspense>
      </Teleport>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// 1. 定义异步组件
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)

// 2. 配置 loading 和 error
const AsyncWithConfig = defineAsyncComponent({
  loader: () => import('./Heavy.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorPage,
  delay: 200,      // 延迟显示 loading
  timeout: 3000,   // 超时时间
})

// 3. 模板中使用
&lt;Suspense&gt;
  &lt;template #default&gt;
    &lt;AsyncComponent /&gt;
  &lt;/template&gt;
  &lt;template #fallback&gt;
    &lt;Loading /&gt;
  &lt;/template&gt;
&lt;/Suspense&gt;</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('../components/asyncDemo/AsyncComponent.vue')
)
const AsyncAdvanced = defineAsyncComponent(() =>
  import('../components/asyncDemo/AsyncAdvanced.vue')
)
const LazyModal = defineAsyncComponent(() =>
  import('../components/asyncDemo/LazyModal.vue')
)

const loadAsync = ref(false)
const loadAdvanced = ref(false)
const showModal = ref(false)
</script>

<style scoped>
.async-demo { max-width: 680px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
button { padding: 6px 16px; margin-right: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }
.loading { padding: 20px; text-align: center; color: #888; font-size: 14px; }
.hint { color: #999; font-size: 14px; margin-top: 12px; }
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #42b883;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}
@keyframes spin { to { transform: rotate(360deg); } }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>

<style>
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
  width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.loading-modal { text-align: center; color: #888; }
.modal h3 { margin: 0 0 12px; color: #42b883; }
.modal p { color: #666; margin-bottom: 16px; }
.modal button { padding: 6px 16px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
</style>
