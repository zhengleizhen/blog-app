<template>
  <input
    type="number"
    class="number-input"
    :value="modelValue"
    @input="modelValue = Number($event.target.value)"
  />
</template>

<script setup>
// .number 修饰符演示 — 返回数字类型
const modelValue = defineModel()
</script>

<style scoped>
.number-input {
  width: 100px;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}
.number-input:focus { outline: none; border-color: #42b883; }
</style>
