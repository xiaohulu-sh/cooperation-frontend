import Vue from 'vue'
import VueRouter from 'vue-router'
import { startProgressBar, stopProgressBar } from '@/components/progress-bar'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/stars/by-type' },
  {
    path: '/stars',
    redirect: '/stars/by-type',
    component: () => import('@/views/stars/Stars.vue'),
    children: [
      { path: 'by-type', component: () => import('@/views/stars/ByType.vue') },
      { path: 'by-category', component: () => import('@/views/stars/ByCategory.vue') },
      { path: 'by-fans', component: () => import('@/views/stars/ByFans.vue') }
    ]
  },
  {
    path: '/star/:id',
    component: () => import('@/views/star/Star.vue')
  },
  // { path: '*', component: () => import('@/views/View404.vue') },
  { path: '*', component: () => import('@/views/Placeholder.vue') }
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
