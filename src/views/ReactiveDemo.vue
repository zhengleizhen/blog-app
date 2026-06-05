<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ==================== 1. ref: 基本数据类型 ====================
const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

// ==================== 2. reactive: 对象类型 ====================
const user = reactive({
  name: '张三',
  age: 25,
  city: '北京',
  gender:'男'
})

function updateAge() {
  user.age += 1
}

// ==================== 3. computed: 计算属性 ====================
const doubleCount = computed(() => count.value * 2)
const userInfo = computed(() => `${user.name}，${user.age}岁，来自${user.city}`)

// ==================== 4. watch: 监听数据变化 ====================
const log = ref('')

watch(count, (newVal, oldVal) => {
  log.value = `count 从 ${oldVal} 变成了 ${newVal}`
})

watch(() => user.name, (newVal,oldVal) => {
  log.value = `${oldVal} 用户名改成了：${newVal}`
})

// ==================== 5. 表单双向绑定 ====================
const newName = ref('')

function changeName() {
  if (newName.value) {
    user.name = newName.value
    newName.value = ''
  }
}
</script>

<template>
  <div class="reactive-demo">
    <h1 class="page-title">Vue3 响应式 API 示例</h1>

    <!-- ref 示例 -->
    <div class="demo-card">
      <h2>1. ref — 基础计数</h2>
      <p class="desc">用于数字、字符串等基本类型</p>
      <div class="counter">
        <button class="btn" @click="decrement">-</button>
        <span class="count-num">{{ count }}</span>
        <button class="btn" @click="increment">+</button>
      </div>
    </div>

    <!-- reactive 示例 -->
    <div class="demo-card">
      <h2>2. reactive — 响应式对象</h2>
      <p class="desc">用于复杂对象数据</p>
      <div class="info-box">
        <p>姓名：<input v-model="user.name" class="input" /></p>
        <p>年龄：{{ user.age }}</p>
        <p>城市：{{ user.city }}</p>
        <p>性别: {{ user.gender }}</p>
      </div>
      <button class="btn btn-small" @click="updateAge">年龄 +1</button>
    </div>

    <!-- computed 示例 -->
    <div class="demo-card">
      <h2>3. computed — 计算属性</h2>
      <p class="desc">依赖其他响应式数据，自动更新</p>
      <div class="info-box">
        <p>count × 2 = <strong>{{ doubleCount }}</strong></p>
        <p>用户信息：<strong>{{ userInfo }}</strong></p>
      </div>
    </div>

    <!-- watch 示例 -->
    <div class="demo-card">
      <h2>4. watch — 数据监听</h2>
      <p class="desc">监听数据变化并执行回调</p>
      <div class="log-box">
        <p v-if="log">{{ log }}</p>
        <p v-else class="empty-tip">修改 count 或用户名，这里会显示变化</p>
      </div>
    </div>

    <!-- v-model 示例 -->
    <div class="demo-card">
      <h2>5. v-model — 双向绑定</h2>
      <p class="desc">输入框与数据同步更新</p>
      <div class="form-row">
        <input v-model="newName" class="input" placeholder="输入新名字..." />
        <button class="btn" @click="changeName">修改名字</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reactive-demo {
  max-width: 720px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-title {
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.demo-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.demo-card h2 {
  font-size: 18px;
  color: #42b883;
  margin-bottom: 6px;
}

.demo-card .desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

/* 计数器样式 */
.counter {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
}

.count-num {
  font-size: 48px;
  font-weight: bold;
  color: #222;
  min-width: 80px;
  text-align: center;
}

.btn {
  background: #42b883;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.85;
}

.btn-small {
  padding: 4px 12px;
  font-size: 13px;
  margin-top: 12px;
}

/* 信息框 */
.info-box {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  font-size: 15px;
  color: #333;
  line-height: 2;
}

.info-box strong {
  color: #42b883;
}

.input {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #42b883;
}

/* 日志 */
.log-box {
  background: #282c34;
  color: #98c379;
  border-radius: 8px;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
  min-height: 24px;
}

.empty-tip {
  color: #666;
  font-style: italic;
}

/* 表单行 */
.form-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.form-row .input {
  flex: 1;
}
</style>
