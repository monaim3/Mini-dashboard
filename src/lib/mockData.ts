import { Order } from '@/types/order';
import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'AUDIO-001',
    category: 'electronics',
    price: 99.99,
    stockQuantity: 75,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/images/headphones.jpg',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    salesData: {
      last7Days: [12, 15, 8, 20, 18, 25, 22],
      totalSales: 120
    },
    deliveryProgress: 85,
    clientSatisfaction: 4
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    sku: 'FURN-001',
    category: 'furniture',
    price: 299.99,
    stockQuantity: 8,
    description: 'Comfortable ergonomic chair for home office',
    image: '/images/chair.jpg',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    salesData: {
      last7Days: [5, 8, 12, 6, 10, 15, 8],
      totalSales: 64
    },
    deliveryProgress: 60,
    clientSatisfaction: 3
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    sku: 'CLOTH-001',
    category: 'clothing',
    price: 24.99,
    stockQuantity: 45,
    description: 'Premium cotton t-shirt available in multiple colors',
    image: '/images/tshirt.jpg',
    isActive: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    salesData: {
      last7Days: [30, 25, 35, 28, 32, 40, 38],
      totalSales: 228
    },
    deliveryProgress: 95,
    clientSatisfaction: 5
  },
  // Add more mock products as needed
];



export const mockOrders: Order[] = [
  {
    id: '1',
    orderId: 'ORD-001',
    clientName: 'John Smith',
    clientEmail: 'john.smith@email.com',
    items: [
      { productId: '1', productName: 'Wireless Bluetooth Headphones', price: 99.99, quantity: 1 },
      { productId: '3', productName: 'Cotton T-Shirt', price: 24.99, quantity: 2 }
    ],
    totalAmount: 149.97,
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    deliveryProgress: 100,
    deliveryAddress: '123 Main St, New York, NY 10001',
    expectedDelivery: new Date('2024-01-20'),
    customerFeedback: 5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '2',
    orderId: 'ORD-002',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    items: [
      { productId: '2', productName: 'Ergonomic Office Chair', price: 299.99, quantity: 1 }
    ],
    totalAmount: 299.99,
    paymentStatus: 'pending',
    deliveryStatus: 'shipped',
    deliveryProgress: 75,
    deliveryAddress: '456 Oak Ave, Los Angeles, CA 90210',
    expectedDelivery: new Date('2024-01-25'),
    customerFeedback: 4,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    orderId: 'ORD-003',
    clientName: 'Mike Wilson',
    clientEmail: 'mike.wilson@email.com',
    items: [
      { productId: '1', productName: 'Wireless Bluetooth Headphones', price: 99.99, quantity: 3 }
    ],
    totalAmount: 299.97,
    paymentStatus: 'paid',
    deliveryStatus: 'pending',
    deliveryProgress: 25,
    deliveryAddress: '789 Pine Rd, Chicago, IL 60601',
    expectedDelivery: new Date('2024-01-30'),
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '4',
    orderId: 'ORD-004',
    clientName: 'Emily Davis',
    clientEmail: 'emily.davis@email.com',
    items: [
      { productId: '3', productName: 'Cotton T-Shirt', price: 24.99, quantity: 5 },
      { productId: '4', productName: 'Programming Book', price: 39.99, quantity: 1 }
    ],
    totalAmount: 164.94,
    paymentStatus: 'refunded',
    deliveryStatus: 'canceled',
    deliveryProgress: 0,
    deliveryAddress: '321 Elm St, Miami, FL 33101',
    expectedDelivery: new Date('2024-01-22'),
    customerFeedback: 2,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-19')
  }
];