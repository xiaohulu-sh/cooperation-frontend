export function createPie1(data, { legend = true, showDataType, unit = '', color = ['#F96953', '#6872F5', '#28D3EF', '#FF6383', '#9F94F1', '#FFB82C', '#ED6AB1', '#B1E621', '#FFBC85', '#F8CBF6', '#FFDE6E', '#D3EAFF', '#F6F9D9'], label } = {}) {
  return {
    legend: {
      show: legend,
      left: 'center',
      icon: 'circle',
      bottom: 10,
      textStyle: {
        color: '#333333'
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
          color: '#333333'
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
