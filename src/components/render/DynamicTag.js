import { h } from 'vue'

// 根据 level prop 动态决定渲染成 h1 ~ h6
export default {
  props: {
    level: { type: Number, default: 1 },
    text: { type: String, default: '' },
  },
  render() {
    // 根据 level 选标签名
    const tag = `h${this.level}`
    return h(tag, { style: { color: '#2f6f53' } }, this.text)
  },
}
