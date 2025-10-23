import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  isActive: boolean;
}

export function StatusBadge({ isActive }: StatusBadgeProps) {
  return (
    <Badge
      variant={isActive ? 'default' : 'secondary'}
      className={isActive ? 'bg-green-500 hover:bg-green-600' : ''}
    >
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  );
}