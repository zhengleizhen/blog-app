// 公共 mixin：提供计数功能
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
  mounted() {
    console.log('counter mixin mounted, count =', this.count)
  },
}
