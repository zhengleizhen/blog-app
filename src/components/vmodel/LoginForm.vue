<template>
  <div class="login-form">
    <div class="field">
      <label>用户名</label>
      <input
        :value="userModel"
        @input="userModel = $event.target.value"
        placeholder="请输入用户名"
      />
    </div>
    <div class="field">
      <label>密码</label>
      <input
        type="password"
        :value="pwdModel"
        @input="pwdModel = $event.target.value"
        placeholder="请输入密码"
      />
    </div>
  </div>
</template>

<script setup>
// 一个组件两个 v-model
const userModel = defineModel('username')
const pwdModel = defineModel('password')
</script>

<style scoped>
.login-form { display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 13px; color: #666; font-weight: bold; }
input {
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}
input:focus { outline: none; border-color: #42b883; }
</style>
