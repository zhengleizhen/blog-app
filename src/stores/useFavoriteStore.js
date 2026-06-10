import {defineStore} from 'pinia'
import {ref,computed } from 'vue'

export const useFavoriteStore = defineStore('favorite',()=>{
    const favoriteIds = ref([])

    let saved = null
    try {
        saved = localStorage.getItem('blog-favorites')
        if (saved) {
            favoriteIds.value = JSON.parse(saved)
        }
    } catch (err) {
        console.warn('读取收藏存储失败：', err)
        favoriteIds.value = []
    }

    const favoriteCount = computed(() => {
        return favoriteIds.value.length
    })

    function isFavorite(id){
        const x1 = favoriteIds.value.includes(id)
        return x1;
    }

    function toggleFavorite(articleId) {
    const index = favoriteIds.value.indexOf(articleId)
    if (index === -1) {
      favoriteIds.value.push(articleId)     // 添加收藏
    } else {
      favoriteIds.value.splice(index, 1)    // 取消收藏
    }
    // 同步到 localStorage（持久化保存）
    localStorage.setItem('blog-favorites', JSON.stringify(favoriteIds.value))
  }


    return {
        favoriteIds,
        favoriteCount,
        isFavorite,
        toggleFavorite
    }
})