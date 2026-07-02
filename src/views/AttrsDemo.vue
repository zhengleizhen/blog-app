<template>
  <div class="attrs-demo">
    <h1>useAttrs</h1>
    <p class="desc">获取父组件传来的所有属性和事件</p>

    <!-- 1. 基础演示 -->
    <h2>1. 基础演示</h2>
    <p class="desc">父组件传了一堆属性，子组件用 useAttrs 全部接收</p>
    <div class="demo-box">
      <ChildWrapper
        class="custom-class"
        id="my-id"
        data-test="123"
        @custom-event="handleEvent"
        @test-event="handleTestEvent"
        placeholder="输入框提示"
      />
      <p v-if="eventData" class="event-result">收到事件：{{ eventData }}</p>
    </div>

    <!-- 2. 实际场景：封装 Input 组件 -->
    <h2>2. 实际场景：封装 Input 组件</h2>
    <p class="desc">把原生 input 的属性透传给子组件</p>
    <div class="demo-box">
      <CustomInput
        type="text"
        placeholder="请输入用户名"
        maxlength="20"
        @input="handleInput"
      />
      <p>输入值：{{ inputValue }}</p>
    </div>

    <!-- 代码对照 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// 子组件
import { useAttrs } from 'vue'

const attrs = useAttrs()
// attrs = { class: 'xxx', id: 'yyy', placeholder: 'zzz', ... }

// 模板中透传
&lt;input v-bind="attrs" /&gt;</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildWrapper from '../components/attrsDemo/ChildWrapper.vue'
import CustomInput from '../components/attrsDemo/CustomInput.vue'

const inputValue = ref('')
const eventData = ref(null)

function handleEvent(e) {
  eventData.value = e.msg +'，触发时间：'+ e.time
}

function handleTestEvent(e) {
  alert('收到 test-event 事件，数据：' + JSON.stringify(e))
}

function handleInput(e) {
  inputValue.value = e.target.value
}
</script>

<style scoped>
.attrs-demo { max-width: 600px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.event-result { margin-top: 12px; padding: 8px 12px; background: #fff3cd; border-radius: 6px; font-size: 14px; color: #856404; }
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
