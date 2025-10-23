export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderId: string;
  clientName: string;
  clientEmail: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  deliveryStatus: 'pending' | 'shipped' | 'delivered' | 'canceled';
  deliveryProgress: number;
  deliveryAddress: string;
  expectedDelivery: Date;
  customerFeedback?: number; // 1-5 rating
  createdAt: Date;
  updatedAt: Date;
}

export type OrderFormData = Omit<Order, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>;