import {ref, computed, onMounted} from 'vue'

export default function usePosts() {
  const articles = ref([])
  const isLoading = ref(true)
  const error = ref(null)
  const activeCategory = ref('全部')
  const keyword = ref('')       // 搜索关键词

  //读取文章所有数据
  async function fetchPosts(){
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/posts.json')
      articles.value = await res.json()
    }catch(err){
      error.value = '加载文章失败'
    }finally{
      isLoading.value = false
    }
  }

  function getArticleById(id){
    const x1 = articles.value.find(a => a.id === parseInt(id))
    console.log('找到的文章：', x1)
    return x1
  }

  // 切换分类
  function handleCategoryChange(cat) {
    activeCategory.value = cat
  }

  //获取所有分类
  const categories = computed(() => {
    const cats = articles.value.map(a => a.category)
    return ['全部', ...cats]
  })

  const filteredArticles = computed(() => {
    let result = articles.value;
    //根据分类筛选
    if (activeCategory.value !== '全部')
      result = articles.value.filter(a => a.category === activeCategory.value)
    //根据关键词筛选
    if (keyword.value.trim()) {
        const kw = keyword.value.trim().toLowerCase();  
        result = result.filter(a => 
          a.title.toLowerCase().includes(kw) || 
          a.summary.toLowerCase().includes(kw)
        )
    }
    return result
  })

  onMounted(()=>{
    fetchPosts();
  })

  return {
    articles ,
    getArticleById,
    isLoading,
    error,
    activeCategory,
    keyword,
    categories,
    filteredArticles,
    handleCategoryChange,
    fetchPosts
  }
}