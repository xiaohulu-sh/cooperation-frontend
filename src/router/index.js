import Vue from 'vue'
import VueRouter from 'vue-router'
import { startProgressBar, stopProgressBar } from '@/components/progress-bar'

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
    component: () => import('@/views/stars/Stars'),
    children: [
      { path: 'by-type', component: () => import('@/views/stars/ByType') },
      { path: 'by-category', component: () => import('@/views/stars/ByCategory') },
      { path: 'by-fans', component: () => import('@/views/stars/ByFans') }
    ]
  },
  {
    path: '/star/:platform/:room',
    component: () => import('@/views/star/Star'),
    children: [
      { path: 'video', component: () => import('@/views/star/VideoData'), meta: { navKey: 'video' } },
      { path: 'live', component: () => import('@/views/star/LiveData'), meta: { navKey: 'live' } },
      { path: 'danmu', component: () => import('@/views/star/DanmuData'), meta: { navKey: 'danmu' } },
      { path: 'commerce', component: () => import('@/views/star/CommerceData'), meta: { navKey: 'commerce' } },
      { path: 'records', component: () => import('@/views/star/Records'), meta: { navKey: 'records' } }
    ]
  },
  { path: '*', component: () => import('@/views/View404') }
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
