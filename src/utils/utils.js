export function asyncHelper(promise, { errorHandler = () => false, slient = true } = {}) {
  return promise.catch(function(err) {
    if (!slient) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    return errorHandler(err)
  })
}

export function fixNumber(n, fixed) {
  return Number(n.toFixed(fixed))
}

export function parseNumberUnit(n, fixed = 2) {
  let unit = ''
  if (n) {
    if (Math.abs(n) >= 10e7) {
      n = fixNumber(n / 10e7, fixed)
      unit = '亿'
    } else if (Math.abs(n) >= 10000) {
      n = fixNumber(n / 10000, fixed)
      unit = '万'
    } else {
      n = fixNumber(n, fixed)
    }
  }
  return { n, unit }
}

export function formatNumber(n, fixed) {
  const formatted = parseNumberUnit(Number(n), fixed)
  return formatted.n + formatted.unit
}

export function onAvatarError(e) {
  const img = e.target || e.srcElement
  if (img) {
    img.onerror = null
    img.src = require('@/assets/user.svg')
  }
}
