import NProgress from 'nprogress'
import './nprogress.css'

let progressBarTimeout = null
export function startProgressBar() {
  clearTimeout(progressBarTimeout)
  progressBarTimeout = setTimeout(NProgress.start, 500)
}
export function stopProgressBar() {
  clearTimeout(progressBarTimeout)
  NProgress.done()
}
