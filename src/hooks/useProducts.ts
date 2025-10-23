import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ProductFormData } from '@/types/product';
import { mockProducts } from '@/lib/mockData';

// Add this function to manage products in local storage or state
let productsData = [...mockProducts];

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      // Try to get from localStorage first, then fallback to mock data
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('products');
        if (stored) {
          return JSON.parse(stored);
        }
      }
      return productsData;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product | null> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('products');
        if (stored) {
          const products: Product[] = JSON.parse(stored);
          return products.find(p => p.id === id) || null;
        }
      }
      
      // Fallback to mock data
      return productsData.find(p => p.id === id) || null;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: ProductFormData): Promise<Product> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add mock data for the indicators
        salesData: {
          last7Days: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)],
          totalSales: Math.floor(Math.random() * 200)
        },
        deliveryProgress: Math.floor(Math.random() * 100),
        clientSatisfaction: Math.floor(Math.random() * 5) + 1
      };

      // Update local storage
      if (typeof window !== 'undefined') {
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = [...existingProducts, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } else {
        productsData.push(newProduct);
      }

      return newProduct;
    },
    onSuccess: () => {
      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }: ProductFormData & { id: string }): Promise<Product> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing product to preserve createdAt
      let existingProduct: Product | undefined;
      
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('products');
        if (stored) {
          const products: Product[] = JSON.parse(stored);
          existingProduct = products.find(p => p.id === id);
        }
      } else {
        existingProduct = productsData.find(p => p.id === id);
      }

      const updatedProduct: Product = {
        id,
        ...productData,
        createdAt: existingProduct?.createdAt || new Date(), // Preserve original createdAt
        updatedAt: new Date(),
        salesData: existingProduct?.salesData || {
          last7Days: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)],
          totalSales: Math.floor(Math.random() * 200)
        },
        deliveryProgress: existingProduct?.deliveryProgress || Math.floor(Math.random() * 100),
        clientSatisfaction: existingProduct?.clientSatisfaction || Math.floor(Math.random() * 5) + 1
      };

      // Update local storage (same as before)
      if (typeof window !== 'undefined') {
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = existingProducts.map((p: Product) => 
          p.id === id ? updatedProduct : p
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } else {
        productsData = productsData.map(p => 
          p.id === id ? updatedProduct : p
        );
      }

      return updatedProduct;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local storage
      if (typeof window !== 'undefined') {
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = existingProducts.filter((p: Product) => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      } else {
        productsData = productsData.filter(p => p.id !== productId);
      }
      
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}