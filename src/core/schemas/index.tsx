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

// forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty()
    .email({
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      error: 'Invalid email format',
    }),
});
// forgot password schema type
export type forgotPasswordSchemaType = z.infer<
  typeof forgotPasswordSchema
>;

// new password schema
export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty({ error: 'Password is required' }),
    confirmPassword: z
      .string()
      .nonempty({ error: 'Confirm Password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords Doesn't match",
    path: ['confirmPassword'],
  });
// new password schema type
export type newPasswordSchemaType = z.infer<typeof newPasswordSchema>;
