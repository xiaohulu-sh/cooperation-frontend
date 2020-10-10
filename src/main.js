import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'intersection-observer'

Vue.config.productionTip = false

/* ant-design-vue start */
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { ConfigProvider, Icon, Button, Spin, Dropdown, Menu, Select, Checkbox, Tag, Result, message } from 'ant-design-vue'
Vue.use(ConfigProvider)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Spin)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Result)
Vue.prototype.$message = message
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

/* vue-virtual-scroller start */
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'
Vue.component('RecycleScroller', RecycleScroller)
/* vue-virtual-scroller end */

/* vue-infinite-scroll start */
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
/* vue-infinite-scroll end */

/* custom components start */
import Chart from '@/components/Chart'
Vue.component('Chart', Chart)
import RadioList from '@/components/RadioList'
Vue.component('RadioList', RadioList)
import CustomRange from '@/components/CustomRange'
Vue.component('CustomRange', CustomRange)
/* custom components end */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
