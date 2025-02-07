import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  status: z.enum(['pending', 'completed']).default('pending'),
  dueDate: z.string().datetime(),
  userId: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const createTaskSchema = taskSchema.omit({ id: true, userId: true, createdAt: true, updatedAt: true });
export const updateTaskSchema = taskSchema.partial().omit({ id: true, userId: true, createdAt: true, updatedAt: true });

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>; 