const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/invert', {
            target: 'http://api:8000',
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true
        })
    )
};