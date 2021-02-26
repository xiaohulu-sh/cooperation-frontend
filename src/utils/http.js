import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import qs from 'qs'
import { Modal } from 'ant-design-vue'
import isEqual from 'lodash/isEqual'

const fetch = window.Request && 'signal' in new Request('') ? window.fetch : fetchPolyfill

const BASE = '/'
export const ERROR_CODE = {
  FAILED: -1,
  CANCEL: -2
}

let store
export function setStore(s) {
  store = s
}
const abortControllerMap = new Map()

export async function request(reqConfig, { withToken = true, autoCancelKey = '', silent = false } = {}) {
  // clone一份再修改，不改变原有对象
  const config = { ...reqConfig }
  let { url } = config
  if (!url) return
  delete config.url
  if (config.params) {
    url += qs.stringify(config.params, { addQueryPrefix: true })
    delete config.params
  }
  if (url.substring(0, 1) !== '/') {
    url = (config.base || BASE) + url
  }

  const defaultConfig = {
    headers: {},
    credentials: 'omit'
  }
  if (withToken) {
    const token = store?.state.user.token
    if (token) {
      defaultConfig.headers.token = token
    }
  }
  if (config.method === 'POST' && typeof config.body === 'string') {
    defaultConfig.headers['content-type'] = 'application/json'
  }
  if (autoCancelKey) {
    if (abortControllerMap.has(autoCancelKey)) {
      abortControllerMap.get(autoCancelKey).abort()
    }
    abortControllerMap.set(autoCancelKey, new AbortController())
    defaultConfig.signal = abortControllerMap.get(autoCancelKey).signal
  }
  let resJson
  try {
    resJson = await fetch(url, {
      ...defaultConfig,
      ...config
    }).then(res => res.json())
  } catch (err) {
    if (err.name === 'AbortError') {
      return Promise.reject({ code: ERROR_CODE.CANCEL, msg: '请求取消' })
    }
    const msg = '请求失败，请稍后再试'
    if (!silent) {
      Modal.error({ title: msg })
    }
    return Promise.reject({ code: ERROR_CODE.FAILED, msg })
  }
  const { code, data, msg } = resJson || {}
  // eslint-disable-next-line no-console
  switch (code) {
    case 0:
      return data

    case 444:
      store.dispatch('user/logout')
      return Promise.reject({ code, data, msg })

    case 1005:
      store.dispatch('user/navLogin')
      return Promise.reject({ code, data, msg })

    default:
      if (!silent && msg) {
        Modal.error({ title: msg })
      }
      return Promise.reject({ code, data, msg })
  }
}

// 创建避免重复请求的函数
export function createFetchAction({
  key,
  loadingKey = key + 'Loading',
  getReqConfig,
  getReqOptions,
  vuex = false,
  checkData = function() {
    return (vuex ? this.state[key] : this[key]) != null
  },
  setData = function(data) {
    if (data == null) return
    if (vuex) {
      this.commit(key, data)
    } else {
      this[key] = data
    }
  },
  getLoading = function() {
    return (vuex ? this.state : this)[loadingKey]
  },
  setLoading = function(loading) {
    if (vuex) {
      this.commit(loadingKey, loading)
    } else {
      this[loadingKey] = loading
    }
  },
  loadingDelay = 500,
  maxAge = 30 * 1000,
  autoCancelKey
}) {
  let lastReqConfig
  let dataTime
  let loadingTimer

  return async function action(context, options) {
    if (!vuex) {
      options = context
      context = this
    }
    if (!options) options = {}
    const reqConfig = getReqConfig.call(context, options)
    if (!options.refresh && isEqual(reqConfig, lastReqConfig) && (getLoading.call(context) || (dataTime && Date.now() - dataTime < maxAge && checkData.call(context)))) {
      return
    }
    const reqOptions = { autoCancelKey, ...(getReqOptions ? getReqOptions.call(context, options) : null) }
    clearTimeout(loadingTimer)
    loadingTimer = setTimeout(() => {
      setLoading.call(context, true)
    }, loadingDelay)
    lastReqConfig = reqConfig
    dataTime = null
    let data
    let err
    try {
      data = await request(reqConfig, reqOptions)
    } catch (ex) {
      err = ex
    }
    // 判断请求是否过期
    if (isEqual(reqConfig, lastReqConfig)) {
      clearTimeout(loadingTimer)
      if (!err) {
        dataTime = Date.now()
        setLoading.call(context, false)
        setData.call(context, data, reqConfig)
      } else if (err.code !== ERROR_CODE.CANCEL) {
        lastReqConfig = null
        setLoading.call(context, false)
        setData.call(context, data, reqConfig, err)
      }
    }
  }
}
