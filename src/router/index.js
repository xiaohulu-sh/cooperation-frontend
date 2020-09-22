import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import '@/styles/nprogress.css'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let progressBarTimeout = null
function startProgressBar() {
  clearTimeout(progressBarTimeout)
  progressBarTimeout = setTimeout(NProgress.start, 500)
}
function stopProgressBar() {
  clearTimeout(progressBarTimeout)
  NProgress.done()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
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
