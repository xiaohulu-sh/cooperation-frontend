import Vue from 'vue'
import VueRouter from 'vue-router'
import { startProgressBar, stopProgressBar } from '@/components/progress-bar'
import Stars from '@/views/stars/Stars'
import ByType from '@/views/stars/ByType'
import ByCategory from '@/views/stars/ByCategory'
import ByFans from '@/views/stars/ByFans'
import Star from '@/views/star/Star'
import StarVideo from '@/views/star/VideoData'
import StarLive from '@/views/star/LiveData'
import StarDanmu from '@/views/star/DanmuData'
import StarCommerce from '@/views/star/CommerceData'
import StarRecords from '@/views/star/Records'
import StarCommerceDetail from '@/views/star/CommerceDetail'
import StarFans from '@/views/star/FansData'
import GoodsData from '@/views/goods/GoodsData'
import View404 from '@/views/View404'

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
      { path: 'by-type', component: ByType },
      { path: 'by-category', component: ByCategory },
      { path: 'by-fans', component: ByFans }
    ]
  },
  {
    path: '/star/:platform/:room',
    component: Star,
    children: [
      { path: 'video', component: StarVideo, meta: { navKey: 'video' } },
      { path: 'live', component: StarLive, meta: { navKey: 'live' } },
      { path: 'danmu', component: StarDanmu, meta: { navKey: 'danmu' } },
      { path: 'commerce', component: StarCommerce, meta: { navKey: 'commerce' } },
      { path: 'records', component: StarRecords, meta: { navKey: 'records' } },
      { path: 'records/:id', component: StarCommerceDetail, meta: { navKey: 'records' } },
      { path: 'fans', component: () => StarFans, meta: { navKey: 'fans' } }
    ]
  },
  { path: '/goods/:id/data', component: GoodsData },
  { path: '*', component: View404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
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
