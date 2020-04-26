module.exports = {
  dev: {
    proxyTable: {
      '/': {
        target: 'http://localhost:8791',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      },
      '/ws/*': {
        target: 'ws://127.0.0.1:8791',
        ws: true
      }
    }
  }
}
