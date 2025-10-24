'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductTable } from '@/components/products/ProductTable';
import { productColumns } from '@/components/products/ProductTableColumns';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Package } from 'lucide-react';
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
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-[#f1765b]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Error loading products</h3>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory and listings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/products/create">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <ProductTable data={products} columns={productColumns} />
        </div>
      ) : (
        <EmptyState
          title="No products found"
          description="Get started by creating your first product."
          action={
            <Link href="/dashboard/products/create">
              <Button className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:shadow-lg transition-all duration-300 hover:scale-105">
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