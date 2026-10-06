import { z } from 'zod';

export const createAlertSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  arena: z.enum(['north', 'south', 'center']),
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
});

export const updateAlertSchema = z.object({
  displayName: z.string().optional(),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  arena: z.enum(['north', 'south', 'center']).optional(),
  status: z.enum(['active', 'handled', 'falseAlarm']).optional(),
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
});

export const registerSchema = z.object({
  userName: z.string(),
  password: z.string(),
  email: z.email(),
  role: z.enum(['arenaUser', 'generalUser', 'admin']),
  assignedArena: z.enum(['north', 'south', 'center', 'all']),
});

export const loginSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export function validateSchema(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0].message;
    const error = new Error(message);
    error.status = 400;
    throw error;
  }

  body = result.data;
}
