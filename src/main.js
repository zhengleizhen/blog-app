import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App,{
    compilerOptions: {
        //comment: true, // 关闭注释
        //whitespace: 'preserve', // 保留空格
        nodeTransforms: [
        (node) => {
        if (node.tag === 'img' && !node.props.find(p => p.name === 'loading')) {
            node.props.push({ name: 'loading', value: 'lazy' })
        }
    }
  ]
    }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
