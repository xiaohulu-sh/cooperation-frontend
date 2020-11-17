const vmMap = new WeakMap()
const intersectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    vmMap.get(entry.target).visible = entry.isIntersecting
  }
})
intersectionObserver.USE_MUTATION_OBSERVER = false

export default {
  data() {
    return {
      visible: false,
      dataChanged: true
    }
  },
  computed: {
    shouldRender() {
      return this.visible || !this.dataChanged
    }
  },
  watch: {
    visible(visible) {
      if (visible) {
        this.dataChanged = false
      }
    },
    data() {
      if (!this.visible) this.dataChanged = true
    }
  },
  mounted() {
    vmMap.set(this.$el, this)
    intersectionObserver.observe(this.$el)
    this.$once('hook:beforeDestroy', () => {
      intersectionObserver.unobserve(this.$el)
      vmMap.delete(this.$el)
    })
  }
}
