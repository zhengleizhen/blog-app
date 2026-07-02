import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import BlogLayout from '../views/BlogLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/article/:id', name: 'article', component: () => import('../views/ArticleDetail.vue') },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/reactive-demo', name: 'reactiveDemo', component: () => import('../views/ReactiveWatchDemo.vue') },
    { path: '/home-view', name: 'homeView', component: () => import('../views/HomeView.vue') },
    { path: '/emits-demo', name: 'emitsDemo', component: () => import('../views/EmitsDemo.vue') },
    { path: '/post/:id', name: 'post', component: () => import('../views/PostView.vue') },
    { path: '/slot-demo', name: 'slotDemo', component: () => import('../views/SlotDemo.vue') },
    { path: '/render-demo', name: 'renderDemo', component: () => import('../views/RenderDemo.vue') },
    { path: '/compiler-demo', name: 'compilerDemo', component: () => import('../views/CompilerDemo.vue') },
    { path: '/provide-demo', name: 'provideDemo', component: () => import('../views/ProvideDemo.vue') },
    { path: '/mixins-demo', name: 'mixinsDemo', component: () => import('../views/MixinsDemo.vue') },
    { path: '/extends-demo', name: 'extendsDemo', component: () => import('../views/ExtendsDemo.vue') },
    { path: '/inherit-attrs-demo', name: 'inheritAttrsDemo', component: () => import('../views/InheritAttrsDemo.vue') },
    { path: '/components-demo', name: 'componentsDemo', component: () => import('../views/ComponentsDemo.vue') },
    { path: '/directives-demo', name: 'directivesDemo', component: () => import('../views/DirectivesDemo.vue') },
    { path: '/transition-demo', name: 'transitionDemo', component: () => import('../views/TransitionDemo.vue') },
    { path: '/teleport-demo', name: 'teleportDemo', component: () => import('../views/TeleportDemo.vue') },
    { path: '/expose-demo', name: 'exposeDemo', component: () => import('../views/ExposeDemo.vue') },
    { path: '/async-demo', name: 'asyncDemo', component: () => import('../views/AsyncDemo.vue') },
    { path: '/lifecycle-demo', name: 'lifecycleDemo', component: () => import('../views/LifecycleDemo.vue') },
    { path: '/shallow-demo', name: 'shallowDemo', component: () => import('../views/ShallowDemo.vue') },
    { path: '/toref-demo', name: 'torefDemo', component: () => import('../views/ToRefDemo.vue') },

    // 子路由（嵌套路由 + 传参示例）
    {
      path: '/blog',
      component: BlogLayout,     // 父组件：有导航 + <router-view>
      children: [
        { path: '', redirect: '/blog/list' },   // 访问 /blog 时默认跳到 /blog/list
        { path: 'list', name: 'blogList', component: () => import('../views/BlogList.vue') },
        { path: 'create', name: 'blogCreate', component: () => import('../views/BlogCreate.vue') },
        { path: 'drafts', name: 'blogDrafts', component: () => import('../views/BlogDrafts.vue') },

        // ① 路由参数（动态路径）：/blog/edit/123
        { path: 'edit/:id?', name: 'blogEdit', component: () => import('../views/BlogEdit.vue') },
        // ② 两个路由参数：/blog/edit/789/draft  （:id 和 :type）
        { path: 'edit/:id/:type', name: 'blogEditTwoParams', component: () => import('../views/BlogEdit.vue') },
        // ③ 可选参数：/blog/view/456 或 /blog/view
        { path: 'view/:id?', name: 'blogView', component: () => import('../views/BlogEdit.vue') },

        // ④ props 传参（boolean 模式）：路由参数自动变成组件 props
        { 
          path: 'detail/:id/:category', 
          name: 'blogDetail', 
          component: () => import('../views/BlogDetail.vue'), 
          props: true 
        },
        // ⑤ props 传参（function 模式）：自定义映射
        { 
          path: 'detail-fn/:id', 
          name: 'blogDetailFn', 
          component: () => import('../views/BlogDetail.vue'),
          props: (route) => ({ id: route.params.id, category: '自定义分类' }) 
        },
      ]
    },
  ],
})

export default router
