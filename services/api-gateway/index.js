require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/api/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '/auth' },
}));

app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCTS_SERVICE,
  changeOrigin: true,
  pathRewrite: { '^/api/products': '/products' },
}));

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    services: {
      auth: process.env.AUTH_SERVICE,
      products: process.env.PRODUCTS_SERVICE,
    }
  });
});

app.listen(process.env.PORT, () => console.log(`✅ API Gateway running on port ${process.env.PORT}`));