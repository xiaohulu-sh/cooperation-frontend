export function createBar1(data, { interval = 'auto', unit = '', barMinHeight = 2 } = {}) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: parm => {
        const a = parm[0].data
        return `${a[2] || a[0]}<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7C6AF2;"></span>${a[1]}${unit}`
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      height: '90%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        splitNumber: 6,
        axisTick: {
          show: false
        },
        axisLabel: {
          interval
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: '#EBECF0'
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        data,
        barMaxWidth: 40,
        barMinHeight,
        itemStyle: {
          normal: {
            barBorderRadius: [40, 40, 0, 0],
            color: '#7C6AF2'
          }
        }
      }
    ]
  }
}

export function createBar2(dataset, { unit = '' } = {}) {
  return {
    dataset: {
      source: dataset
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: parm => {
        const a = parm[0].data
        return `${a[0]}<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7C6AF2;"></span>${a[1]}${unit}`
      }
    },
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLabel: { color: '#666' },
      axisLine: {
        lineStyle: {
          color: '#C4C6CF'
        }
      },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: {
      type: 'bar',
      barMaxWidth: 15,
      itemStyle: {
        normal: {
          barBorderRadius: [0, 40, 40, 0],
          color: '#7C6AF2'
        }
      }
    }
  }
}
