let id = 0
const container = document.getElementsByTagName('head')[0]

export function jsonp({ url, query = {} } = {}) {
  if (!url) return Promise.reject({ err: '缺少url参数' })

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const callbackName = 'jsonp' + id++

    query['callback'] = callbackName

    const params = []
    for (const key in query) {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
    }
    url = url.indexOf('?') > 0 ? url + '&' : url + '?'
    url += params.join('&')
    script.src = url

    window[callbackName] = function(ret) {
      resolve(ret)
      container.removeChild(script)
      delete window[callbackName]
    }

    script.onerror = function(e) {
      reject({ err: e })
      container.removeChild(script)
      window[callbackName] && delete window[callbackName]
    }
    script.type = 'text/javascript'
    container.appendChild(script)
  })
}
