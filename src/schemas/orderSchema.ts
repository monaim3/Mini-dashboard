import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  productName: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be positive'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export const orderSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email address'),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  totalAmount: z.number().positive('Total amount must be positive'),
  paymentStatus: z.enum(['paid', 'pending', 'refunded']),
  deliveryStatus: z.enum(['pending', 'shipped', 'delivered', 'canceled']),
  deliveryProgress: z.number().min(0).max(100),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  expectedDelivery: z.date(),
  customerFeedback: z.number().min(1).max(5).optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;