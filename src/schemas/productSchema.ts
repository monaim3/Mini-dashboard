import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stockQuantity: z.number().min(0, 'Stock quantity cannot be negative'),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;