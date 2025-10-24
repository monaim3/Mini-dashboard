'use client';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Package, User, Mail, MapPin, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { orderSchema, OrderFormValues } from '@/schemas/orderSchema';
import { toast } from 'sonner';
import { useCreateOrder, useUpdateOrder } from '@/hooks/useOrders';
import { Order } from '@/types/order';
import { useProducts } from '@/hooks/useProducts';

interface OrderFormProps {
  mode: 'create' | 'edit';
  order?: Order;
}

const PAYMENT_STATUSES = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'refunded', label: 'Refunded' },
];

const DELIVERY_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'canceled', label: 'Canceled' },
];

export function OrderForm({ mode, order }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();
  const { data: products } = useProducts();

  const isEdit = mode === 'edit';

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema) as any,
    defaultValues: {
      clientName: '',
      clientEmail: '',
      items: [{ productId: '', productName: '', price: 0, quantity: 1 }],
      totalAmount: 0,
      paymentStatus: 'pending',
      deliveryStatus: 'pending',
      deliveryProgress: 0,
      deliveryAddress: '',
      expectedDelivery: new Date(),
      customerFeedback: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  // Set form values when in edit mode
  useEffect(() => {
    if (isEdit && order) {
      form.reset({
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        items: order.items,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        deliveryStatus: order.deliveryStatus,
        deliveryProgress: order.deliveryProgress,
        deliveryAddress: order.deliveryAddress,
        expectedDelivery: new Date(order.expectedDelivery),
        customerFeedback: order.customerFeedback,
      });
    }
  }, [isEdit, order, form]);

  // Calculate total amount whenever items change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith('items')) {
        const items = value.items || [];
        const total = items.reduce((sum: number, item: any) => {
          return sum + (item.price || 0) * (item.quantity || 0);
        }, 0);
        form.setValue('totalAmount', total);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.setValue]);

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEdit && order) {
        await updateOrderMutation.mutateAsync({
          id: order.id,
          ...data,
        });

        toast.success('Order updated successfully!', {
          description: 'Order has been updated.',
        });
      } else {
        await createOrderMutation.mutateAsync(data);

        toast.success('Order created successfully!', {
          description: 'New order has been created.',
        });
      }

      form.reset();
      router.push('/dashboard/orders');
    } catch (error) {
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} order`, {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addOrderItem = () => {
    append({ productId: '', productName: '', price: 0, quantity: 1 });
  };

  const removeOrderItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = products?.find(p => p.id === productId);
    if (selectedProduct) {
      form.setValue(`items.${index}.productId`, productId);
      form.setValue(`items.${index}.productName`, selectedProduct.name);
      form.setValue(`items.${index}.price`, selectedProduct.price);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Card with Gradient */}
      <Card className="relative overflow-hidden border-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1765b] to-[#f1638c] opacity-5" />
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10">
              <Package className="w-6 h-6 text-[#f1765b]" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
                {isEdit ? `Edit Order ${order?.orderId}` : 'Create New Order'}
              </CardTitle>
              <CardDescription className="mt-1">
                {isEdit 
                  ? 'Update the order details below.'
                  : 'Fill in the order details. All fields marked with * are required.'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Client Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-gradient-to-r from-[#f1765b] to-[#f1638c]">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10">
                    <User className="w-4 h-4 text-[#f1765b]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Client Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          Client Name *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter client name" 
                            {...field}
                            className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          Client Email *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter client email" 
                            {...field}
                            className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Order Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b-2 border-gradient-to-r from-[#f1765b] to-[#f1638c]">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10">
                      <Package className="w-4 h-4 text-[#f1765b]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Order Items *</h3>
                  </div>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={addOrderItem}
                    className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:opacity-90 transition-opacity shadow-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div 
                      key={field.id} 
                      className="group relative p-5 border-2 border-gray-100 rounded-xl hover:border-[#f1765b]/30 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f1765b] to-[#f1638c] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                          <FormField
                            control={form.control}
                            name={`items.${index}.productId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Product</FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={(value) => handleProductChange(index, value)}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]">
                                      <SelectValue placeholder="Select a product" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {products?.map((product) => (
                                      <SelectItem key={product.id} value={product.id}>
                                        {product.name} - ${product.price}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <FormField
                            control={form.control}
                            name={`items.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    disabled
                                    className="bg-gray-50"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="md:col-span-3">
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="md:col-span-1 flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeOrderItem(index)}
                            disabled={fields.length === 1}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-gradient-to-r from-[#f1765b] to-[#f1638c]">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10">
                    <MapPin className="w-4 h-4 text-[#f1765b]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Delivery Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deliveryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete delivery address"
                            className="resize-none border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b] min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expectedDelivery"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expected Delivery *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal border-gray-200 hover:border-[#f1765b]',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Status Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-gradient-to-r from-[#f1765b] to-[#f1638c]">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10">
                    <TrendingUp className="w-4 h-4 text-[#f1765b]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Status Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PAYMENT_STATUSES.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DELIVERY_STATUSES.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryProgress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Progress (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Customer Feedback */}
              <FormField
                control={form.control}
                name="customerFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Feedback (1-5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Optional"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border-gray-200 focus:border-[#f1765b] focus:ring-[#f1765b] max-w-xs"
                      />
                    </FormControl>
                    <FormDescription>
                      Rate from 1 (unhappy) to 5 (very happy)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total Amount Display */}
              <div className="relative p-6 bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5 rounded-xl border-2 border-[#f1765b]/20">
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Total Amount</FormLabel>
                      <FormControl>
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
                          ${field.value.toFixed(2)}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#f1765b] to-[#f1638c] hover:opacity-90 transition-opacity shadow-lg px-8 py-6 text-base font-semibold"
                >
                  {isSubmitting 
                    ? (isEdit ? 'Updating...' : 'Creating...') 
                    : (isEdit ? 'Update Order' : 'Create Order')
                  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}