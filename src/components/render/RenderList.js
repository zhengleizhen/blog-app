import { h } from 'vue'

// 用 render 函数 + JS 的 map 渲染列表
export default {
  data() {
    return {
      fruits: ['🍎 苹果', '🍌 香蕉', '🍇 葡萄', ' 橙子'],
    }
  },
  render() {
    // 用 map 把数组变成一堆 h('li', ...)
    const items = this.fruits.map((fruit, i) =>
      h('li', { key: i, style: { padding: '8px 0', borderBottom: '1px solid #eee' } }, fruit)
    )

    return h('ul', { style: { listStyle: 'none', padding: 0 } }, items)
  },
}
