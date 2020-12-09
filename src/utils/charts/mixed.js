import { valueOfUnit, findMaxIndexes, fixNumber } from '@/utils/utils'
import cloneDeep from 'lodash/cloneDeep'
import { getWidth } from 'zrender/lib/contain/text'

function checkDataset(dataset) {
  if (!dataset) return null
  if (!dataset.length) return { dataset: null }
  return true
}

function removeEmptyData(dataset, keys = [], { unit = 1, fixed } = {}) {
  if (!dataset || !dataset.length || keys.length === 0) return dataset
  const keyIndexes = keys.map(key => dataset[0].indexOf(key))
  dataset = dataset.slice().filter((arr, index) => index === 0 || keyIndexes.some(keyIndex => !!valueOfUnit(arr[keyIndex], unit, fixed)))
  return dataset.length === 1 ? [] : dataset
}

function datasetWithUnit(dataset, fields, units) {
  if (!units || !units.length) return dataset
  const valueIndexes = fields.map(key => {
    const index = dataset[0].indexOf(key)
    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('找不到对应的字段，请确保fields传入正确')
    }
    return index
  })
  dataset = cloneDeep(dataset)
  for (let i = 1; i < dataset.length; i++) {
    for (let j = 0; j < valueIndexes.length; j++) {
      const { unit, fixed } = units[j] || {}
      const index = valueIndexes[j]
      dataset[i][index] = valueOfUnit(dataset[i][index], unit, fixed)
    }
  }
  return dataset
}

function sortDataset(dataset, sortKey) {
  const valueIndex = dataset[0].indexOf(sortKey)
  return dataset.slice().sort((a, b) => b[valueIndex] - a[valueIndex])
}

function getEchartsFontString({ fontStyle = 'normal', fontWeight = 'normal', fontSize = 12, fontFamily = 'sans-serif' }) {
  return [fontStyle, fontWeight, fontSize + 'px', fontFamily].join(' ')
}

// 自动设置底部距离和文字倾斜
function handleXAuto(chart, dataset, encode, grid, xAxisLabel, { bottomOffset = 0, yLabelWidth = 0, rotate = 30 } = {}) {
  if (!dataset.length || dataset.length < 2) return
  const categoryIndex = dataset[0].indexOf(encode.x)
  if (categoryIndex === -1) return
  xAxisLabel.interval = 0
  const maxWidth = Math.max(...dataset.slice(1).map(a => getWidth(a[categoryIndex] || '', getEchartsFontString(xAxisLabel))))
  if (maxWidth > (chart.getWidth() - (grid.left + grid.right + yLabelWidth || 0)) / (dataset.length - 1)) {
    xAxisLabel.rotate = rotate
    grid.bottom += bottomOffset
  }
}

const tooltipStyles = {
  backgroundColor: 'rgba(255,255,255,0.95)',
  padding: [6, 20],
  textStyle: {
    color: '#666',
    fontSize: 12
  },
  extraCssText: 'line-height:30px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);'
}

export function createMixedChartData(
  dataset,
  encodeList,
  {
    fieldNames = {},
    showLegend = false,
    grid: gridOrigin = {
      top: 30,
      left: 20,
      right: 20,
      bottom: showLegend ? 60 : 20,
      containLabel: true
    },
    xAuto = { bottomOffset: -20 },
    xAxisLabel: xLabelOrigin = { color: '#666' },
    yAxisLabel = { color: '#666' },
    yAxisFormatters = [],
    yAxisSplitNumber = 5,
    yAxisRanges = [],
    getType = () => 'bar',
    units = [],
    tooltipValFormatter = value => value,
    sortKey,
    extraTooltips = []
  } = {}
) {
  dataset = removeEmptyData(
    dataset,
    encodeList.map(encode => encode.y)
  )
  const ret = checkDataset(dataset)
  if (ret !== true) return ret

  dataset = datasetWithUnit(
    dataset,
    encodeList.map(({ y }) => y),
    units
  )

  if (sortKey) {
    dataset = sortDataset(dataset, sortKey)
  }

  return function(chart) {
    const yAxis = encodeList.map((encode, index) => {
      let min, max
      if (yAxisRanges[index]) {
        ;({ min, max } = yAxisRanges[index])
      } else {
        const fieldIndex = dataset[0].indexOf(encode.y)
        const data = dataset.slice(1).map(a => a[fieldIndex] || 0)
        let minValue = Math.min(...data) || 0
        let maxValue = Math.max(...data) || 0
        if (minValue === 0 && maxValue === 0) {
          min = 0
          max = yAxisSplitNumber
        } else {
          if (minValue > 0) {
            minValue = 0
          }
          const multi = Math.pow(10, (maxValue - minValue || 0).toFixed(0).length - 2)
          // 最小值*0.95，防止最小值与坐标轴最小值重叠
          min = Math.floor((minValue / multi) * 0.95) * multi
          // 最大值*1.05，防止最大值与坐标轴最大值重叠
          max = Math.ceil((maxValue / multi) * 1.05) * multi
          if (max - min > yAxisSplitNumber) {
            max = min + Math.ceil((max - min) / yAxisSplitNumber) * yAxisSplitNumber
          }
        }
      }

      return {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: '#F2F3F7' } },
        axisLabel: {
          ...yAxisLabel,
          formatter:
            yAxisFormatters[index] ||
            (units[index] && units[index].unit === 10000
              ? value => {
                  return value ? fixNumber(value, 1) + '万' : fixNumber(value, 1)
                }
              : value => fixNumber(value, 1))
        },
        splitNumber: yAxisSplitNumber,
        min,
        max,
        interval: (max - min) / yAxisSplitNumber
      }
    })

    // 防止闭包导致多次调用时值被叠加修改
    const grid = { ...gridOrigin }
    const xAxisLabel = { ...xLabelOrigin }
    if (xAuto) {
      handleXAuto(chart, dataset, encodeList[0], grid, xAxisLabel, xAuto)
    }

    return {
      dataset: {
        source: dataset
      },
      grid,
      color: ['#E4E4FF', '#FF5E66'],
      legend: showLegend
        ? {
            left: 'center',
            bottom: 16,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 37,
            textStyle: { color: '#666' }
          }
        : false,
      xAxis: {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: xAxisLabel
      },
      yAxis,
      tooltip: {
        ...tooltipStyles,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: { color: 'rgba(200,200,200,0.2)' }
        },
        formatter(paramsList) {
          let html = paramsList[0].name
          for (let i = 0; i < paramsList.length; i++) {
            const { color, dimensionNames, value, encode } = paramsList[i]
            html += `<br><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span> ${fieldNames[dimensionNames[encode.y[0]]] || dimensionNames[encode.y[0]]}<span style="margin-left:20px;font-weight:bold;">${tooltipValFormatter(value[encode.y[0]], i)}</span>`
          }
          for (let i = 0; i < extraTooltips.length; i++) {
            const { key, unit, fixed } = extraTooltips[i]
            html += `<br><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ccc;"></span> ${fieldNames[key] || key}<span style="margin-left:20px;font-weight:bold;">${tooltipValFormatter(
              valueOfUnit(paramsList[0].data[paramsList[0].dimensionNames.indexOf(key)], unit, fixed) || 0,
              i + paramsList.length
            )}</span>`
          }
          return html
        }
      },
      series: encodeList.map((encode, index) => {
        const type = getType(index)
        if (type === 'line') {
          return {
            type,
            encode,
            name: fieldNames[encode.y] || encode.y,
            yAxisIndex: index,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#FF5E66',
              borderColor: '#fff'
            }
          }
        }

        const fieldIndex = dataset[0].indexOf(encode.y)
        const maxIndexes = findMaxIndexes(dataset.slice(1).map(a => a[fieldIndex]))
        return {
          type,
          encode,
          name: fieldNames[encode.y] || encode.y,
          yAxisIndex: index,
          barWidth: 10,
          itemStyle: {
            barBorderRadius: [5, 5, 0, 0],
            color(params) {
              return maxIndexes.includes(params.dataIndex) ? '#9F94F1' : '#E4E4FF'
            }
          }
        }
      })
    }
  }
}
