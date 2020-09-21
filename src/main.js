import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* ant-design-vue start */
import { ConfigProvider } from 'ant-design-vue'
Vue.use(ConfigProvider)
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
/* ant-design-vue end */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
