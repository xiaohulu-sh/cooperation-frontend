<template>
  <div :class="$style.container">
    <div ref="chart" :class="{ [$style.chart]: true, [$style.hidden]: isEmpty }"></div>
    <a-empty v-if="isEmpty" description="暂无数据" />
    <a-spin v-if="loading" />
  </div>
</template>

<script>
export default {
  props: {
    chartData: [Object, Function],
    loading: Boolean
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
    this.chart = this.echarts.init(this.$refs.chart)
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
.container {
  position: relative;
  :global {
    .ant-empty,
    .ant-spin {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.chart {
  width: 100%;
  height: 100%;
}
.hidden {
  visibility: hidden;
}
</style>
