<template>
  <div class="component-b">
    <p class="label">组件 B</p>
    <p>计数：{{ count }}</p>
    <p class="hint">组件 B 也用了同一个 mixin，但 count 是独立的</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import useCounterMixin from './useCounterMixin.js'

export default {
  mixins: [useCounterMixin],
}
</script>

<style scoped>
.component-b {
  padding: 12px;
  background: #fef9f9;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 8px;
}
.hint {
  font-size: 12px;
  color: #999;
}
button {
  padding: 4px 12px;
  margin-right: 8px;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
</style>
