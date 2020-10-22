import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'intersection-observer'
import smoothscroll from 'smoothscroll-polyfill'
import { onAvatarError } from './utils/utils'

smoothscroll.polyfill()

Vue.config.productionTip = false

/* ant-design-vue start */
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { ConfigProvider, Icon, Button, Spin, Dropdown, Menu, Select, Checkbox, Tag, Empty, Result, Pagination, Popover, Radio, message } from 'ant-design-vue'
Vue.use(ConfigProvider)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Spin)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Select)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(Result)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Radio)
Vue.prototype.$message = message
/* ant-design-vue end */

/* echarts start */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/calendar'
import 'echarts-wordcloud'
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

/* common style start */
import commonStyle from '@/styles/common.module.less'
Vue.prototype.c = commonStyle
/* common style end */

/* custom components start */
import Chart from '@/components/Chart'
Vue.component('Chart', Chart)
import LazyBlock from '@/components/LazyBlock'
Vue.component('LazyBlock', LazyBlock)
import RadioList from '@/components/RadioList'
Vue.component('RadioList', RadioList)
import CustomRange from '@/components/CustomRange'
Vue.component('CustomRange', CustomRange)
import NavList from '@/components/NavList'
Vue.component('NavList', NavList)
import SideNav from '@/views/components/SideNav'
Vue.component('SideNav', SideNav)
import FixedNav from '@/views/components/FixedNav'
Vue.component('FixedNav', FixedNav)
import StarInfo from '@/views/components/StarInfo'
Vue.component('StarInfo', StarInfo)
Vue.prototype.onAvatarError = onAvatarError
/* custom components end */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
