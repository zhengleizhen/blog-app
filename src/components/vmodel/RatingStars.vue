<template>
  <div class="rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ active: star <= modelValue }"
      @click="modelValue = star"
    >
      ★
    </span>
  </div>
</template>

<script setup>
// 评分组件 — v-model 绑定分数（1-5）
const modelValue = defineModel()
</script>

<style scoped>
.rating { display: flex; gap: 4px; }
.star {
  font-size: 32px;
  cursor: pointer;
  color: #ddd;
  transition: color 0.2s, transform 0.2s;
}
.star:hover { transform: scale(1.2); }
.star.active { color: #f39c12; }
</style>
