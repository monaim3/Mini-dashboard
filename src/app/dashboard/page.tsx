import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users, ArrowUpRight, Clock } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Products",
      value: "156",
      change: "+12%",
      icon: Package,
      gradient: "from-[#f1765b] to-[#f1638c]",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      icon: ShoppingCart,
      gradient: "from-[#f1638c] to-[#f1765b]",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+23%",
      icon: TrendingUp,
      gradient: "from-[#f1765b] to-[#f1638c]",
    },
    {
      title: "Customers",
      value: "892",
      change: "+15%",
      icon: Users,
      gradient: "from-[#f1638c] to-[#f1765b]",
    },
  ];

  const recentActivity = [
    { action: "Product stock updated", time: "15 minutes ago" },
    { action: "New customer registered", time: "1 hour ago" },
    { action: "Order shipped", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden group  shadow-lg hover:shadow-lg transition-all duration-300 border-transparent hover:border-[#f1765b]/20 relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-md transition-shadow duration-300">
          <CardHeader className="border-b bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f1765b] to-[#f1638c] flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>
              Navigate to key sections of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer group">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Package className="h-4 w-4 text-[#f1765b]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Manage Products</p>
                  <p className="text-xs text-muted-foreground">Add, edit, or remove products from your inventory</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer group">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-4 w-4 text-[#f1638c]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Process Orders</p>
                  <p className="text-xs text-muted-foreground">View and manage customer orders efficiently</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer group">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f1765b]/10 to-[#f1638c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-4 w-4 text-[#f1765b]" />
                </div>
                <div>
                  <p className="text-sm font-medium">View Analytics</p>
                  <p className="text-xs text-muted-foreground">Track your store performance and insights</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-md transition-shadow duration-300">
          <CardHeader className="border-b bg-gradient-to-r from-[#f1638c]/5 to-[#f1765b]/5">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#f1638c] to-[#f1765b] flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your store</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#f1765b] to-[#f1638c] mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}