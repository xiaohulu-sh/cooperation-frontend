<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <Header />
      <a-result v-if="err" status="error" :title="err" style="margin-top:50px"></a-result>
      <router-view v-else />
    </div>
  </a-config-provider>
</template>

<script>
import { mapState } from 'vuex'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Header from '@/views/components/Header'

export default {
  components: { Header },
  data() {
    return {
      locale: zhCN
    }
  },
  computed: mapState(['err'])
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
