// 自定义指令：v-highlight
// 给元素添加黄色高亮背景
export default {
  mounted: (el) => {
    el.style.background = '#fff3cd'
    el.style.padding = '4px 8px'
    el.style.borderRadius = '4px'
  },
  updated: (el) => {
    // 更新时保持样式
    el.style.background = '#fff3cd'
  },
}
