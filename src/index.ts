import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import auth from './routes/auth.routes';
import tasks from './routes/task.routes';
import docs from './routes/docs.routes';

const app = new Hono();

// ミドルウェアの設定
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// ルートの設定
app.route('/auth', auth);
app.route('/tasks', tasks);
app.route('/docs', docs);

// Swagger UIの設定
app.get('/swagger', swaggerUI({ url: '/docs/openapi.json' }));

// ヘルスチェックエンドポイント
app.get('/', (c) => c.json({ status: 'ok', message: 'Task Manager API is running' }));

// サーバーの起動
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
}); 