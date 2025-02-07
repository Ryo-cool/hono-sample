import { Context } from 'hono';
import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskInput, UpdateTaskInput } from '../schemas/task.schema';

const tasks: Task[] = [];

export const getTasks = async (c: Context) => {
  const userId = c.get('userId');
  const userTasks = tasks.filter(task => task.userId === userId);
  return c.json(userTasks);
};

export const getTask = async (c: Context) => {
  const userId = c.get('userId');
  const taskId = c.req.param('id');
  const task = tasks.find(t => t.id === taskId && t.userId === userId);

  if (!task) {
    return c.json({ message: 'タスクが見つかりません' }, 404);
  }

  return c.json(task);
};

export const createTask = async (c: Context) => {
  const userId = c.get('userId');
  const data = await c.req.json<CreateTaskInput>();

  const task: Task = {
    id: uuidv4(),
    ...data,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  return c.json(task, 201);
};

export const updateTask = async (c: Context) => {
  const userId = c.get('userId');
  const taskId = c.req.param('id');
  const data = await c.req.json<UpdateTaskInput>();

  const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId);
  if (taskIndex === -1) {
    return c.json({ message: 'タスクが見つかりません' }, 404);
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  return c.json(updatedTask);
};

export const deleteTask = async (c: Context) => {
  const userId = c.get('userId');
  const taskId = c.req.param('id');

  const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId);
  if (taskIndex === -1) {
    return c.json({ message: 'タスクが見つかりません' }, 404);
  }

  tasks.splice(taskIndex, 1);
  return c.json({ message: 'タスクが削除されました' });
}; 