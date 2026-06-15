import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/article/:id', name: 'article', component: () => import('../views/ArticleDetail.vue') },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/reactive-demo', name: 'reactiveDemo', component: () => import('../views/ReactiveDemo.vue') },
    { path: '/home-view', name: 'homeView', component: () => import('../views/HomeView.vue') },
    { path: '/emits-demo', name: 'emitsDemo', component: () => import('../views/EmitsDemo.vue') },
    { path: '/post/:id', name: 'post', component: () => import('../views/PostView.vue') },
    { path: '/slot-demo', name: 'slotDemo', component: () => import('../views/SlotDemo.vue') },
    { path: '/render-demo', name: 'renderDemo', component: () => import('../views/RenderDemo.vue') },
    { path: '/compiler-demo', name: 'compilerDemo', component: () => import('../views/CompilerDemo.vue') },
    { path: '/provide-demo', name: 'provideDemo', component: () => import('../views/ProvideDemo.vue') },
  ],
})

export default router
