const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const ThemeColorReplacer = require('webpack-theme-color-replacer')
const generate = require('@ant-design/colors/lib/generate').default

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: config => {
    return {
      plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),

        // 生成仅包含颜色的替换样式（主题色等）
        // TODO 需要增加根据环境不开启主题需求
        new ThemeColorReplacer({
          fileName: 'css/theme-colors-[contenthash:8].css',
          matchColors: getAntdSerials('#1890ff'), // 主色系列
          // 改变样式选择器，解决样式覆盖问题
          changeSelector (selector) {
            switch (selector) {
              case '.ant-calendar-today .ant-calendar-date':
                return ':not(.ant-calendar-selected-date):not(.ant-calendar-selected-day)' + selector
              case '.ant-btn:focus,.ant-btn:hover':
                return '.ant-btn:focus:not(.ant-btn-primary),.ant-btn:hover:not(.ant-btn-primary)'
              case '.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon':
                return ':not(.ant-steps-item-process)' + selector
              case '.ant-btn.active,.ant-btn:active':
                return '.ant-btn.active:not(.ant-btn-primary),.ant-btn:active:not(.ant-btn-primary)'
              case '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover':
              case '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal > .ant-menu-submenu-selected,.ant-menu-horizontal > .ant-menu-submenu:hover':
                return '.ant-menu-horizontal > .ant-menu-item-active,.ant-menu-horizontal > .ant-menu-item-open,.ant-menu-horizontal > .ant-menu-item-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,.ant-menu-horizontal > .ant-menu-submenu-active,.ant-menu-horizontal > .ant-menu-submenu-open,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover'
              case '.ant-menu-horizontal > .ant-menu-item-selected > a':
                return ':not(.ant-menu-horizontal)' + selector
              case '.ant-menu-horizontal > .ant-menu-item > a:hover':
                return ':not(.ant-menu-horizontal)' + selector
              default:
                return selector
            }
          }
        })
      ]
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    host: '192.168.1.100',
    port: 8000,
    proxy: {
      '/api/orgauth': {
        target: 'http://192.168.1.187:8080',
        pathRewrite: {
          '^/api/orgauth': '/orgauth'
        },
        changeOrigin: true
      },
      '/api/org': {
        target: 'http://192.168.1.187:8080',
        pathRewrite: {
          '^/api/org': '/org'
        },
        changeOrigin: true
      },
      '/api/risk': {
        target: 'http://192.168.1.174:9199',
        changeOrigin: true
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

function getAntdSerials (color) {
  // 淡化（即less的tint）
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10)
  })
  const colorPalettes = generate(color)
  return lightens.concat(colorPalettes)
}
