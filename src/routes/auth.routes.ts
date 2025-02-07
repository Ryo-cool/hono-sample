import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { userSchema, loginSchema } from '../schemas/user.schema';
import * as authController from '../controllers/auth.controller';

const auth = new Hono();

auth.post('/register', zValidator('json', userSchema), authController.register);
auth.post('/login', zValidator('json', loginSchema), authController.login);

export default auth; 