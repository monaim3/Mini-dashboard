import { z } from 'zod';

export const productSchema = z.object({
  productName: z.string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters'),
  sku: z.string()
    .min(1, 'SKU is required')
    .transform(val => val.toUpperCase()),
  category: z.string()
    .min(1, 'Category is required'),
  price: z.string()
    .min(1, 'Price is required')
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Price must be a positive number'
    }),
  stockQuantity: z.string()
    .min(1, 'Stock quantity is required')
    .refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: 'Stock quantity must be 0 or greater'
    }),
  description: z.string().optional(),
  productImage: z.string().optional(),
  isActive: z.boolean().default(true)
});

export type ProductFormData = z.infer<typeof productSchema>;