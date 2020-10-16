export function createWordCloud1(data) {
  return {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      show: false
    },
    series: [
      {
        type: 'wordCloud',
        gridSize: 1,
        sizeRange: [12, 65],
        rotationRange: [-90, 90],
        autoSize: {
          minsize: 6,
          maxsize: 30
        },
        shape: 'circle',
        // maskImage: maskImage,
        textStyle: {
          normal: {
            color: function() {
              return 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')'
            }
          },
          emphasis: {
            // 鼠标划入样式
            shadowBlur: 10, // 文字阴影模糊度
            shadowColor: '#333' // 文字阴影颜色
          }
        },
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        data
      }
    ]
  }
}
