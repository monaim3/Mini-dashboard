'use client';

import { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, CheckCircle, Clock, Star } from 'lucide-react';

interface OrderStatsCardsProps {
  orders: Order[];
}

export function OrderStatsCards({ orders }: OrderStatsCardsProps) {
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.deliveryStatus === 'delivered').length;
  const pendingOrders = orders.filter(order => order.deliveryStatus === 'pending').length;
  const deliveredPercentage = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;
  
  const averageSatisfaction = orders.length > 0 
    ? orders.reduce((sum, order) => sum + (order.customerFeedback || 0), 0) / orders.length
    : 0;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Delivered %',
      value: `${deliveredPercentage.toFixed(1)}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Deliveries',
      value: pendingOrders,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Avg Satisfaction',
      value: averageSatisfaction.toFixed(1),
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}