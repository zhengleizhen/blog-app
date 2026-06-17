<!-- 继承 BaseComponent，扩展新功能 -->
<template>
  <div class="extended">
    <p class="label">ExtendedComponent（继承基类）</p>
    <p>计数：{{ count }}</p>
    <p>消息：{{ message }}</p>
    <p>额外字段：{{ extra }}</p>
    <button @click="increment">+1（继承的）</button>
    <button @click="decrement">-1（自己的）</button>
  </div>
</template>

<script>
import BaseComponent from './BaseComponent.vue'

export default {
  // 继承 BaseComponent 的所有选项
  extends: BaseComponent,
  data() {
    return {
      extra: '我是扩展组件新增的字段',
      // message 会被覆盖，count 会合并
      message: '来自扩展组件的消息（覆盖了基类）',
    }
  },
  methods: {
    // 新增一个方法
    decrement() {
      this.count--
    },
  },
  mounted() {
    console.log('ExtendedComponent mounted, count =', this.count)
    // 调用基类的 mounted 后执行自己的逻辑
  },
}
</script>

<style scoped>
.extended {
  padding: 12px;
  background: #fef9f9;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 8px;
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
