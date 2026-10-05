import { z } from 'zod';

export const createAlertSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  arena: z.enum(['north', 'south', 'center']),
  lon: z.number(),
  lat: z.number(),
});

export const updateAlertSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  arena: z.enum(['north', 'south', 'center']),
  status: z.enum(['active', 'in-progress', 'handled']),
  lon: z.number(),
  lat: z.number(),
});

export function validateSchema(schema, body) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0].message;
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
}
