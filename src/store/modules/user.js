import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'
import { jsonp } from '@/utils/jsonp'

const state = {
  token: null,
  name: null
}

Object.keys(state).forEach(key => {
  const s = localStorage.getItem(key)
  if (!s) return
  try {
    const value = JSON.parse(s)
    if (value != null) {
      state[key] = value
    }
    // eslint-disable-next-line no-empty
  } catch (err) {}
})

const mutations = {}
for (const key of Object.keys(state)) {
  mutations[key] = function(state, value) {
    state[key] = value
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions: {
    navLogin() {
      location.href = `https://oauth2.jdcloud.com/authorize?response_type=code&redirect_uri=${encodeURIComponent(`http://${location.host}/v1_front_user/oauth`)}&client_id=9691604299493703&state=${Date.now()}`
    },
    async logout({ commit, dispatch }) {
      await asyncHelper(request({ url: 'v1_front_user/logout', method: 'POST', body: JSON.stringify({}) }))
      await asyncHelper(jsonp({ url: 'https://login.jdcloud.com/logout' }))
      commit('token', null)
      commit('name', null)
      dispatch('navLogin')
    },
    async fetchInfo({ commit }) {
      const data = await asyncHelper(request({ url: 'v1_front_user/getUserInfo' }))
      if (data === false) return
      commit('name', data.name)
    }
  }
}

export function init(store) {
  Object.keys(state).forEach(key => {
    store.watch(
      ({ user: { [key]: value } }) => value,
      value => {
        if (value === null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(value))
        }
      }
    )
  })
  store.watch(
    ({ user: { token } }) => token,
    token => {
      if (token) {
        store.dispatch('user/fetchInfo')
      }
    },
    { immediate: true }
  )
}
