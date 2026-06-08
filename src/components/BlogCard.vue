<script setup>
defineProps({
  title: String,
  summary: String,
  date: String,
  category: String,
  cover: String
})
</script>

<template>
  <div class="card">
    <img :src="cover" :alt="title" class="card-cover">
    <div class="card-content">
      <span class="card-category">{{ category }}</span>
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-summary">{{ summary }}</p>
      <span class="card-date">{{ date }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-category {
  display: inline-block;
  padding: 2px 10px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #222;
}

.card-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 12px;
}

.card-date {
  font-size: 12px;
  color: #999;
}
</style>
