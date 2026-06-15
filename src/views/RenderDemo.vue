<template>
  <div class="render-demo">
    <h1>render() 函数学习示例</h1>

    <!-- 1. 最简单的 render 函数 -->
    <h2>1. 最简单的 render</h2>
    <p class="desc">不用模板，直接用 JS 返回虚拟 DOM</p>
    <SimpleRender />

    <!-- 2. 用 render 实现动态标题 -->
    <h2>2. 动态标签组件</h2>
    <p class="desc">根据 prop 决定渲染成 h1~h6 哪个标签</p>
    <DynamicTag :level="3" text="这是三级标题" />

    <!-- 3. 用 render 实现带样式的按钮 -->
    <h2>3. 渲染带样式的按钮</h2>
    <p class="desc">render 函数里可以写完整的事件和样式逻辑</p>
    <RenderButton type="primary" @click="handleClick">
      主按钮
    </RenderButton>
    <RenderButton type="danger">
      危险按钮
    </RenderButton>

    <!-- 4. render 渲染列表 -->
    <h2>4. render 渲染列表</h2>
    <p class="desc">用 JS 的 map() 生成列表项</p>
    <RenderList />

    <!-- 5. render 接收插槽 -->
    <h2>5. render 也支持插槽</h2>
    <p class="desc">render 函数可以通过 ctx.slots 访问父组件传入的内容</p>
    <RenderWithSlot>
      <span style="color: #42b883; font-weight: bold;">我是父组件传进来的插槽内容</span>
    </RenderWithSlot>
  </div>
</template>

<script setup>
import { h } from 'vue'
import SimpleRender from '../components/render/SimpleRender.js'
import DynamicTag from '../components/render/DynamicTag.js'
import RenderButton from '../components/render/RenderButton.js'
import RenderList from '../components/render/RenderList.js'
import RenderWithSlot from '../components/render/RenderWithSlot.js'

function handleClick() {
  alert('你点了主按钮！')
}
</script>

<style scoped>
.render-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
</style>
