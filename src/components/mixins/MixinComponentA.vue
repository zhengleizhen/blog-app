<template>
  <div class="component-a">
    <p class="label">组件 A</p>
    <p>计数：{{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
import useCounterMixin from './useCounterMixin.js'

export default {
  mixins: [useCounterMixin],
  mounted() {
    console.log('组件 A mounted，count =', this.count)  // 
  }
}
</script>

<style scoped>
.component-a {
  padding: 12px;
  background: #f0fbf7;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #42b883;
  margin: 0 0 8px;
}
button {
  padding: 4px 12px;
  margin-right: 8px;
  border: 1px solid #42b883;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
</style>
