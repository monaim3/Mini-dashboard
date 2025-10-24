export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stockQuantity: number;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  salesData?: {
    last7Days: number[];
    totalSales: number;
  };
  deliveryProgress?: number;
  clientSatisfaction?: number;
}


export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesData' | 'deliveryProgress' | 'clientSatisfaction'>;