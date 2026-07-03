// 文件路径：src/composables/useFetch.js
// 用途：封装网络请求，返回 data / loading / error

import { ref, watch } from 'vue'

export function useFetch(urlRef) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchData(url) {
    if (!url) return
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
      data.value = null
    } finally {
      loading.value = false
    }
  }

  // url 变了就自动请求
  watch(urlRef, (url) => fetchData(url), { immediate: true })

  return { data, loading, error }
}
