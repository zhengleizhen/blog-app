<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
  activeCategory: { type: String, required: true }
})

const emit = defineEmits(['update-category'])

function selectCategory(cat) {
    debugger
  emit('update-category', cat)
}
</script>

<template>
  <div class="category-filter">
    <span
      v-for="cat in categories"
      :key="cat"
      class="filter-item"
      :class="{ active: activeCategory === cat }"
      @click="selectCategory(cat)"
    >
      {{ cat }}
    </span>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.filter-item {
  padding: 6px 16px;
  font-size: 14px;
  color: #666;
  background: #f5f7fa;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.filter-item:hover {
  color: #42b883;
  background: #e8f5e9;
}

.filter-item.active {
  color: #fff;
  background: #42b883;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.3);
}
</style>
