import { h } from 'vue'

// render 函数也支持插槽
export default {
  render() {
    return h(
      'div',
      {
        style: {
          padding: '16px',
          border: '2px dashed #42b883',
          borderRadius: '8px',
        },
      },
      [
        h('p', { style: { color: '#888', marginBottom: '8px' } }, '下面是父组件传进来的插槽：'),
        // this.$slots.default() 就是父组件写在标签内部的内容
        this.$slots.default
          ? this.$slots.default()
          : h('span', { style: { color: '#ccc' } }, '（没有插槽内容）'),
      ]
    )
  },
}
