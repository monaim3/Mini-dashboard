import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, OrderFormData } from '@/types/order';
import { mockOrders } from '@/lib/mockData';

let ordersData = [...mockOrders];

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async (): Promise<Order[]> => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('orders');
        if (stored) {
          return JSON.parse(stored);
        }
      }
      return ordersData;
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async (): Promise<Order | null> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('orders');
        if (stored) {
          const orders: Order[] = JSON.parse(stored);
          return orders.find(o => o.id === id) || null;
        }
      }
      return ordersData.find(o => o.id === id) || null;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: OrderFormData): Promise<Order> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder: Order = {
        id: Date.now().toString(),
        orderId: `ORD-${String(ordersData.length + 1).padStart(3, '0')}`,
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      } else {
        ordersData.push(newOrder);
      }

      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
// Add this to your existing useOrders.ts file

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...orderData }: OrderFormData & { id: string }): Promise<Order> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing order to preserve some fields
      let existingOrder: Order | undefined;
      
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('orders');
        if (stored) {
          const orders: Order[] = JSON.parse(stored);
          existingOrder = orders.find(o => o.id === id);
        }
      } else {
        existingOrder = ordersData.find(o => o.id === id);
      }

      const updatedOrder: Order = {
        ...existingOrder!,
        ...orderData,
        id,
        updatedAt: new Date(),
      };

      // Update local storage
      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = existingOrders.map((o: Order) => 
          o.id === id ? updatedOrder : o
        );
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      } else {
        ordersData = ordersData.map(o => 
          o.id === id ? updatedOrder : o
        );
      }

      return updatedOrder;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = existingOrders.filter((o: Order) => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
      } else {
        ordersData = ordersData.filter(o => o.id !== orderId);
      }
      
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}