<script setup>
const skills = ['Vue', 'JavaScript', 'CSS', 'Node.js', 'Git']
</script>

<template>
  <div class="about">
    <div class="about-card">
      <div class="avatar-placeholder">
        <span>Z</span>
      </div>
      <h1 class="about-name">我的博客</h1>
      <p class="about-bio">热爱前端技术，喜欢用代码创造美好的事物。这里记录我的学习笔记和技术分享。</p>

      <div class="skills-section">
        <h3 class="skills-title">技术栈</h3>
        <div class="skills-list">
          <span
            v-for="skill in skills"
            :key="skill"
            class="skill-tag"
          >{{ skill }}</span>
        </div>
      </div>

      <div class="social-links">
        <a href="#" class="social-link">GitHub</a>
        <a href="#" class="social-link">邮箱</a>
        <a href="#" class="social-link">Twitter</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
}

.about-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #34d399);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.avatar-placeholder span {
  font-size: 48px;
  color: #fff;
  font-weight: bold;
}

.about-name {
  font-size: 28px;
  color: #222;
  margin-bottom: 12px;
}

.about-bio {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 32px;
}

.skills-section {
  margin-bottom: 32px;
}

.skills-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.skill-tag {
  display: inline-block;
  padding: 4px 14px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 13px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-link {
  color: #42b883;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.7;
}
</style>
