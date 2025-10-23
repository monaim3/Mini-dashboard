import React from "react";
import { Loader2 } from "lucide-react";

export type LoadingSpinnerProps = {
  /** size in pixels or one of 'sm' | 'md' | 'lg' */
  size?: number | "sm" | "md" | "lg";
  /** optional label (visually hidden by default for screen readers) */
  label?: string;
  /** additional tailwind classes */
  className?: string;
  /** show a subtle backdrop behind the spinner */
  backdrop?: boolean;
  /** center absolutely inside parent */
  center?: boolean;
};

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

export default function LoadingSpinner({
  size = "md",
  label = "Loading",
  className = "",
  backdrop = false,
  center = false,
}: LoadingSpinnerProps) {
  const pxSize = typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;

  const wrapperClasses = [
    center ? "absolute inset-0 flex items-center justify-center" : "inline-flex items-center",
  ].join(" ");

  return (
    <div
      className={wrapperClasses}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {backdrop && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" aria-hidden />
      )}

      <span className={`relative inline-flex items-center ${className}`}>
        <Loader2
          className="animate-spin"
          size={pxSize}
          aria-hidden
        />

        {/* Visual label for sighted users (optional) */}
        <span className="sr-only">{label}</span>
      </span>
    </div>
  );
}
