<template>
  <input
    class="my-input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="modelValue = $event.target.value"
  />
</template>

<script setup>
// 最简单的 v-model 子组件
const modelValue = defineModel()
defineProps({ placeholder: String })
</script>

<style scoped>
.my-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}
.my-input:focus {
  outline: none;
  border-color: #42b883;
}
</style>
