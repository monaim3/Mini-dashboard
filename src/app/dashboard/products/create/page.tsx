'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '@/schemas/productSchema';
import { useState } from 'react';
import { Package, DollarSign, Image, ChevronRight, Check, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/shared/FileUpload';

const CATEGORIES = ['Electronics', 'Furniture', 'Clothing', 'Food & Beverages', 'Books', 'Sports', 'Beauty', 'Home & Garden'];

const sections = [
  { id: 1, title: 'Basic Info', icon: Package },
  { id: 2, title: 'Inventory', icon: DollarSign },
  { id: 3, title: 'Media', icon: Image }
];

export default function ProductCreatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { isActive: true }
  });

  const watchedFields = watch();
  const isSection1Valid = watchedFields.productName && watchedFields.sku && watchedFields.category;
  const isSection2Valid = watchedFields.price && watchedFields.stockQuantity;

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, save to API/database
      const newProduct = {
        id: `PROD-${Date.now()}`,
        ...data,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Product created:', newProduct);
      
      toast({
        title: "Success!",
        description: "Product created successfully.",
      });
      
      // Redirect to products list
      router.push('/dashboard/products');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
              Create New Product
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Add a new product to your inventory</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              const isCompleted = currentSection > section.id;
              const isCurrent = currentSection === section.id;
              
              return (
                <div key={section.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isCompleted ? 'bg-gradient-to-br from-[#f1765b] to-[#f1638c] text-white' : 
                        isCurrent ? 'bg-gradient-to-br from-[#f1765b] to-[#f1638c] text-white shadow-lg' : 
                        'bg-slate-200 dark:bg-slate-700 text-slate-400'}
                    `}>
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className={`font-semibold ${isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {section.title}
                      </p>
                      <p className="text-xs text-slate-400">Step {section.id} of 3</p>
                    </div>
                  </div>
                  {idx < sections.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8">
            
            {/* Section 1: Basic Info */}
            {currentSection === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('productName')}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Enter product name"
                  />
                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('sku')}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white uppercase"
                    placeholder="Enter SKU (auto-uppercase)"
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>
              </div>
            )}

            {/* Section 2: Inventory */}
            {currentSection === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500">$</span>
                    <input
                      {...register('price')}
                      type="number"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('stockQuantity')}
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Enter stock quantity"
                  />
                  {errors.stockQuantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.stockQuantity.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#f1765b] focus:border-transparent dark:bg-slate-700 dark:text-white resize-none"
                    placeholder="Enter product description (optional)"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Active Status</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Product will be visible to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('isActive')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#f1765b]/20 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#f1765b] peer-checked:to-[#f1638c]"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Section 3: Media */}
            {currentSection === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                    Product Image
                  </label>
                  <FileUpload
                    value={watchedFields.productImage}
                    onChange={(value) => setValue('productImage', value)}
                    error={errors.productImage?.message}
                  />
                </div>

                {/* Summary Card */}
                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Product Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Product Name</p>
                      <p className="font-medium text-slate-900 dark:text-white">{watchedFields.productName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">SKU</p>
                      <p className="font-medium text-slate-900 dark:text-white">{watchedFields.sku?.toUpperCase() || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Category</p>
                      <p className="font-medium text-slate-900 dark:text-white">{watchedFields.category || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Price</p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {watchedFields.price ? `$${parseFloat(watchedFields.price).toFixed(2)}` : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Stock</p>
                      <p className="font-medium text-slate-900 dark:text-white">{watchedFields.stockQuantity || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        watchedFields.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                      }`}>
                        {watchedFields.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
                disabled={currentSection === 1}
                className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>

              {currentSection < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentSection(prev => prev + 1)}
                  disabled={
                    (currentSection === 1 && !isSection1Valid) ||
                    (currentSection === 2 && !isSection2Valid)
                  }
                  className="px-8 py-3 bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Create Product
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}