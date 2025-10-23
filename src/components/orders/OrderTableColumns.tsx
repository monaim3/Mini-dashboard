'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { DeliveryStatusChip } from './DeliveryStatusChip';
import { CustomerFeedback } from './CustomerFeedback';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { ProgressBar } from '@/components/charts/ProgressBar';
import { OrderActions } from './OrderActions';
import Link from 'next/link';

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="w-4 h-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderId',
    header: 'Order ID',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link 
          href={`/dashboard/orders/${order.id}`}
          className="font-medium text-[#f1765b] hover:text-[#e0654a] hover:underline"
        >
          {order.orderId}
        </Link>
      );
    },
  },
  {
    accessorKey: 'clientName',
    header: 'Client',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center space-x-3">
          <UserAvatar name={order.clientName} className="h-8 w-8" />
          <div>
            <div className="font-medium text-gray-900">{order.clientName}</div>
            <div className="text-sm text-gray-500">{order.clientEmail}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus') as string;
      return <PaymentStatusBadge status={status as any} />;
    },
  },
  {
    accessorKey: 'deliveryStatus',
    header: 'Delivery Status',
    cell: ({ row }) => {
      const status = row.getValue('deliveryStatus') as string;
      return <DeliveryStatusChip status={status as any} />;
    },
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('totalAmount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'deliveryProgress',
    header: 'Delivery Progress',
    cell: ({ row }) => {
      const progress = row.original.deliveryProgress;
      return (
        <div className="w-24">
          <ProgressBar value={progress} color="#f1765b" />
          <div className="text-xs text-gray-500 text-center mt-1">{progress}%</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'customerFeedback',
    header: 'Feedback',
    cell: ({ row }) => {
      const feedback = row.original.customerFeedback;
      return <CustomerFeedback rating={feedback} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString()}</div>
          <div className="text-gray-500">{date.toLocaleTimeString()}</div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header:"Actions",
    cell: ({ row }) => {
      const order = row.original;
      return <OrderActions order={order} />;
    },
  },
];