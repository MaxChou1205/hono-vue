import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import feeds from './routes/feeds';
import hello from './routes/hello';

const isProd = process.env.NODE_ENV === 'production';
const app = new Hono();

app.use('*', cors());

// API 路由
const routes = app.route('/api', hello).route('/api', feeds);

// ⭐ Production 模式配置
if (isProd) {
  console.log('Production mode');

  // 1. 服務靜態資源檔案（CSS, JS, 圖片等）
  app.use('/assets/*', serveStatic({ root: './dist/client' }));

  // 2. 處理所有其他請求，返回 index.html（SPA fallback）
  app.get(
    '*',
    serveStatic({
      path: './dist/client/index.html',
    }),
  );
}

export default {
  port: Number(process.env.PORT) || 3005,
  fetch: app.fetch,
};
export type RoutesController = typeof routes;
