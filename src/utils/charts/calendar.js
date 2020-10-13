export function createCalendar1(data) {
  let max = 0
  data.forEach(item => {
    if (item[1]) {
      const value = Number(item[1])
      if (max < value) {
        max = value
      }
    }
  })

  return {
    tooltip: {
      width: '90%',
      left: '5%',
      right: '5%',
      formatter: ({ value: [date, val] }) => `${date}: ${val}个作品`
    },
    visualMap: {
      min: 0,
      max,
      type: 'piecewise',
      orient: 'horizontal',
      right: 30,
      top: 30,
      pieces: [
        { min: 0, max: 0, label: '0个作品' },
        { min: 1, max: 1, label: '1个作品' },
        { min: 2, max: 5, label: '2-5个作品' },
        { min: 5, label: '5个以上作品' }
      ],
      textStyle: {
        color: '#333'
      },
      inRange: {
        color: ['#F7F6FF', '#736AF2']
      }
    },
    calendar: [
      {
        top: 100,
        left: 50,
        right: 30,
        orient: 'horizontal',
        cellSize: [20, 18],
        splitLine: {
          lineStyle: {
            color: '#fff'
            // width: 4
          }
        },
        itemStyle: {
          color: '#F7F6FF',
          borderColor: '#fff',
          borderWidth: 3
        },
        yearLabel: {
          show: true,
          position: 'bottom'
        },
        monthLabel: {
          show: true,
          firstDay: 1,
          nameMap: 'cn',
          margin: 10,
          color: '#666'
        },
        dayLabel: {
          show: true,
          firstDay: 1,
          margin: 10,
          nameMap: ['日', '一', '二', '三', '四', '五', '六'],
          color: '#666'
        },
        range: new Date().getFullYear()
      }
    ],
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data
    }
  }
}
