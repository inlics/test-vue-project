module.exports = {
  proxyList: {
    '/api': {
	  target: 'http://localhost:8086/',
	  changeOrigin: true,
	  pathRewrite: {
	    '^/api': ''
	  }
	}
  }
}
