<template>
  <div class="computed-demo">
    <h1>computed 计算属性</h1>
    <p class="desc">基于响应式数据自动计算新值，依赖变了就重新算</p>

    <!-- 1. 基础用法 -->
    <h2>1. 基础用法：fullName</h2>
    <p class="desc">firstName 或 lastName 变了，fullName 自动重新计算</p>
    <div class="demo-box">
      <div class="form-row">
        <label>姓：</label>
        <input v-model="firstName" placeholder="请输入姓" />
      </div>
      <div class="form-row">
        <label>名：</label>
        <input v-model="lastName" placeholder="请输入名" />
      </div>
      <p class="result">全名：<strong>{{ fullName }}</strong></p>
      <p class="result">计算次数：{{ calcCount }} 次</p>
    </div>

    <!-- 2. computed vs 函数 -->
    <h2>2. computed vs 普通函数</h2>
    <p class="desc">computed 有缓存，依赖不变就不会重新算；函数每次调用都执行</p>
    <div class="demo-box">
      <div class="compare">
        <div class="panel">
          <h4>computed（有缓存）</h4>
          <p>反转结果：<strong>{{ reversedByComputed }}</strong></p>
          <p>调用次数：{{ computedCalls }}</p>
        </div>
        <div class="panel">
          <h4>函数（无缓存）</h4>
          <p>反转结果：<strong>{{ reversedByFn() }}</strong></p>
          <p>调用次数：{{ fnCalls }}</p>
        </div>
      </div>
      <button @click="counter++">计数器 +1（触发重新渲染）</button>
      <p>当前计数：{{ counter }}</p>
      <p class="tip">点按钮触发页面重新渲染，观察两边调用次数差异</p>
    </div>

    <!-- 3. computed 是可写的 -->
    <h2>3. 可写的 computed</h2>
    <p class="desc">computed 不仅能读，还能写（提供 get 和 set）</p>
    <div class="demo-box">
      <p>全名输入：<input v-model="fullWritableName" placeholder="输入全名，自动拆分" /></p>
      <p class="result">
        姓：<strong>{{ writableFirst }}</strong>
        名：<strong>{{ writableLast }}</strong>
      </p>
      <p class="tip">在输入框输入 "张 三"，会自动拆分到姓和名</p>
    </div>

    <!-- 4. 实际场景：购物车 -->
    <h2>4. 实际场景：购物车计算</h2>
    <p class="desc">用 computed 计算总价、数量、折扣</p>
    <div class="demo-box">
      <table class="cart-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.name">
            <td>{{ item.name }}</td>
            <td>¥{{ item.price }}</td>
            <td>
              <button @click="item.quantity = Math.max(1, item.quantity - 1)">−</button>
              <span class="qty">{{ item.quantity }}</span>
              <button @click="item.quantity++">+</button>
            </td>
            <td>¥{{ (item.price * item.quantity).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="cart-summary">
        <p>商品总数：<strong>{{ totalItems }}</strong> 件</p>
        <p>原价总计：<s>¥{{ totalPrice.toFixed(2) }}</s></p>
        <p>折扣后：<strong class="discount">¥{{ discountedPrice.toFixed(2) }}</strong></p>
        <span class="badge" v-if="totalItems >= 5">🎉 满 5 件享 9 折！</span>
      </div>
    </div>

    <!-- 5. computed 链式依赖 -->
    <h2>5. 链式计算</h2>
    <p class="desc">computed 可以依赖另一个 computed</p>
    <div class="demo-box">
      <p>原价：<input v-model.number="price" type="number" min="0" /></p>
      <p>税率：<input v-model.number="taxRate" type="number" min="0" max="100" />%</p>
      <p>税额：<strong>{{ tax }}</strong></p>
      <p>含税总价：<strong class="final">{{ finalPrice }}</strong></p>
    </div>

    <!-- 代码总结 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 基础用法 — 只读
const fullName = computed(() => firstName.value + lastName.value)

// 可写的 computed — get + set
const fullWritableName = computed({
  get: () => writableFirst.value + ' ' + writableLast.value,
  set: (val) => {
    const parts = val.split(' ')
    writableFirst.value = parts[0] || ''
    writableLast.value = parts[1] || ''
  }
})

// computed 有缓存！依赖不变就不会重新执行
// 函数每次渲染都会重新执行 — 性能差</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ==================== 1. 基础 fullName ====================
const firstName = ref('张')
const lastName = ref('三')
const calcCount = ref(0)

const fullName = computed(() => {
  calcCount.value++
  return firstName.value + lastName.value
})

// ==================== 2. computed vs 函数 ====================
const text = ref('Hello Vue')
const counter = ref(0)
const computedCalls = ref(0)
const fnCalls = ref(0)

const reversedByComputed = computed(() => {
  computedCalls.value++
  return text.value.split('').reverse().join('')
})

function reversedByFn() {
  fnCalls.value++
  return text.value.split('').reverse().join('')
}

// ==================== 3. 可写 computed ====================
const writableFirst = ref('张')
const writableLast = ref('三')

const fullWritableName = computed({
  get: () => writableFirst.value + ' ' + writableLast.value,
  set: (val) => {
    const parts = val.split(' ')
    writableFirst.value = parts[0] || ''
    writableLast.value = parts[1] || ''
  }
})

// ==================== 4. 购物车 ====================
const cart = ref([
  { name: 'Vue 入门教程', price: 29.9, quantity: 1 },
  { name: 'JavaScript 高级', price: 49.9, quantity: 2 },
  { name: 'CSS 实战手册', price: 19.9, quantity: 1 },
])

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const discountedPrice = computed(() =>
  totalItems.value >= 5 ? totalPrice.value * 0.9 : totalPrice.value
)

// ==================== 5. 链式计算 ====================
const price = ref(100)
const taxRate = ref(13)

const tax = computed(() => +(price.value * taxRate.value / 100).toFixed(2))
const finalPrice = computed(() => price.value + tax.value)  // 依赖 price 和 tax
</script>

<style scoped>
.computed-demo { max-width: 700px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.form-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.form-row label { min-width: 40px; font-weight: bold; }
input[type="text"], input[type="number"] { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
input[type="text"]:focus, input[type="number"]:focus { outline: none; border-color: #42b883; }
.result { margin: 8px 0; font-size: 14px; }
.tip { color: #999; font-size: 13px; font-style: italic; margin-top: 8px; }
button { padding: 6px 16px; margin-right: 8px; margin-bottom: 8px; border: 1px solid #42b883; border-radius: 6px; background: #fff; cursor: pointer; }
button:hover { background: #42b883; color: #fff; }

/* computed vs 函数 */
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px; }
.panel { padding: 16px; border-radius: 8px; }
.panel h4 { margin: 0 0 8px; }

/* 购物车 */
.cart-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; }
.cart-table th, .cart-table td { padding: 8px 12px; border: 1px solid #e0e0e0; text-align: center; }
.cart-table th { background: #f5f5f5; }
.qty { display: inline-block; min-width: 30px; text-align: center; }
.cart-summary { padding: 16px; background: #f0fbf7; border-radius: 8px; }
.cart-summary p { margin: 8px 0; font-size: 14px; }
.discount { color: #e74c3c; font-size: 18px; }
.badge { display: inline-block; padding: 4px 12px; background: #ff9800; color: #fff; border-radius: 12px; font-size: 12px; margin-top: 8px; }

/* 链式 */
.final { color: #e74c3c; font-size: 20px; }

/* 代码块 */
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
