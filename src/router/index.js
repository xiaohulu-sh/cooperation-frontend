import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { startProgressBar, stopProgressBar } from '@/components/progress-bar'
import Stars from '@/views/stars/Stars'
import StarsByType from '@/views/stars/ByType'
import StarsByCategory from '@/views/stars/ByCategory'
import StarsByFans from '@/views/stars/ByFans'
import StarsSelected from '@/views/stars/Selected'
import Star from '@/views/star/Star'
import StarVideo from '@/views/star/VideoData'
import StarLive from '@/views/star/LiveData'
import StarDanmu from '@/views/star/DanmuData'
import StarCommerce from '@/views/star/CommerceData'
import StarRecords from '@/views/star/Records'
import StarCommerceDetail from '@/views/star/CommerceDetail'
import StarFans from '@/views/star/FansData'
import GoodsData from '@/views/goods/GoodsData'
import My from '@/views/my/My'
import MyInfo from '@/views/my/Info'
import MyOrders from '@/views/my/Orders'
import Order from '@/views/my/Order'
import OrderData from '@/views/my/OrderData'
import OrderSummary from '@/views/my/OrderSummary'
import Contact from '@/views/Contact'
import View404 from '@/views/View404'
import qs from 'qs'

// 解决路由访问重复时报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/stars/by-type' },
  {
    path: '/stars',
    redirect: '/stars/by-type',
    component: Stars,
    children: [
      { path: 'by-type', component: StarsByType },
      { path: 'by-category', component: StarsByCategory },
      { path: 'by-fans', component: StarsByFans },
      { path: 'selected', component: StarsSelected }
    ]
  },
  {
    path: '/star/:platform/:room',
    redirect: { name: 'starVideo' },
    component: Star,
    props: true,
    children: [
      { name: 'starVideo', path: 'video', component: StarVideo, props: true, meta: { navKey: 'video' } },
      { path: 'live', component: StarLive, props: true, meta: { navKey: 'live' } },
      { path: 'danmu', component: StarDanmu, props: true, meta: { navKey: 'danmu' } },
      { path: 'commerce', component: StarCommerce, props: true, meta: { navKey: 'commerce' } },
      { path: 'records', component: StarRecords, props: true, meta: { navKey: 'records' } },
      { path: 'records/:id', component: StarCommerceDetail, props: true, meta: { navKey: 'records' } },
      { path: 'fans', component: StarFans, props: true, meta: { navKey: 'fans' } }
    ]
  },
  { path: '/goods/:id/data', component: GoodsData },
  {
    path: '/my',
    redirect: '/my/info',
    component: My,
    children: [
      { path: 'info', component: MyInfo },
      { path: 'orders', component: MyOrders },
      { path: 'order/:id', component: Order, meta: { sideKey: '/my/orders' } }
    ]
  },
  { path: '/my/order/:id/data', component: OrderData },
  { path: '/my/order/:id/summary', component: OrderSummary },
  { path: '/contact', component: Contact },
  { path: '*', component: View404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router

router.beforeEach(async (to, from, next) => {
  startProgressBar()
  const { preload } = to.meta
  if (preload) {
    try {
      await preload(next, to, from)
    } catch (err) {
      stopProgressBar()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  stopProgressBar()
})

const token = qs.parse(location.search.substring(1))._t
if (token) {
  store.commit('user/token', token)
  router.replace({ ...router.currentRoute.query, _t: null })
} else if (!store.state.user.token) {
  store.dispatch('user/navLogin')
}
