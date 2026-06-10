<script setup>
import { useFavoriteStore } from '../stores/useFavoriteStore.js'

const props = defineProps({
  id: Number,
  title: String,
  summary: String,
  date: String,
  category: String,
  cover: String
})

const favoriteStore = useFavoriteStore()

function handleFavorite(e) {
  e.preventDefault()
  e.stopPropagation()
  favoriteStore.toggleFavorite(props.id)
}
</script>

<template>
  <div class="card-wrapper">
    <RouterLink :to="{ name: 'post', params: { id: props.id } }" class="card-link">
      <div class="card">
        <img class="card-cover" :src="props.cover" :alt="props.title" />
        <div class="card-content">
          <span class="card-category">{{ props.category }}</span>
          <h3 class="card-title">{{ props.title }}</h3>
          <p class="card-summary">{{ props.summary }}</p>
          <span class="card-date">{{ props.date }}</span>
        </div>
      </div>
    </RouterLink>
    <button type="button" class="fav-btn" @click="handleFavorite">
      {{ favoriteStore.isFavorite(props.id) ? '♥' : '♡' }}
    </button>
  </div>
</template>
<style scoped>
.card-wrapper {
  position: relative;
}

.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(16, 40, 70, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(16, 40, 70, 0.12);
}

.card-cover {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

.card-content {
  padding: 18px 18px 22px;
}

.card-category {
  display: inline-flex;
  padding: 4px 12px;
  background: #f0fbf7;
  color: #2f9a70;
  border-radius: 999px;
  font-size: 12px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 20px;
  margin: 0 0 10px;
  color: #1f2937;
  line-height: 1.35;
}

.card-summary {
  font-size: 14px;
  color: #5b6770;
  line-height: 1.75;
  margin-bottom: 16px;
  min-height: 56px;
}

.card-date {
  display: inline-block;
  font-size: 12px;
  color: #94a3b8;
}

.fav-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(229, 62, 90, 0.2);
  background: #fff;
  color: #ef4567;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(16, 40, 70, 0.08);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.fav-btn:hover {
  transform: scale(1.05);
  background: #fff0f4;
  box-shadow: 0 16px 32px rgba(16, 40, 70, 0.12);
}
</style>