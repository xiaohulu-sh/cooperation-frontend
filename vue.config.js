const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: isProd ? '[hash:6]' : '[name]__[local]_[hash:6]'
        }
      }
    }
  },
  devServer: {
    port: 8081
  }
}
