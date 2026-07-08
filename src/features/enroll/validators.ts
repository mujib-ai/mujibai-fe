import * as z from 'zod';

export const enrollFormSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
  company: z.string().min(1, 'Company name is required'),
  website: z.string().url('Invalid website URL').min(1, 'Website is required'),
  address: z.string().min(1, 'Address is required'),
  industry: z.string().min(1, 'Industry is required'),
  commercialRegister: z.string().min(1, 'Commercial register is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
    .min(1, 'Message is required'),
});

export type EnrollmentFormData = z.infer<typeof enrollFormSchema>;
