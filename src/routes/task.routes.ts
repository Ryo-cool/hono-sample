import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

const tasks = new Hono();

tasks.use('*', authMiddleware);

tasks.get('/', cacheMiddleware, taskController.getTasks);
tasks.get('/:id', taskController.getTask);
tasks.post('/', zValidator('json', createTaskSchema), taskController.createTask);
tasks.put('/:id', zValidator('json', updateTaskSchema), taskController.updateTask);
tasks.delete('/:id', taskController.deleteTask);

export default tasks; 