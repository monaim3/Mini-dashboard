'use client';

import { use } from 'react';
import { OrderForm } from '@/components/orders/OrderForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useOrder } from '@/hooks/useOrders';
import LoadingSpinner from '@/components/shared/LoadingSpinner';


interface OrderEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderEditPage({ params }: OrderEditPageProps) {
  const { id } = use(params);
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/orders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
          <p className="text-muted-foreground">
            Update order details for {order.orderId}
          </p>
        </div>
      </div>

      <OrderForm mode="edit" order={order} />
    </div>
  );
}