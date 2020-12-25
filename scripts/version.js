const fs = require('fs')
const path = require('path')

exports.getVersion = function() {
  let files
  try {
    files = fs.readdirSync(path.resolve(__dirname, '../.git/refs/tags'))
    // eslint-disable-next-line no-empty
  } catch (err) {}
  if (!files || !(files.length > 0)) return ''

  const versions = files.map(v => {
    const n = v
      .replace(/v/gi, '')
      .split('.')
      .reduce(function(n, s, i) {
        return n + (Number(s) || 0) / Math.pow(10, i)
      }, 0)

    return {
      n: Math.round(n * 10e3) / 10e3,
      origin: v
    }
  })
  const values = versions.map(({ n }) => n)
  return versions[values.indexOf(Math.max(...values))]?.origin || ''
}
