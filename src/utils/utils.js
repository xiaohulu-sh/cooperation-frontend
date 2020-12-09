export function asyncHelper(promise, { errorHandler = () => false, slient = true } = {}) {
  return promise.catch(function(err) {
    if (!slient) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    return errorHandler(err)
  })
}

const intlNumberFormat = new Intl.NumberFormat()
export function intlFormatNumber(number) {
  return intlNumberFormat.format(number)
}

export function fixNumber(n, fixed) {
  return Number(n.toFixed(fixed))
}

export function parseNumberUnit(n, fixed = 2) {
  let unit = ''
  if (n) {
    n = Number(n)
    if (Math.abs(n) >= 10e7) {
      n = fixNumber(n / 10e7, fixed)
      unit = '亿'
    } else if (Math.abs(n) >= 10000) {
      n = fixNumber(n / 10000, fixed)
      unit = '万'
    } else {
      n = fixNumber(n, fixed)
    }
  }
  return { n, unit }
}

export function formatNumber(n, { fixed, empty = '0' } = {}) {
  if (!n || !Number(n)) {
    return empty
  }
  const formatted = parseNumberUnit(Number(n), fixed)
  return formatted.n + formatted.unit
}

export function valueOfUnit(value, unit = 1, fixed) {
  const num = value / unit
  if (fixed != null) {
    return fixNumber(num, fixed)
  }
  return num
}

export function findMaxIndexes(array) {
  let maxIndexes = []
  let maxValue = null
  for (let i = 0; i < array.length; i++) {
    if (maxValue === null || array[i] === maxValue) {
      maxValue = array[i]
      maxIndexes.push(i)
    } else if (array[i] > maxValue) {
      maxValue = array[i]
      maxIndexes = [i]
    }
  }
  return maxIndexes
}

/**
 * 数值转为dataset，例如: ([[{key1:'1-1',key2:'1-2'},{key1:'2-1',key2:'2-2'}],[{key1:'1-1',key3:'1-3'},{key1:'2-1',key3:'2-3'}]], 'key1') -> [['key1','key2','key3'],['1-1','1-2','1-3'],['2-1','2-2','2-3']]
 */
export function arraysToDataset(arrays, rowKey, { rowKeyFormatter = val => val } = {}) {
  const dataset = []
  const rowIndexMap = new Map()
  if (!Array.isArray(arrays[0])) {
    arrays = [arrays]
  }
  for (const array of arrays) {
    if (!array || !array.length) continue
    const keys = Object.keys(array[0])
    const rowKeyIndex = keys.indexOf(rowKey)
    if (rowKeyIndex === -1) continue
    keys.splice(rowKeyIndex, 1)
    if (dataset.length === 0) {
      dataset.push([rowKey, ...keys])
    } else {
      dataset[0].push(...keys)
    }
    for (const item of array) {
      const rowVal = item[rowKey]
      if (rowVal == null) continue
      let rowIndex = rowIndexMap.get(rowVal)
      if (!rowIndex) {
        dataset.push([rowKeyFormatter(rowVal)])
        rowIndex = dataset.length - 1
        rowIndexMap.set(rowVal, rowIndex)
      }
      dataset[rowIndex].push(...keys.map(key => item[key]))
    }
  }
  return dataset
}

export function onAvatarError(e) {
  const img = e.target || e.srcElement
  if (img) {
    img.onerror = null
    img.src = require('@/assets/user.svg')
  }
}
