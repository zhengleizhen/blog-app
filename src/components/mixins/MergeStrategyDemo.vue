<template>
  <div class="merge-strategy">
    <p class="label">合并策略演示</p>
    <p>message（被组件覆盖）：<strong>{{ message }}</strong></p>
    <p>title（mixin 的，没被覆盖）：<strong>{{ title }}</strong></p>
    <p class="hint">组件自己的 data 优先级 > mixin 的 data</p>
  </div>
</template>

<script>
import mergeMixin from './mergeMixin.js'

export default {
  mixins: [mergeMixin],
  data() {
    return {
      message: '来自组件自己的消息（覆盖了 mixin）',
    }
  },
}
</script>

<style scoped>
.merge-strategy {
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
}
.label {
  font-weight: bold;
  color: #333;
  margin: 0 0 8px;
}
.hint {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}
</style>
