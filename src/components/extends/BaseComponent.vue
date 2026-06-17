<!-- 基础组件：提供公共的 data 和 methods -->
<template>
  <div class="base">
    <p class="label">BaseComponent（基类）</p>
    <p>计数：{{ count }}</p>
    <p>消息：{{ message }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      message: '来自基类的消息',
    }
  },
  methods: {
    increment() {
      this.count++
    },
  },
  mounted() {
    console.log('BaseComponent mounted')
  },
}
</script>

<style scoped>
.base {
  padding: 12px;
  background: #f0f4ff;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #2f5d9a;
  margin: 0 0 8px;
}
button {
  padding: 4px 12px;
  border: 1px solid #2f5d9a;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
</style>
