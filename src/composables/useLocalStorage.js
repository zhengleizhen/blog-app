// 文件路径：src/composables/useLocalStorage.js
// 用途：响应式数据 + localStorage 自动持久化

import { ref, watch } from 'vue'

export function useLocalStorage(key, initialValue) {
  // 先从 localStorage 读取，没有就用默认值
  const stored = localStorage.getItem(key)
  const value = ref(stored ? JSON.parse(stored) : initialValue)

  // value 变了就自动存到 localStorage
  watch(value, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  return value
}
