import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 