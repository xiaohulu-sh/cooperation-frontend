import { formatNumber } from '@/utils/utils'

const defaultColors = ['#F96953', '#6872F5', '#28D3EF', '#FF6383', '#9F94F1', '#FFB82C', '#ED6AB1', '#B1E621', '#FFBC85', '#F8CBF6', '#FFDE6E', '#D3EAFF', '#F6F9D9']

export function createPie1(data, { legend = true, showDataType, unit = '', color = defaultColors, label } = {}) {
  return {
    legend: {
      show: legend,
      left: 'center',
      icon: 'circle',
      bottom: 10,
      textStyle: {
        color: '#666'
      }
    },
    tooltip: {
      formatter: showDataType == 'scale' ? '{b}: ' + ' {d}%' : '{b}: {c}' + unit + ' ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        color,
        label: label || {
          show: true,
          formatter: showDataType == 'scale' ? '{d}%' : '{c}' + unit,
          color: '#666'
        },
        minAngle: 20,
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

export function createPie2(data, { showDataType, showLabel = true, labelFormatter = '{b}', type1 = '', unit = '', legend = true, size, color = defaultColors } = {}) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        if (showDataType == 'scale') {
          return params.name + ': ' + params.percent + '%'
        }
        if (type1) {
          return params.name + ': <br/> ' + type1 + '：' + formatNumber(params.value) + unit + ' <br/>占比：' + params.percent + '%'
        }
        return params.name + ': ' + formatNumber(params.value) + unit + ' (' + params.percent + '%)'
      }
    },
    legend: {
      show: legend,
      orient: 'vertical',
      icon: 'circle',
      top: 'center',
      right: 0,
      textStyle: {
        color: '#666'
      }
    },
    series: [
      {
        type: 'pie',
        radius: size == 'lg' ? ['45%', '75%'] : ['30%', '60%'],
        center: legend ? ['35%', '50%'] : ['50%', '50%'],
        avoidLabelOverlap: false,
        color,
        minAngle: 15,
        label: {
          normal: {
            show: showLabel,
            formatter: labelFormatter,
            position: 'outside'
          },
          emphasis: {
            show: showLabel,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            }
          }
        },
        data
      }
    ]
  }
}
