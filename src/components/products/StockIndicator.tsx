import { Badge } from '@/components/ui/badge';

interface StockIndicatorProps {
  quantity: number;
}

export function StockIndicator({ quantity }: StockIndicatorProps) {
  let color = 'bg-green-100 text-green-800 border-green-200';
  
  if (quantity < 10) {
    color = 'bg-red-100 text-red-800 border-red-200';
  } else if (quantity < 50) {
    color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }

  return (
    <Badge variant="outline" className={`${color} font-medium`}>
      {quantity} in stock
    </Badge>
  );
}