const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = 'http://localhost:5000';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/' // Remove /api prefix when forwarding to backend
      }
    })
  );
  
  app.use(
    '/register',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
  
  app.use(
    '/login',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
  
  app.use(
    '/users',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
