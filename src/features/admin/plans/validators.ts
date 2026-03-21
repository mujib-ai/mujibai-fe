import * as z from 'zod';

export const createPlanSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  type: z.enum(['monthly', 'yearly']),
  features: z.array(z.string()),
});

export const createPlanSchemaWithT = (
  t: (key: string, values?: any) => string
) =>
  z.object({
    title: z.string().min(1, t('required')),
    description: z.string().min(1, t('required')),
    price: z.string().min(1, t('required')),
    type: z.enum(['monthly', 'yearly']),
    features: z.array(z.string()),
  });

export const updatePlanSchemaWithT = (
  t: (key: string, values?: any) => string
) =>
  z.object({
    title: z.string().min(1, t('required')),
    description: z.string().min(1, t('required')),
    price: z.string().min(1, t('required')),
    type: z.enum(['monthly', 'yearly']),
    features: z.array(z.string()),
  });
