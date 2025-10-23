interface SatisfactionIndicatorProps {
  rating: number; // 1-5
}

export function SatisfactionIndicator({ rating }: SatisfactionIndicatorProps) {
  const getEmoji = (rating: number) => {
    if (rating >= 4) return '😀';
    if (rating >= 3) return '😐';
    return '😡';
  };

  const getColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center space-x-1">
      <span className={`text-xl ${getColor(rating)}`}>
        {getEmoji(rating)}
      </span>
      <span className="text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
}