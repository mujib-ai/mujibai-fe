import * as z from 'zod';

export const enrollFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name must be at most 255 characters'),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .min(2, 'Phone must be at least 2 characters')
    .max(50, 'Phone must be at most 50 characters'),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(255, 'Company name must be at most 255 characters'),
  companyWebsite: z
    .string()
    .min(2, 'Company website must be at least 2 characters')
    .max(492, 'Company website must be at most 492 characters'),
  address: z
    .string()
    .min(2, 'Address must be at least 2 characters')
    .max(500, 'Address must be at most 500 characters'),
  businessField: z
    .string()
    .min(2, 'Business field must be at least 2 characters')
    .max(255, 'Business field must be at most 255 characters'),
  commercialRegister: z
    .string()
    .max(255, 'Commercial register must be at most 255 characters')
    .optional()
    .refine(
      val => !val || val.length >= 2,
      'Commercial register must be at least 2 characters'
    ),
  taxNumber: z
    .string()
    .max(255, 'Tax number must be at most 255 characters')
    .optional()
    .refine(
      val => !val || val.length >= 2,
      'Tax number must be at least 2 characters'
    ),
  message: z
    .string()
    .max(2000, 'Message must be at most 2000 characters')
    .optional()
    .refine(
      val => !val || val.length >= 2,
      'Message must be at least 2 characters'
    ),
});

export type EnrollmentFormData = z.infer<typeof enrollFormSchema>;
