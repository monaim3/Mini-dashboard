interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
}

export function ProgressBar({ value, color = '#f1765b' }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: `${value}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}