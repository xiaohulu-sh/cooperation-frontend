import Vue from 'vue'
import Vuex from 'vuex'
import { setStore } from '@/utils/http'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modulesInitHandlers = []

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  if (value.init) {
    modulesInitHandlers.push(value.init)
  }
  return modules
}, {})

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules
})
setStore(store)
for (const initHandler of modulesInitHandlers) {
  initHandler(store)
}

export default store
