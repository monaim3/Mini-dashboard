
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { productSchema, ProductFormValues } from '@/schemas/productSchema';
import { FileUpload } from '../shared/FileUpload';
import { toast } from "sonner"
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { Check } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Beauty'];

interface ProductFormProps {
    mode: 'create' | 'edit';
    product?: Product;
}

export function ProductForm({ mode, product }: ProductFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [imagePreview, setImagePreview] = useState<string>('');
    const router = useRouter();
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();

    const isEdit = mode === 'edit';
    const isSubmitting = isEdit ? updateProductMutation.isPending : createProductMutation.isPending;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: '',
            sku: '',
            category: '',
            price: 0,
            stockQuantity: 0,
            description: '',
            image: '',
            isActive: true,
        },
    });

    // Set form values when in edit mode
    useEffect(() => {
        if (isEdit && product) {
            form.reset({
                name: product.name,
                sku: product.sku,
                category: product.category,
                price: product.price,
                stockQuantity: product.stockQuantity,
                description: product.description || '',
                image: product.image || '',
                isActive: product.isActive,
            });
            if (product.image) {
                setImagePreview(product.image);
            }
        }
    }, [isEdit, product, form]);

    const steps = [
        { title: 'Basic Info', description: 'Product basic information', fields: ['name', 'sku', 'category'] },
        { title: 'Inventory & Pricing', description: 'Stock and pricing details', fields: ['price', 'stockQuantity'] },
        { title: 'Media & Status', description: 'Images and activation', fields: [] },
    ];

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            form.setValue('image', result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: ProductFormValues) => {
        try {
            if (isEdit && product) {
                // Update existing product
                await updateProductMutation.mutateAsync({
                    id: product.id,
                    ...data
                });

                toast.success('Product updated successfully!', {
                    description: 'Your product has been updated.',
                    action: {
                        label: 'View Products',
                        onClick: () => router.push('/dashboard/products'),
                    },
                });
            } else {
                // Create new product
                await createProductMutation.mutateAsync(data);

                toast.success('Product created successfully!', {
                    description: 'Your product has been added to the catalog.',
                    action: {
                        label: 'View Products',
                        onClick: () => router.push('/dashboard/products'),
                    },
                });
            }

            form.reset();
            setImagePreview('');
            router.push('/dashboard/products');
        } catch (error) {
            toast.error(`Failed to ${isEdit ? 'update' : 'create'} product`, {
                description: 'Please check your connection and try again.',
            });
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Only allow submission on final step
        if (currentStep === steps.length - 1) {
            form.handleSubmit(onSubmit)(e);
        }
    };

    const nextStep = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();

        const currentStepFields = steps[currentStep].fields;

        if (currentStepFields.length > 0) {
            const isValid = await form.trigger(currentStepFields as any);
            if (!isValid) return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between bg-card border rounded-lg p-6">
                {steps.map((step, index) => (
                    <div key={step.title} className="flex items-center flex-1">
                        <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${index < currentStep
                                        ? 'bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white shadow-md'
                                        : index === currentStep
                                            ? 'bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white shadow-lg scale-110'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-semibold ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                    {step.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-4">
                                <div
                                    className={`h-1 rounded-full transition-all duration-300 ${index < currentStep
                                            ? 'bg-gradient-to-r from-[#f1765b] to-[#f1638c]'
                                            : 'bg-muted'
                                        }`}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Card className="shadow-md">
                <CardHeader className="bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f1765b] to-[#f1638c] flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{currentStep + 1}</span>
                        </div>
                        {isEdit ? 'Edit Product' : 'Create New Product'}
                    </CardTitle>
                    <CardDescription>
                        {isEdit
                            ? 'Update the product details below.'
                            : 'Fill in the product details. All fields marked with * are required.'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form
                            onSubmit={handleFormSubmit}
                            className="space-y-6"
                        >
                            {/* Step 1: Basic Info */}
                            {currentStep === 0 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter product name"
                                                        {...field}
                                                        className="focus:border-[#f1765b] focus:ring-[#f1765b]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SKU *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter SKU"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                        disabled={isEdit}
                                                        className="focus:border-[#f1765b] focus:ring-[#f1765b]"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Stock Keeping Unit {isEdit && '(Cannot be changed)'}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="focus:border-[#f1765b] focus:ring-[#f1765b]">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {CATEGORIES.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Step 2: Inventory & Pricing */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            field.onChange(isNaN(value) ? 0 : value);
                                                        }}
                                                        className="focus:border-[#f1765b] focus:ring-[#f1765b]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stockQuantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock Quantity *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            field.onChange(isNaN(value) ? 0 : value);
                                                        }}
                                                        className="focus:border-[#f1765b] focus:ring-[#f1765b]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter product description"
                                                        className="resize-none focus:border-[#f1765b] focus:ring-[#f1765b]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Step 3: Media & Status */}
                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Image</FormLabel>
                                                <FormControl>
                                                    <FileUpload
                                                        onFileUpload={handleImageUpload}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                                                        <div className="relative inline-block">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Product preview"
                                                                className="w-32 h-32 object-cover rounded-lg border-2 border-transparent hover:border-[#f1765b] transition-colors"
                                                            />
                                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#f1765b]/0 to-[#f1638c]/0 hover:from-[#f1765b]/10 hover:to-[#f1638c]/10 transition-all pointer-events-none" />
                                                        </div>
                                                    </div>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border-2 p-4 hover:border-[#f1765b]/30 transition-colors">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Active Status</FormLabel>
                                                    <FormDescription>
                                                        When inactive, the product won't be visible to customers.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="hover:border-[#f1638c]/50 hover:text-[#f1638c] transition-colors"
                                >
                                    Previous
                                </Button>

                                {currentStep < steps.length - 1 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? (isEdit ? 'Updating...' : 'Creating...')
                                            : (isEdit ? 'Update Product' : 'Create Product')
                                        }
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}