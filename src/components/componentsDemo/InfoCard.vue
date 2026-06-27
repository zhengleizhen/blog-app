<template>
  <div class="info-card">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '信息卡片' },
  content: { type: String, default: '这是一段描述信息' },
})
</script>

<style scoped>
.info-card {
  padding: 16px;
  background: #f7fbf8;
  border: 1px solid #d8f0e1;
  border-radius: 8px;
}
.info-card h3 {
  margin: 0 0 8px;
  color: #2f6f53;
}
.info-card p {
  margin: 0;
  color: #4a5568;
}
</style>
