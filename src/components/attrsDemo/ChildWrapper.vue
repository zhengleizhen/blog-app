<template>
  <div class="child-wrapper">
    <h4>子组件收到的 attrs：</h4>
    <pre>{{ attrs }}</pre>
    <button @click="handleClick" class="emit-btn" style="margin-right: 10px;">点击触发 custom-event</button>
    <button @click="testClick" class="emit-btn">点击触发 test-event</button>
    <p class="tip">点击按钮会触发父组件的 @custom-event</p>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
const emit = defineEmits(['custom-event', 'test-event'])

function handleClick() {
  emit('custom-event', { msg: '子组件发的数据', time: new Date().toLocaleTimeString() })
}
function testClick() {
  emit('test-event', { msg: '子组件发的 test-event', time: new Date().toLocaleTimeString() })
}
</script>

<style scoped>
.child-wrapper { padding: 16px; background: #f0fbf7; border-radius: 8px; }
.child-wrapper h4 { margin: 0 0 8px; color: #42b883; }
pre { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px; }
.tip { color: #888; font-size: 13px; margin-top: 8px; }
.emit-btn { padding: 8px 16px; background: #42b883; color: #fff; border: none; border-radius: 6px; cursor: pointer; margin-top: 12px; }
.emit-btn:hover { background: #3aa876; }
</style>
