<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <Header />
      <router-view />
      <img v-if="designVisible" src="../temp/design.webp" :style="`position:absolute;width:${designWidth}px;left:50%;top:-76px;transform:translateX(-50%);opacity:${designOpacity}`" />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Header from '@/views/components/Header'

export default {
  components: { Header },
  data() {
    return {
      locale: zhCN,
      // designMode
      devMode: process.env.NODE_ENV === 'development',
      designVisible: false,
      designOpacity: 0.2,
      designWidth: 1366
    }
  },
  mounted() {
    if (this.devMode) {
      document.addEventListener('keyup', e => {
        if (e.ctrlKey) {
          if (e.key === 'h') {
            this.designVisible = !this.designVisible
          } else if (/^[0-9]$/.test(e.key)) {
            this.designOpacity = e.key === '0' ? 1 : e.key / 10
          }
        }
      })
    }
  }
}
</script>

<style>
body {
  background: #f8f8f8;
  font-family: -apple-system, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  cursor: default;
}
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
button,
a {
  cursor: pointer;
  outline: none;
}
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
em {
  font-style: normal;
}
</style>
