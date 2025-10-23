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