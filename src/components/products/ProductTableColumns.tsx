'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { StockIndicator } from './StockIndicator';
import { StatusBadge } from './StatusBadge';
import { SatisfactionIndicator } from './SatisfactionIndicator';
import { SparklineChart } from '@/components/charts/SparklineChart';
import { ProductActions } from './ProductActions';
import { ProgressBar } from '../charts/ProgressBar';

export const productColumns: ColumnDef<Product>[] = [
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
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center space-x-3">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.sku}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return <Badge variant="outline" className="capitalize">{category}</Badge>;
    },
    filterFn: (row, columnId, filterValue) => {
      if (filterValue === 'all') return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'stockQuantity',
    header: 'Stock',
    cell: ({ row }) => {
      const quantity = row.getValue('stockQuantity') as number;
      return <StockIndicator quantity={quantity} />;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return <StatusBadge isActive={isActive} />;
    },
  },
  {
    accessorKey: 'clientSatisfaction',
    header: 'Satisfaction',
    cell: ({ row }) => {
      const satisfaction = row.original.clientSatisfaction;
      return satisfaction ? <SatisfactionIndicator rating={satisfaction} /> : '-';
    },
  },
  {
    accessorKey: 'deliveryProgress',
    header: 'Delivery Progress',
    cell: ({ row }) => {
      const progress = row.original.deliveryProgress;
      return progress ? (
        <div className="w-20">
          <ProgressBar value={progress} />
          <div className="text-xs text-gray-500 text-center mt-1">{progress}%</div>
        </div>
      ) : (
        '-'
      );
    },
  },
  {
    accessorKey: 'salesData',
    header: 'Sales Trend',
    cell: ({ row }) => {
      const salesData = row.original.salesData;
      return salesData ? (
        <div className="w-20">
          <SparklineChart data={salesData.last7Days} />
          <div className="text-xs text-gray-500 text-center mt-1">
            {salesData.totalSales} total
          </div>
        </div>
      ) : (
        '-'
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActions product={product} />;
    },
  },
];