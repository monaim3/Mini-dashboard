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
      gradient: 'from-[#f1765b] to-[#f1638c]',
      iconBg: 'bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10'
    },
    {
      title: 'Delivered %',
      value: `${deliveredPercentage.toFixed(1)}%`,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10'
    },
    {
      title: 'Pending Deliveries',
      value: pendingOrders,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      iconBg: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10'
    },
    {
      title: 'Avg Satisfaction',
      value: averageSatisfaction.toFixed(1),
      icon: Star,
      gradient: 'from-violet-500 to-purple-500',
      iconBg: 'bg-gradient-to-br from-violet-500/10 to-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <div className="absolute inset-[1px] bg-white rounded-lg" />
          
          {/* Content */}
          <div className="relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
             
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="h-1 w-12 bg-gradient-to-r rounded-full opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, ${stat.gradient.includes('#f1765b') ? '#f1765b, #f1638c' : 
                    stat.gradient.includes('emerald') ? 'rgb(16 185 129), rgb(20 184 166)' :
                    stat.gradient.includes('amber') ? 'rgb(245 158 11), rgb(249 115 22)' :
                    'rgb(139 92 246), rgb(168 85 247)'})`
                }}
              />
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}