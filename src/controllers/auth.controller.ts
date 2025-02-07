import { Context } from 'hono';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { User, LoginInput } from '../schemas/user.schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const users: User[] = [];

export const register = async (c: Context) => {
  const data = await c.req.json();
  
  const existingUser = users.find(u => u.username === data.username);
  if (existingUser) {
    return c.json({ message: 'ユーザー名は既に使用されています' }, 400);
  }

  const user: User = {
    id: uuidv4(),
    username: data.username,
    password: data.password, // 注: 実際のアプリケーションではパスワードをハッシュ化する必要があります
  };

  users.push(user);
  return c.json({ message: 'ユーザーが登録されました', userId: user.id });
};

export const login = async (c: Context) => {
  const data = await c.req.json<LoginInput>();
  
  const user = users.find(u => u.username === data.username && u.password === data.password);
  if (!user) {
    return c.json({ message: 'ユーザー名またはパスワードが正しくありません' }, 401);
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return c.json({ token });
}; 