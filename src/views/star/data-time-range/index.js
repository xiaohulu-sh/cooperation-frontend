/**
 * 目前这个跟mixin一样，但不想使用mixin，等Vue3支持IE11之后，再升级Vue3，并使用Composition API改写^_^
 */

export default {
  data() {
    return {
      preset: 'recent_7',
      presetList: [
        { value: 'today', label: '今日' },
        { value: 'yesterday', label: '昨日' },
        { value: 'recent_7', label: '近7天' },
        { value: 'recent_30', label: '近30天' }
      ],
      day: null,
      dayList: Array(8)
        .fill(0)
        .map((_, index) => {
          const date = new Date(Date.now() - 86400000 * (index + 2))
          const m = date.getMonth() + 1
          const d = date.getDate()
          return {
            value: `${date.getFullYear()}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
          }
        })
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
      if (this.preset === 'today') {
        return '比昨日'
      }
      if (this.preset === 'yesterday' || this.day) {
        return '比前日'
      }
      if (this.preset === 'recent_7' || this.preset === 'recent_30') {
        return '比上周期'
      }
    },
    timeType() {
      return this.preset ? 'recent_time' : 'day'
    },
    time() {
      return this.preset || this.day
    }
  }
}
