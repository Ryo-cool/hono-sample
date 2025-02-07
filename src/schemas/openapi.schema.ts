import { createRoute, z } from '@hono/zod-openapi';

// 認証関連のスキーマ
export const registerRoute = createRoute({
  method: 'post',
  path: '/auth/register',
  tags: ['認証'],
  description: '新規ユーザーを登録します',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            username: z.string().min(3).max(50).describe('ユーザー名'),
            password: z.string().min(6).describe('パスワード'),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            userId: z.string(),
          }),
        },
      },
      description: 'ユーザー登録成功',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'バリデーションエラー',
    },
  },
});

export const loginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  tags: ['認証'],
  description: 'ユーザー認証を行い、JWTトークンを取得します',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            username: z.string().describe('ユーザー名'),
            password: z.string().describe('パスワード'),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            token: z.string(),
          }),
        },
      },
      description: 'ログイン成功',
    },
    401: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: '認証エラー',
    },
  },
});

// タスク関連のスキーマ
export const getTasksRoute = createRoute({
  method: 'get',
  path: '/tasks',
  tags: ['タスク'],
  description: 'ユーザーのタスク一覧を取得します',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            status: z.enum(['pending', 'completed']),
            dueDate: z.string().datetime(),
            userId: z.string(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          })),
        },
      },
      description: 'タスク一覧取得成功',
    },
    401: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: '認証エラー',
    },
  },
});

export const createTaskRoute = createRoute({
  method: 'post',
  path: '/tasks',
  tags: ['タスク'],
  description: '新しいタスクを作成します',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            title: z.string().min(1).max(100).describe('タスクのタイトル'),
            description: z.string().max(500).describe('タスクの説明'),
            dueDate: z.string().datetime().describe('期限日時'),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            status: z.enum(['pending', 'completed']),
            dueDate: z.string().datetime(),
            userId: z.string(),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
      description: 'タスク作成成功',
    },
    400: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'バリデーションエラー',
    },
    401: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: '認証エラー',
    },
  },
}); 