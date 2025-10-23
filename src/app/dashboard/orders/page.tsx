'use client';

import { useOrders } from '@/hooks/useOrders';
import { OrderTable } from '@/components/orders/OrderTable';
import { orderColumns } from '@/components/orders/OrderTableColumns';
import { OrderStatsCards } from '@/components/orders/OrderStatsCards';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';

export default function OrderListPage() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Error loading orders</h3>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track deliveries
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Link href="/dashboard/orders/create">
            <Button size="sm" className="bg-[#f1765b] hover:bg-[#e0654a]">
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          </Link>
        </div>
      </div>

      {orders && orders.length > 0 ? (
        <>
          <OrderStatsCards orders={orders} />
          <OrderTable data={orders} columns={orderColumns} />
        </>
      ) : (
        <EmptyState
          title="No orders found"
          description="Get started by creating your first order."
          action={
            <Link href="/dashboard/orders/create">
              <Button className="bg-[#f1765b] hover:bg-[#e0654a]">
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}