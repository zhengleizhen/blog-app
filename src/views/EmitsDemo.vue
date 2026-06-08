<script setup>
import { ref } from 'vue'
import ColorPicker from '../components/ColorPicker.vue'

const selectedColor = ref(null)
const history = ref([])

// 接收子组件传来的数据
function handleColorChange(color) {
  selectedColor.value = color.value
  history.value.unshift(`${color.name} (${color.value})`)
}
</script>

<template>
  <div class="emits-demo">
    <h1 class="page-title">子传父示例：颜色选择器</h1>

    <!-- 子组件：点击按钮后触发 color-change 事件 -->
    <ColorPicker @color-change="handleColorChange" />

    <!-- 父组件显示子组件传过来的数据 -->
    <div class="result-box" :style="{ borderColor: selectedColor || '#ddd' }">
      <p>当前选中的颜色：</p>
      <div v-if="selectedColor" class="color-preview">
        <span
          class="color-dot"
          :style="{ backgroundColor: selectedColor }"
        ></span>
        <span class="color-value">{{ selectedColor }}</span>
      </div>
      <p v-else class="placeholder">点击上方按钮选择颜色</p>
    </div>

    <!-- 历史记录 -->
    <div v-if="history.length" class="history-box">
      <h3>选择历史</h3>
      <ul class="history-list">
        <li v-for="(item, index) in history" :key="index">
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.emits-demo {
  max-width: 640px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.result-box {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid #ddd;
  margin-bottom: 20px;
  text-align: center;
  transition: border-color 0.3s;
}

.result-box p {
  font-size: 15px;
  color: #666;
  margin-bottom: 12px;
}

.color-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.color-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.color-value {
  font-size: 20px;
  font-weight: bold;
  font-family: monospace;
}

.placeholder {
  color: #999;
  font-style: italic;
}

.history-box {
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.history-box h3 {
  font-size: 16px;
  color: #42b883;
  margin-bottom: 12px;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  padding: 6px 0;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  font-family: monospace;
}

.history-list li:last-child {
  border-bottom: none;
}
</style>
