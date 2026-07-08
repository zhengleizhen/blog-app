<template>
  <button
    class="toggle"
    :class="{ active: modelValue }"
    @click="modelValue = !modelValue"
  >
    <span class="toggle-dot"></span>
  </button>
</template>

<script setup>
// 开关组件 — v-model 绑定布尔值
const modelValue = defineModel()
</script>

<style scoped>
.toggle {
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: #ccc;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  padding: 0;
}
.toggle.active { background: #42b883; }
.toggle-dot {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle.active .toggle-dot { transform: translateX(22px); }
</style>
