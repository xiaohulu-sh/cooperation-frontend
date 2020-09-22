import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'intersection-observer'

Vue.config.productionTip = false

/* ant-design-vue start */
import { ConfigProvider } from 'ant-design-vue'
Vue.use(ConfigProvider)
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
/* ant-design-vue end */

/* echarts start */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
Vue.prototype.echarts = echarts
/* echarts end */

/* custom components start */
import Chart from '@/components/Chart.vue'
Vue.component('Chart', Chart)
/* custom components end */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
