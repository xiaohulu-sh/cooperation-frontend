/**
 * 目前这个跟mixin一样，但不想使用mixin，等Vue3支持IE11之后，再升级Vue3，并使用Composition API改写^_^
 */

export default {
  data() {
    return {
      preset: 3,
      presetList: [
        { value: 1, label: '今日' },
        { value: 2, label: '昨日' },
        { value: 3, label: '近7天' },
        { value: 4, label: '近30天' }
      ],
      day: null,
      dayList: [
        { id: 0, value: '2020-10-13', start: '2020-10-13', end: '2020-10-13' },
        { id: 1, value: '2020-10-12', start: '2020-10-12', end: '2020-10-12' },
        { id: 2, value: '2020-10-11', start: '2020-10-11', end: '2020-10-11' },
        { id: 3, value: '2020-10-10', start: '2020-10-10', end: '2020-10-10' },
        { id: 4, value: '2020-10-09', start: '2020-10-09', end: '2020-10-09' },
        { id: 5, value: '2020-10-08', start: '2020-10-08', end: '2020-10-08' },
        { id: 6, value: '2020-10-07', start: '2020-10-07', end: '2020-10-07' },
        { id: 7, value: '2020-10-06', start: '2020-10-06', end: '2020-10-06' }
      ]
    }
  },
  computed: {
    range() {
      if (this.preset) {
        return this.presetList.find(({ value }) => value === this.preset)?.label || ''
      }
      if (this.day) return this.day
      return ''
    },
    comparePrefix() {
      if (this.preset === 1) {
        return '比昨日'
      }
      if (this.preset === 2 || this.day) {
        return '比前日'
      }
      if (this.preset === 3 || this.preset === 4) {
        return '比上周期'
      }
    }
  }
}
