import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
  name: string;
  className?: string;
}

export function UserAvatar({ name, className = '' }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={className}>
      <AvatarFallback className="bg-[#f1765b] text-white">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}