import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'
import { jsonp } from '@/utils/jsonp'

const state = {
  token: null,
  name: null,
  brands: []
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
  getters: {
    brandName({ brands }) {
      return brands.find(({ isCurrent }) => isCurrent)?.name || ''
    }
  },
  mutations,
  actions: {
    navLogin() {
      location.href = `https://oauth2.jdcloud.com/authorize?response_type=code&redirect_uri=${encodeURIComponent(`http://${location.host}/v1_front_user/oauth`)}&client_id=9691604299493703&state=${Date.now()}`
    },
    clear({ commit }) {
      commit('token', null)
      commit('name', null)
      commit('brands', [])
    },
    async logout({ dispatch }) {
      await asyncHelper(request({ url: 'v1_front_user/logout', method: 'POST', body: JSON.stringify({}) }))
      await asyncHelper(jsonp({ url: 'https://login.jdcloud.com/logout' }))
      dispatch('clear')
      dispatch('navLogin')
    },
    async fetchInfo({ state, getters, commit, dispatch }, { cacheFirst = false, checkDefaultBrand = false } = {}) {
      if (!state.token) return false
      if (!cacheFirst || state.brands.length === 0) {
        const data = await asyncHelper(request({ url: 'v1_front_user/getUserInfo' }))
        if (data === false) {
          commit('clear')
          return false
        }
        commit('name', data.name)
        commit(
          'brands',
          data.list.map(({ externalid, isCurrentBrand, name }) => ({ id: externalid, name, isCurrent: isCurrentBrand }))
        )
      }
      if (checkDefaultBrand && !getters.brandName) {
        dispatch('setDefaultBrand')
      }
    },
    async setDefaultBrand({ state: { brands }, dispatch }) {
      if (brands.length === 0) return false
      const data = await asyncHelper(
        request({
          url: 'v1_front_user/setCurrentBrand',
          method: 'POST',
          body: JSON.stringify({
            externalid: brands[0].id
          })
        })
      )
      if (data === false) return false
      await dispatch('fetchInfo')
      return true
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
}
