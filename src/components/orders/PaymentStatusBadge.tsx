import { Badge } from '@/components/ui/badge';

interface PaymentStatusBadgeProps {
  status: 'paid' | 'pending' | 'refunded';
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { label: 'Paid', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' };
      case 'pending':
        return { label: 'Pending', variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600' };
      case 'refunded':
        return { label: 'Refunded', variant: 'destructive' as const, className: 'bg-red-500 hover:bg-red-600' };
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