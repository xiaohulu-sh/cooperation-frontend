import Vue from 'vue'
import VueRouter from 'vue-router'
import { startProgressBar, stopProgressBar } from '@/components/progress-bar'

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
    path: '/star/:id',
    component: () => import('@/views/star/Star')
  },
  // { path: '*', component: () => import('@/views/View404') },
  { path: '*', component: () => import('@/views/Placeholder') }
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
