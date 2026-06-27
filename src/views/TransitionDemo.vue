<template>
  <div class="transition-demo">
    <h1>Vue 3 动画效果</h1>
    <p class="desc">用 <code>&lt;Transition&gt;</code> 和 <code>&lt;TransitionGroup&gt;</code> 实现过渡动画</p>

    <!-- 1. 基本过渡：淡入淡出 -->
    <h2>1. 基本过渡：淡入淡出</h2>
    <p class="desc">点击按钮切换，元素自动淡入淡出</p>
    <div class="demo-box">
      <button @click="showFade = !showFade">切换</button>
      <Transition name="fade">
        <div v-if="showFade" class="box">我会淡入淡出</div>
      </Transition>
    </div>

    <!-- 2. 滑入滑出 -->
    <h2>2. 滑入滑出</h2>
    <p class="desc">从左边滑入，右边滑出</p>
    <div class="demo-box">
      <button @click="showSlide = !showSlide">切换</button>
      <Transition name="slide">
        <div v-if="showSlide" class="box">我会滑入滑出</div>
      </Transition>
    </div>

    <!-- 3. 缩放效果 -->
    <h2>3. 缩放效果</h2>
    <p class="desc">从小变大出现，从大变小消失</p>
    <div class="demo-box">
      <button @click="showScale = !showScale">切换</button>
      <Transition name="scale">
        <div v-if="showScale" class="box">我会缩放</div>
      </Transition>
    </div>

    <!-- 4. 列表过渡 -->
    <h2>4. 列表过渡（TransitionGroup）</h2>
    <p class="desc">列表项增删时有动画效果</p>
    <div class="demo-box">
      <button @click="addItem">添加</button>
      <button @click="removeItem">删除</button>
      <TransitionGroup name="list" tag="ul" class="list">
        <li v-for="item in items" :key="item" class="list-item">
          {{ item }}
        </li>
      </TransitionGroup>
    </div>

    <!-- 5. 切换组件动画 -->
    <h2>5. 切换组件动画</h2>
    <p class="desc">两个组件之间切换，带过渡效果</p>
    <div class="demo-box">
      <button @click="showComponentA = !showComponentA">切换组件</button>
      <Transition name="component-fade" mode="out-in">
        <ComponentA v-if="showComponentA" key="a" />
        <ComponentB v-else key="b" />
      </Transition>
    </div>

    <!-- 6. CSS 动画库 -->
    <h2>6. 使用 Animate.css</h2>
    <p class="desc">用第三方动画库，效果更丰富</p>
    <div class="demo-box">
      <button @click="showAnimate = !showAnimate">切换</button>
      <Transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <div v-if="showAnimate" class="box">弹跳效果</div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from '../components/transition/ComponentA.vue'
import ComponentB from '../components/transition/ComponentB.vue'

const showFade = ref(true)
const showSlide = ref(true)
const showScale = ref(true)
const showComponentA = ref(true)
const showAnimate = ref(true)

const items = ref([1, 2, 3])
let nextId = 4

function addItem() {
  items.value.push(nextId++)
}

function removeItem() {
  items.value.pop()
}
</script>

<style scoped>
.transition-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.desc code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #e83e8c;
}
.demo-box {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}
.box {
  padding: 16px;
  background: #f0fbf7;
  border: 1px solid #42b883;
  border-radius: 8px;
  margin-top: 12px;
}
button {
  padding: 6px 16px;
  margin-right: 8px;
  border: 1px solid #42b883;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}

/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滑入滑出 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 缩放 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

/* 列表 */
.list {
  list-style: none;
  padding: 0;
}
.list-item {
  padding: 8px;
  margin: 4px 0;
  background: #f7fbf8;
  border-radius: 6px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.3s ease;
}

/* 组件切换 */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
