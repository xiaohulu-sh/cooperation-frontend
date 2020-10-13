import { formatNumber } from '@/utils/utils'

export function createLine1(data, { unit = '' } = {}) {
  return {
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      height: '90%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const data = params[0].data
        return `${data[2] || data[0]}<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#736AF2;"></span>${formatNumber(data[1])}${unit}`
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
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
      },
      axisLabel: {
        formatter: params => formatNumber(params)
      }
    },
    series: {
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      smooth: true,
      data,
      lineStyle: {
        //线条样式。
        normal: {
          width: 1,
          color: '#736AF2'
        }
      },
      itemStyle: {
        //折线拐点标志的样式。
        normal: {
          color: '#736AF2'
        }
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(171, 163, 250, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 1)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
    }
  }
}
