import * as z from 'zod';

// signup schema
export const signupSchema = z.object({
  name: z
    .string()
    .nonempty({ error: 'Name is required' })
    .min(5, { error: 'At least 5 characters' })
    .max(15, { error: 'At most 15 characters' }),
  email: z
    .string()
    .nonempty({ error: 'Email is required' })
    .email({
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      error: 'Invalid email format',
    }),
  password: z.string().nonempty({ error: 'Password is required' }),
});
// signup schema type
export type signupSchemaType = z.infer<typeof signupSchema>;

// signin schema
export const signinSchema = z.object({
  email: z
    .string()
    .nonempty({ error: 'Email is required' })
    .email({
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      error: 'Invalid email format',
    }),
  password: z.string().nonempty({ error: 'Password is required' }),
});
// signin schema type
export type signinSchemaType = z.infer<typeof signinSchema>;
