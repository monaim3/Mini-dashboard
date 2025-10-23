'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductTable } from '@/components/products/ProductTable';
import { productColumns } from '@/components/products/ProductTableColumns';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';


export default function ProductListPage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Error loading products</h3>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and listings
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
          <Link href="/dashboard/products/create">
            <Button size="sm" className="bg-[#f1765b] hover:bg-[#e0654a]">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {products && products.length > 0 ? (
        <ProductTable data={products} columns={productColumns} />
      ) : (
        <EmptyState
          title="No products found"
          description="Get started by creating your first product."
          action={
            <Link href="/dashboard/products/create">
              <Button className="bg-[#f1765b] hover:bg-[#e0654a]">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}