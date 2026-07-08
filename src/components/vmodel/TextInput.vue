<template>
  <input
    class="text-input"
    :value="modelValue"
    @input="modelValue = $event.target.value.trim()"
    placeholder="输入两端空格会被自动去掉"
  />
</template>

<script setup>
// .trim 修饰符演示 — 自动去空格
const modelValue = defineModel()
</script>

<style scoped>
.text-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}
.text-input:focus { outline: none; border-color: #42b883; }
</style>
