interface CustomerFeedbackProps {
  rating?: number; // 1-5
}

export function CustomerFeedback({ rating }: CustomerFeedbackProps) {
  if (!rating) {
    return <span className="text-gray-400 text-sm">No feedback</span>;
  }

  const getFeedbackConfig = (rating: number) => {
    if (rating >= 4) return { emoji: '😊', color: 'text-green-500', label: 'Happy' };
    if (rating >= 3) return { emoji: '😐', color: 'text-yellow-500', label: 'Neutral' };
    return { emoji: '😞', color: 'text-red-500', label: 'Unhappy' };
  };

  const config = getFeedbackConfig(rating);

  return (
    <div className="flex items-center space-x-2" title={`${config.label} (${rating}/5)`}>
      <span className={`text-xl ${config.color}`}>{config.emoji}</span>
      <span className="text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
}