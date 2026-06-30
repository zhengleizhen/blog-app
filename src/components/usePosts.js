import {ref, computed, onMounted} from 'vue'
export default function usePosts() {
  const articles = ref([])
  const isLoading = ref(true)
  const error = ref(null)
  const activeCategory = ref('全部')
  const keyword = ref('') //搜索关键词

  //读取所有文章所有文章
  async function fetchPosts(){
    isLoading.value = true;
    error.value = null;
    try {
        const res = await fetch('/posts.json')
        articles.value = await res.json()
    }catch(err){
        error.value = '加载文章失败'
    }finally{
        isLoading.value = false
    }
  }

  onMounted(()=>{
    fetchPosts();
  })

  function getArticleById(id){
    const art = articles.value.find(x=>x.id === parseInt(id))
    return art;
  }

  //切换分类
  function handleCategoryChange(cat){
    activeCategory.value = cat;
  }

  //获取所有分类
  const categories = computed(() => {
    const cats = articles.value.map(a => a.category)
    return ['全部', ...cats]
  })

  const filteredArticles = computed(()=>{
    let result = articles.value;
    //先根据选择的分类筛选
    if(activeCategory.value != '全部'){
      result = articles.value.filter(x=>x.category === activeCategory.value)
    }
    //根据关键词筛选
    let kw = keyword.value.trim().toLowerCase();
    if(kw){
      result = result.filter(x=>x.title.includes(kw) || x.summary.toLowerCase().includes(kw))
    }
    return result;
  })

  return{
    articles,
    isLoading,
    error,
    activeCategory,
    keyword,
    fetchPosts,
    getArticleById,
    handleCategoryChange,
    categories,
    filteredArticles
  }
}
