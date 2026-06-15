<template>
  <div class="card">
    <div class="card-header">
      <!-- 具名插槽：标题位置 -->
      <slot name="header">默认标题</slot>
    </div>

    <div class="card-body">
      <!-- 默认插槽：主体内容 -->
      <slot></slot>
    </div>

    <div class="card-footer">
      <!-- 具名插槽：底部位置 -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
// 这是一个可复用的卡片组件，支持三种插槽：
// - header：顶部标题区域（有默认值）
// - 默认：中间内容区域
// - footer：底部操作区域
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-header {
  background: #f7fbf8;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  color: #2f6f53;
}

.card-body {
  padding: 20px;
  line-height: 1.7;
}

.card-footer {
  padding: 12px 20px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
  text-align: right;
}
</style>
