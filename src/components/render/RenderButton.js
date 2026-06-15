import { h } from 'vue'

// 用 render 函数渲染按钮，支持不同样式和点击事件
export default {
  props: {
    type: { type: String, default: 'primary' },
  },
  emits: ['click'],
  render() {
    const colors = {
      primary: { bg: '#42b883', color: '#fff' },
      danger:  { bg: '#e74c3c', color: '#fff' },
    }
    const style = colors[this.type] || colors.primary

    return h(
      'button',
      {
        style: {
          padding: '8px 20px',
          border: 'none',
          borderRadius: '6px',
          background: style.bg,
          color: style.color,
          cursor: 'pointer',
          marginRight: '8px',
        },
        onClick: () => this.$emit('click'),
      },
      this.$slots.default ? this.$slots.default() : '按钮'
    )
  },
}
