module.exports = {
  lintOnSave: false,

  // devServer: {
  //   host: 'mr',
  //   port: 8200
  // },

  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options['compilerOptions'] = {
          ...options.compilerOptions || {},
          isCustomElement: tag => tag.toLowerCase().indexOf("nn-") === 0
        };
        return options;
      })
  }
}
