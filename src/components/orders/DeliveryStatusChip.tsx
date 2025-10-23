import { Badge } from '@/components/ui/badge';

interface DeliveryStatusChipProps {
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
}

export function DeliveryStatusChip({ status }: DeliveryStatusChipProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return { label: 'Delivered', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' };
      case 'shipped':
        return { label: 'Shipped', variant: 'secondary' as const, className: 'bg-blue-500 hover:bg-blue-600' };
      case 'pending':
        return { label: 'Pending', variant: 'outline' as const, className: 'border-yellow-500 text-yellow-700' };
      case 'canceled':
        return { label: 'Canceled', variant: 'destructive' as const, className: 'bg-red-500 hover:bg-red-600' };
      default:
        return { label: status, variant: 'outline' as const, className: '' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}