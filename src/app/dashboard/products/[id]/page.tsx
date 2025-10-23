'use client';
import { use } from 'react';
import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useProduct } from '@/hooks/useProducts';
import LoadingSpinner from '@/components/shared/LoadingSpinner';


interface ProductEditPageProps {
  params: {
    id: string;  
  };
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
    const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);

  console.log('Product ID from params:', id);
  console.log('Product data:', product);
  console.log('Loading state:', isLoading);
  console.log('Error:', error);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    console.log('Product not found, showing 404');
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">
            Update the product details for {product.name}
          </p>
        </div>
      </div>

      <ProductForm mode="edit" product={product} />
    </div>
  );
}