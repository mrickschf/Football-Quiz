import "dotenv/config";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;
// Charge la clé d'API depuis .env

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.football-data.org",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("X-Auth-Token", API_KEY);
    },
  })
);

const PORT = import.meta.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
