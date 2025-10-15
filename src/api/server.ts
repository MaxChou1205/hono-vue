import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import feeds from './routes/feeds';
import hello from './routes/hello';

const app = new Hono();

app.use('*', cors());

app.route('/api', hello).route('/api', feeds);

const port = 3005;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
