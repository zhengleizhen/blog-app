<template>
  <input
    class="upper-input"
    :value="modelValue"
    @input="modelValue = $event.target.value.toUpperCase()"
    placeholder="输入自动变大写"
  />
</template>

<script setup>
// 自定义修饰符 .upper 演示
// defineModel() 返回的第二个参数就是修饰符对象
const [modelValue, modifiers] = defineModel()
console.log('修饰符：', modifiers)  // { upper: true }
</script>

<style scoped>
.upper-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  text-transform: uppercase;
}
.upper-input:focus { outline: none; border-color: #42b883; }
</style>
