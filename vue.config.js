const path = require('path')
const webpack = require('webpack')

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
      },
      less: {
        modifyVars: {
          'primary-color': '#736af2',
          'link-color': '#736af2',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/ant-design-vue/icons.js')
      }
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    performance: {
      maxEntrypointSize: 2097152,
      maxAssetSize: 1048576
    }
  },
  chainWebpack(config) {
    // 自定义打包组合
    config.optimization.splitChunks({
      name: !isProd,
      cacheGroups: {
        vue: {
          // 当前@vue/cli-service带的html-webpack-plugin版本(3.x)有bug，设置name为false时，build的时候chunk没有正确的添加到html中
          name: 'vue',
          test: /[\\/]node_modules[\\/](?:vue|vue-router|vuex)[\\/]/,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true
        },
        echarts: {
          name: 'echarts',
          test: /[\\/](?:node_modules|local_modules)[\\/](?:echarts|zrender)[\\/]/,
          chunks: 'all',
          priority: 4,
          reuseExistingChunk: true,
          enforce: true
        },
        uilib: {
          name: 'uilib',
          test: /[\\/]node_modules[\\/](?:element-ui|ant-design-vue|@ant-design|view-design)[\\/]|[\\/]src[\\/]element-ui-theme[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        common: {
          name: true,
          chunks: 'all',
          minChunks: 2,
          minSize: 1,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })
  },
  devServer: {
    port: 8081
  }
}
