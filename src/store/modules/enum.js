import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'

const state = {
  platforms: [
    { value: 201, label: '抖音' },
    { value: 202, label: '快手' }
  ],
  tags: [],
  areas: []
}

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
    platformLabels({ platforms }) {
      const hash = {}
      platforms.forEach(({ value, label }) => {
        hash[value] = label
      })
      return hash
    },
    areasHash({ areas }) {
      const hash = {}
      areas.forEach(({ name, children }) => {
        hash[name] = children
      })
      return hash
    }
  },
  mutations,
  actions: {
    async fetchTags({ commit, state }, { refresh = false } = {}) {
      if (!refresh && state.tags.length > 0) {
        return state.tags
      }
      const data = await asyncHelper(request({ url: 'v1_front_search/tagsList' }))
      if (!data) return false
      const tags = data.list.map(({ id, name }) => ({ value: id, label: name }))
      commit('tags', tags)
      return tags
    },
    async fetchAreas({ commit, state }, { refresh = false } = {}) {
      if (!refresh && state.areas.length > 0) {
        return state.areas
      }
      const data = await asyncHelper(request({ url: '/v1_front_search/areaList' }))
      if (!data) return false
      const areas = data.list.map(({ name, sons }) => ({ name, children: sons }))
      commit('areas', areas)
      return areas
    }
  }
}
