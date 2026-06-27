import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'animate.css'

import App from './App.vue'
import router from './router'
import GlobalCounter from './components/componentsDemo/GlobalCounter.vue'
import vHighlight from './directives/highlight.js'

const app = createApp(App)

// 全局注册组件
app.component('GlobalCounter', GlobalCounter)

// 全局注册指令
app.directive('highlight', vHighlight)

app.use(createPinia())
app.use(router)

app.mount('#app')
