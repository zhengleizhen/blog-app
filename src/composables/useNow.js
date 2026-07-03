// 文件路径：src/composables/useNow.js
// 用途：实时时间，每秒更新

import { ref, onMounted, onUnmounted } from 'vue'

export function useNow() {
  const now = ref(new Date().toLocaleTimeString())
  let timer

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date().toLocaleTimeString()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return { now }
}
