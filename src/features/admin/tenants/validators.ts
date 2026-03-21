import * as z from 'zod';

const websiteRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const tenantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  website: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      value =>
        !value ||
        websiteRegex.test(
          value.startsWith('http://') || value.startsWith('https://')
            ? value
            : `https://${value}`
        ),
      {
        message: 'Invalid URL',
      }
    ),
  industry: z.string().min(1, 'Industry is required'),
  planId: z.string().min(1, 'Plan is required'),
  size: z.string().min(1, 'Company size is required'),
  commercialRegister: z.string().min(1, 'Commercial Register is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  description: z.string().optional(),
});

export type TenantFormValues = z.infer<typeof tenantSchema>;

export const INDUSTRY_OPTIONS = [
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
];

export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201+', label: '201+' },
];
