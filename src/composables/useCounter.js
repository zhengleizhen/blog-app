// 文件路径：src/composables/useCounter.js
// 用途：封装计数器逻辑

import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initial
  }

  return { count, increment, decrement, reset }
}
