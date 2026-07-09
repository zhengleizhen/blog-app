<template>
  <div class="vmodel-demo">
    <h1>v-model 组件双向绑定</h1>
    <p class="desc">Vue 3.4+ 的 defineModel 语法，让组件双向绑定变得超简单</p>

    <!-- 1. 问题引入：以前怎么做 -->
    <h2>1. 以前怎么写？（繁琐）</h2>
    <p class="desc">没有 defineModel 之前，要写 props + emit 才能实现双向绑定</p>
    <div class="demo-box">
      <pre class="old-code">// 旧写法 — 要写 3 行才能拿到 model 的值
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
// 修改时要 emit：emit('update:modelValue', newValue)

// 新写法 — defineModel 一行搞定
const model = defineModel()
model.value = newValue  // 自动 emit update:modelValue
</pre>
    </div>

    <!-- 2. 基础：单个 v-model -->
    <h2>2. 基础：单个 v-model</h2>
    <p class="desc">最简单的双向绑定 — 输入框同步父组件的数据</p>
    <div class="demo-box">
      <p>父组件的值：<strong>{{ name }}</strong></p>
      <MyInput v-model="name" placeholder="请输入名字" />
      <p class="tip">在输入框里打字，上面的值跟着变 — 这就是双向绑定</p>
    </div>

    <!-- 3. 多个 v-model -->
    <h2>3. 一个组件多个 v-model</h2>
    <p class="desc">一个组件可以同时绑定多个值，比如登录表单</p>
    <div class="demo-box">
      <LoginForm v-model:username="form.user" v-model:password="form.pwd" />
      <div class="form-result">
        <p>用户名：<strong>{{ form.user }}</strong></p>
        <p>密码：<strong>{{ form.pwd ? '••••••' : '（空）' }}</strong></p>
      </div>
      <p class="tip">两个输入框分别用 v-model:username 和 v-model:password 双向绑定</p>
    </div>

    <!-- 4. 修饰符 -->
    <h2>4. 修饰符（.number / .trim / 自定义）</h2>
    <p class="desc">v-model 可以加修饰符，也可以自己定义修饰符</p>
    <div class="demo-box">
      <div class="modifier-row">
        <label>.number</label>
        <NumberInput v-model:number="modifierNum" />
        <span>类型：{{ typeof modifierNum }}，值：{{ modifierNum }}</span>
      </div>
      <div class="modifier-row">
        <label>.trim</label>
        <TextInput v-model.trim="modifierText" />
        <span>长度：{{ modifierText.length }}，内容："{{ modifierText }}"</span>
      </div>
      <div class="modifier-row">
        <label>.upper（自定义）</label>
        <UpperInput v-model.upper="modifierUpper" />
        <span>输入自动变大写</span>
      </div>
    </div>

    <!-- 5. 实际场景：开关组件 -->
    <h2>5. 实际场景：开关组件</h2>
    <p class="desc">用 v-model 控制开关状态</p>
    <div class="demo-box">
      <div class="toggle-list">
        <div class="toggle-item">
          <span>深色模式</span>
          <ToggleSwitch v-model="darkMode" />
        </div>
        <div class="toggle-item">
          <span>自动保存</span>
          <ToggleSwitch v-model="autoSave" />
        </div>
        <div class="toggle-item">
          <span>消息通知</span>
          <ToggleSwitch v-model="notifications" />
        </div>
      </div>
      <p class="result">
        深色模式：{{ darkMode ? '开' : '关' }} |
        自动保存：{{ autoSave ? '开' : '关' }} |
        通知：{{ notifications ? '开' : '关' }}
      </p>
    </div>

    <!-- 6. 实际场景：评分组件 -->
    <h2>6. 实际场景：评分组件</h2>
    <p class="desc">点击星星打分，v-model 同步分数到父组件</p>
    <div class="demo-box">
      <p>当前评分：<strong class="rating-num">{{ rating }}</strong> / 5</p>
      <RatingStars v-model="rating" />
    </div>

    <!-- 代码总结 -->
    <h2> 代码总结</h2>
    <div class="code-block">
      <pre><code>// ===== 子组件：MyInput.vue =====
&lt;script setup&gt;
// 一行代码实现双向绑定
const model = defineModel()  // 默认名 "modelValue"
// 也可以指定名字：
const username = defineModel('username')
// 带修饰符：
const [modelValue, modifiers] = defineModel()
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-model="modelValue" /&gt;
&lt;/template&gt;

// ===== 父组件：使用 =====
&lt;MyInput v-model="name" /&gt;                    // 默认
&lt;MyInput v-model:username="user" /&gt;           // 多个 model
&lt;MyInput v-model.number="age" /&gt;              // 修饰符
&lt;MyInput v-model.upper="text" /&gt;              // 自定义修饰符
</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MyInput from '../components/vmodel/MyInput.vue'
import LoginForm from '../components/vmodel/LoginForm.vue'
import NumberInput from '../components/vmodel/NumberInput.vue'
import TextInput from '../components/vmodel/TextInput.vue'
import UpperInput from '../components/vmodel/UpperInput.vue'
import ToggleSwitch from '../components/vmodel/ToggleSwitch.vue'
import RatingStars from '../components/vmodel/RatingStars.vue'

// ==================== 2. 基础 v-model ====================
const name = ref('')

// ==================== 3. 多个 v-model ====================
const form = ref({ user: '', pwd: '' })

// ==================== 4. 修饰符 ====================
const modifierNum = ref('')
const modifierText = ref('')
const modifierUpper = ref('')

// ==================== 5. 开关 ====================
const darkMode = ref(false)
const autoSave = ref(true)
const notifications = ref(false)

// ==================== 6. 评分 ====================
const rating = ref(0)
</script>

<style scoped>
.vmodel-demo { max-width: 650px; margin: 30px auto; padding: 0 20px; }
h1 { color: #42b883; margin-bottom: 30px; }
h2 { margin-top: 40px; color: #333; font-size: 20px; }
.desc { color: #888; font-size: 14px; margin-bottom: 12px; }
.demo-box { border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.tip { color: #999; font-size: 13px; font-style: italic; margin-top: 8px; }
.result { margin: 8px 0; font-size: 14px; }
.old-code { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; white-space: pre; font-family: 'Consolas', 'Courier New', monospace; line-height: 1.6; }

/* 修饰符行 */
.modifier-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding: 12px; background: #f9f9f9; border-radius: 8px; font-size: 14px; }
.modifier-row label { min-width: 70px; font-weight: bold; color: #42b883; }
.modifier-row span { color: #666; font-size: 13px; }

/* 开关列表 */
.toggle-list { display: flex; flex-direction: column; gap: 12px; }
.toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f9f9f9; border-radius: 8px; }

/* 评分 */
.rating-num { color: #f39c12; font-size: 24px; }

/* 表单结果 */
.form-result { margin-top: 16px; padding: 12px; background: #f0fbf7; border-radius: 8px; }
.form-result p { margin: 4px 0; font-size: 14px; }

/* 代码块 */
.code-block { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
.code-block code { font-family: 'Consolas', 'Courier New', monospace; }
</style>
