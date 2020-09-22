<template>
  <div :class="{ [$style.empty]: isEmpty }"></div>
</template>

<script>
export default {
  props: {
    chartData: [Object, Function]
  },
  data() {
    return {
      mounted: false
    }
  },
  computed: {
    echartOption() {
      if (!this.mounted) return null
      let option = this.chartData
      if (typeof option === 'function') {
        option = option(this.chart)
      }
      return option || null
    },
    isEmpty() {
      if (!this.echartOption) return false
      const { dataset } = this.echartOption
      if (dataset) return !dataset.source || !dataset.source.length
      const { series } = this.echartOption
      if (!series) return true
      if (series[0]) return !series[0].data || !series[0].data.length
      return !series.data || !series.data.length
    }
  },
  watch: {
    echartOption: {
      handler(option) {
        if (option) {
          this.chart.setOption(option, true)
        } else {
          this.chart.clear()
        }
      }
    }
  },
  mounted() {
    this.chart = this.echarts.init(this.$el)
    this.mounted = true
    this.$once('hook:beforeDestroy', () => {
      if (!this.chart) return
      this.chart.dispose()
      this.chart = null
    })
  }
}
</script>

<style lang="less" module>
.empty {
  position: relative;
  canvas {
    visibility: hidden;
  }
  &::before {
    content: '暂无数据';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #909399;
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>
