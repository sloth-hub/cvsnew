const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/all", {
      target: "http://localhost:5000",
      changeOrigin: true,
    }),
    createProxyMiddleware("/gs", {
      target: "http://gs25.gsretail.com",
      changeOrigin: true,
      pathRewrite: {
        "^/gs": ""
      }
    })
  );
}