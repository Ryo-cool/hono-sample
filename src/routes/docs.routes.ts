import { OpenAPIHono } from '@hono/zod-openapi';
import { registerRoute, loginRoute, getTasksRoute, createTaskRoute } from '../schemas/openapi.schema';

const docs = new OpenAPIHono();

// OpenAPI仕様の設定
docs.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'タスク管理APIのドキュメント',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '開発サーバー',
    },
  ],
  security: [
    {
      Bearer: [],
    },
  ],
});

// ルートの登録
docs.openapi(registerRoute, async (c) => {
  const { username, password } = await c.req.json();
  return c.json({ message: 'ユーザー登録成功', userId: '123' });
});

docs.openapi(loginRoute, async (c) => {
  const { username, password } = await c.req.json();
  return c.json({ token: 'jwt-token' });
});

docs.openapi(getTasksRoute, async (c) => {
  return c.json([]);
});

docs.openapi(createTaskRoute, async (c) => {
  const data = await c.req.json();
  return c.json({ ...data, id: '123', status: 'pending' }, 201);
});

export default docs; 