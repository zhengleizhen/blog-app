<script setup>
// 子组件：ColorPicker.vue
// 通过 emit 向父组件发送事件
const emit = defineEmits(['color-change'])

const colors = [
  { name: '红', value: '#e74c3c' },
  { name: '蓝', value: '#3498db' },
  { name: '绿', value: '#2ecc71' },
  { name: '橙', value: '#f39c12' },
  { name: '紫', value: '#9b59b6' }
]

function selectColor(color) {
  // 子组件触发事件，把颜色值传给父组件
  emit('color-change', color)
}
</script>

<template>
  <div class="color-picker">
    <p class="picker-label">选择一个颜色：</p>
    <div class="color-buttons">
      <button
        v-for="color in colors"
        :key="color.name"
        class="color-btn"
        :style="{ backgroundColor: color.value }"
        @click="selectColor(color)"
      >
        {{ color.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.picker-label {
  font-size: 15px;
  color: #666;
  margin-bottom: 12px;
}

.color-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-btn {
  width: 60px;
  height: 60px;
  border: 3px solid #fff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.color-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
</style>
