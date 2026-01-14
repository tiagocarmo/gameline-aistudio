import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
  size?: number;
  className?: string;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 24,
  className,
  readOnly = false
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : (value || 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={cn(
            "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full",
            !readOnly && "hover:scale-125 active:scale-95 cursor-pointer",
            readOnly && "cursor-default"
          )}
          onMouseEnter={() => !readOnly && setHoverValue(star)}
          onMouseLeave={() => !readOnly && setHoverValue(null)}
          onClick={() => !readOnly && onChange(star)}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              star <= displayValue
                ? "fill-indigo-500 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                : "text-slate-700 fill-transparent"
            )}
            strokeWidth={star <= displayValue ? 1.5 : 1}
          />
        </button>
      ))}
      {!readOnly && value !== null && (
        <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-widest animate-fade-in">
          {value}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;
