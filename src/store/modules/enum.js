import { asyncHelper } from '@/utils/utils'
import { request } from '@/utils/http'
import uniq from 'lodash/uniq'

const state = {
  platforms: [
    { value: 201, label: '抖音' },
    { value: 202, label: '快手' }
  ],
  tags: [],
  categories: [],
  areas: [],
  states: [
    { value: 1, label: '意向单' },
    { value: 2, label: '合作修改确定' },
    { value: 3, label: '方案已确定' },
    { value: 4, label: '红人执行中' },
    { value: 5, label: '执行完成' }
  ],
  coopTypes: [
    { value: 1, label: '直播带货' },
    { value: 2, label: '短视频带货' }
  ],
  isCoop: [
    { value: 0, label: '待定' },
    { value: 1, label: '是' },
    { value: 2, label: '否' }
  ]
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
    },
    stateLabels({ states }) {
      const hash = {}
      states.forEach(({ value, label }) => {
        hash[value] = label
      })
      return hash
    },
    coopTypeLabels({ coopTypes }) {
      const hash = {}
      coopTypes.forEach(({ value, label }) => {
        hash[value] = label
      })
      return hash
    },
    isCoopLabels({ isCoop }) {
      const hash = {}
      isCoop.forEach(({ value, label }) => {
        hash[value] = label
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
      const data = await asyncHelper(request({ url: 'v1_front_search/tagsList', params: { ver: 2 } }))
      if (!data) return false
      const { lv1: list = [], lv2: hash = {} } = data
      const tags = uniq(list).map(name => {
        const item = { value: name, label: name }
        if (hash[name]) {
          item.children = uniq(hash[name]).map(s => ({ value: s === name ? s : `${name}|${s}`, label: s }))
        }
        return item
      })
      commit('tags', tags)
      return tags
    },
    async fetchCategories({ commit, state }, { refresh = false } = {}) {
      if (!refresh && state.categories.length > 0) {
        return state.categories
      }
      const data = await asyncHelper(request({ url: 'v1_front_search/jd_tagsList' }))
      if (!data) return false
      const { lv1: list = [], lv2: hash = {} } = data
      const categories = uniq(list).map(name => {
        const item = { value: name, label: name }
        if (hash[name]) {
          item.children = uniq(hash[name]).map(s => ({ value: s === name ? s : `${name}|${s}`, label: s }))
        }
        return item
      })
      commit('categories', categories)
      return categories
    },
    async fetchAreas({ commit, state }, { refresh = false } = {}) {
      if (!refresh && state.areas.length > 0) {
        return state.areas
      }
      const data = await asyncHelper(request({ url: 'v1_front_search/areaList' }))
      if (!data) return false
      const areas = data.list.map(({ name, sons }) => ({ name, children: sons }))
      commit('areas', areas)
      return areas
    }
  }
}
