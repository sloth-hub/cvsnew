const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/all", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  ),
    app.use(
      createProxyMiddleware("/all", {
        target: "https://cvsnew.herokuapp.com",
        changeOrigin: true,
      })
    ),
    app.use(
      createProxyMiddleware("/update", {
        target: "http://localhost:5000",
        changeOrigin: true,
      })
    ),
    app.use(
      createProxyMiddleware("/update", {
        target: "https://cvsnew.herokuapp.com",
        changeOrigin: true,
      })
    )
}