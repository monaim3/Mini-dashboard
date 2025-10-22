'use client';

import { useState } from 'react';
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


const CATEGORIES = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Beauty'];

export function ProductForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [imagePreview, setImagePreview] = useState<string>('');
    const router = useRouter();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            sku: '',
            category: '',
            price: 0,
            stockQuantity: 0,
            description: '',
            isActive: true,
        },
    });

    const steps = [
        { title: 'Basic Info', description: 'Product basic information' },
        { title: 'Inventory & Pricing', description: 'Stock and pricing details' },
        { title: 'Media & Status', description: 'Images and activation' },
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
            // Here you would typically send data to your API
            console.log('Product data:', data);

            toast.success('Product created successfully!', {
                description: 'Your product has been added to the catalog.',
                action: {
                    label: 'View Products',
                    onClick: () => router.push('/dashboard/products'),
                },
            });;

            // Redirect to product list page
            router.push('/dashboard/products');
        } catch (error) {
            toast.error('Failed to create product', {
                description: 'Please check your connection and try again.',
            });
        }
    };

    const nextStep = async () => {
        const fields = steps[currentStep].title === 'Basic Info'
            ? ['name', 'sku', 'category']
            : steps[currentStep].title === 'Inventory & Pricing'
                ? ['price', 'stockQuantity']
                : [];

        const isValid = await form.trigger(fields as any);
        if (isValid && currentStep < steps.length - 1) {
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
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.title} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentStep
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                                }`}
                        >
                            {index + 1}
                        </div>
                        <div className="ml-2">
                            <p className={`text-sm font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`w-12 h-0.5 mx-4 ${index < currentStep ? 'bg-primary' : 'bg-muted'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Product</CardTitle>
                    <CardDescription>
                        Fill in the product details. All fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                    <Input placeholder="Enter product name" {...field} />
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
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Stock Keeping Unit (will be converted to uppercase)
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
                                                        <SelectTrigger>
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
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                                                        className="resize-none"
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
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        <FileUpload onFileUpload={handleImageUpload} />
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                                                <img
                                                    src={imagePreview}
                                                    alt="Product preview"
                                                    className="w-32 h-32 object-cover rounded-lg border"
                                                />
                                            </div>
                                        )}
                                    </FormItem>

                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                                >
                                    Previous
                                </Button>

                                {currentStep < steps.length - 1 ? (
                                    <Button type="button" onClick={nextStep}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button type="submit">Create Product</Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}