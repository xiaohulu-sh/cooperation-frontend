const storageKey = 'selectedStars'

function parseStorage() {
  const value = localStorage.getItem(storageKey)
  if (value) {
    try {
      const hash = JSON.parse(value)
      if (hash) {
        return hash
      }
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  return {}
}

export default {
  namespaced: true,
  state: {
    hash: parseStorage()
  },
  getters: {
    list({ hash }) {
      return Object.keys(hash).map(key => {
        const [platform, room] = key.split('/')
        return {
          id: key,
          platform,
          room,
          coopType: hash[key]
        }
      })
    }
  },
  mutations: {
    add(state, { id, coopType = 1 }) {
      const hash = parseStorage()
      hash[id] = coopType
      state.hash = hash
    },
    remove(state, id) {
      const hash = parseStorage()
      delete hash[id]
      state.hash = hash
    },
    removeMany(state, ids) {
      const hash = parseStorage()
      ids.forEach(id => {
        delete hash[id]
      })
      state.hash = hash
    },
    sync(state) {
      const hash = parseStorage()
      if (JSON.stringify(hash) !== JSON.stringify(state.hash)) {
        state.hash = hash
      }
    }
  }
}

export function init(store) {
  let lastStorageValue = localStorage.getItem(storageKey)
  store.watch(
    ({ selected: { hash } }) => hash,
    hash => {
      if (Object.keys(hash).length === 0) {
        localStorage.removeItem(storageKey)
      } else {
        lastStorageValue = JSON.stringify(hash)
        localStorage.setItem(storageKey, lastStorageValue)
      }
    }
  )
  setInterval(() => {
    if (localStorage.getItem(storageKey) !== lastStorageValue) {
      store.commit('selected/sync')
    }
  }, 1000)
}
