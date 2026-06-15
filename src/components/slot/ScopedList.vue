<template>
  <div class="scoped-list">
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        <!-- 作用域插槽：把 item 和 index 传给父组件 -->
        <slot name="item" :item="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 子组件持有数据，通过插槽属性传给父组件
// 父组件决定怎么渲染每条数据
const items = [
  { id: 1, name: '张三', status: 'active' },
  { id: 2, name: '李四', status: 'disabled' },
  { id: 3, name: '王五', status: 'active' },
]
</script>

<style scoped>
.scoped-list ul {
  list-style: none;
  padding: 0;
}

.scoped-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
</style>
