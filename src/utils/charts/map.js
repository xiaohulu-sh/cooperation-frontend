let registered = false
export async function registerMap(echarts) {
  if (registered) return
  echarts.registerMap('china', await import('./china.json'))
  registered = true
}

export function createChinaMap1(data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: function({ name, value }) {
        return `${name}: ${isNaN(value) ? 0 : value}`
      }
    },
    visualMap: {
      show: false,
      pieces: [
        { gt: 85, color: '#5F83F9' },
        { gt: 60, lte: 85, color: '#AAB2FC' },
        { gt: 0, lte: 60, color: '#D7E1FE' }
      ]
    },
    series: {
      type: 'map',
      mapType: 'china',
      emphasis: {
        label: { color: '#333' }
      },
      data
    }
  }
}
