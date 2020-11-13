module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        polyfills: ['es.promise', 'es.object.assign', 'es.array.includes', 'es.array.find', 'es.array.fill']
      }
    ]
  ],
  plugins: [['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }]]
}
