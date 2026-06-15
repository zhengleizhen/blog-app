<template>
  <div class="slot-demo">
    <h1>插槽（Slot）学习示例</h1>

    <!-- 1. 默认插槽 -->
    <h2>1. 默认插槽</h2>
    <p class="desc">父组件直接写在标签内部，子组件用 &lt;slot&gt; 接收</p>
    <SlotCard>
      <p>这是一段通过默认插槽传入的内容 👆</p>
      <p>可以传多行内容，都会显示在卡片主体区域。</p>
    </SlotCard>

    <!-- 2. 具名插槽 -->
    <h2>2. 具名插槽</h2>
    <p class="desc">用 <code>#header</code> 和 <code>#footer</code> 指定内容位置</p>
    <SlotCard>
      <template #header>
        📌 这是我的自定义标题
      </template>
      <p>主体内容：具名插槽让父组件可以精确控制每个区域的显示。</p>
      <template #footer>
        <button class="btn" @click="alert('你点了确认！')">确认</button>
        <button class="btn btn-cancel">取消</button>
      </template>
    </SlotCard>

    <!-- 3. 默认值 -->
    <h2>3. 插槽默认值</h2>
    <p class="desc">不传内容时，显示子组件预先写好的默认文字</p>
    <SlotCard>
      <template #header>
        这个卡片只传了标题
      </template>
      <!-- 注意：这里什么都没传，但 footer 会显示空（因为没有默认值） -->
    </SlotCard>

    <!-- 4. 不传任何内容 -->
    <h2>4. 完全不传内容</h2>
    <p class="desc">一个空的 SlotCard，全部显示默认值</p>
    <SlotCard />

    <!-- 5. 作用域插槽 -->
    <h2>5. 作用域插槽（Scoped Slot）</h2>
    <p class="desc">子组件把数据传给父组件，父组件决定怎么渲染</p>
    <ScopedList>
      <template #item="{ item, index }">
        <span class="badge">#{{ index + 1 }}</span>
        <strong>{{ item.name }}</strong>
        <span class="tag" :class="item.status">{{ item.status === 'active' ? '启用' : '禁用' }}</span>
      </template>
    </ScopedList>
  </div>
</template>

<script setup>
import SlotCard from '../components/slot/SlotCard.vue'
import ScopedList from '../components/slot/ScopedList.vue'
</script>

<style scoped>
.slot-demo {
  max-width: 680px;
  margin: 30px auto;
  padding: 0 20px;
}

h1 {
  color: #42b883;
  margin-bottom: 30px;
}

h2 {
  margin-top: 40px;
  color: #333;
  font-size: 20px;
}

.desc {
  color: #888;
  font-size: 14px;
  margin-bottom: 12px;
}

.desc code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #e83e8c;
}

.btn {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: #42b883;
  color: #fff;
  cursor: pointer;
  margin-right: 8px;
}

.btn-cancel {
  background: #ccc;
  color: #333;
}

.badge {
  background: #e8f5e9;
  color: #42b883;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 8px;
}

.tag {
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.tag.active {
  background: #d4edda;
  color: #155724;
}

.tag.disabled {
  background: #f8d7da;
  color: #721c24;
}
</style>
