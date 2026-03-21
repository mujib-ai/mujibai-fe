import * as z from 'zod';

export const createUserFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type CreateUserFormValues = z.infer<typeof createUserFormSchema>;
