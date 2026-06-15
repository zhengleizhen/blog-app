import { h } from 'vue'

// 最简单的 render 函数
// h(tag, props, children) 就是创建一个虚拟 DOM 节点
export default {
  render() {
    return h('div', { style: { padding: '16px', background: '#f0fbf7', borderRadius: '8px' } }, [
      h('p', null, '👋 我是用 render() 函数渲染的'),
      h('p', null, '没有写 <template>，纯 JS 返回结构'),
    ])
  },
}
