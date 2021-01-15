const fs = require('fs')
const path = require('path')

exports.getVersion = function() {
  let files
  try {
    files = fs.readdirSync(path.resolve(__dirname, '../.git/refs/tags'))
    // eslint-disable-next-line no-empty
  } catch (err) {}
  if (!files || !(files.length > 0)) return ''

  const versions = files
    .map(v => ({
      arr: v
        .replace(/v/gi, '')
        .split('.')
        .map(v => Number(v)),
      origin: v
    }))
    .sort(({ arr: a }, { arr: b }) => {
      const len = Math.max(a.length, b.length)
      for (let i = 0; i < len; i++) {
        const n1 = a[i] || 0
        const n2 = b[i] || 0
        if (n1 === n2) continue
        return n1 > n2 ? -1 : 1
      }
      return 0
    })
  return versions[0]?.origin || ''
}
