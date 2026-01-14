import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Heading, Text } from '../atoms/Typography';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string; // Tailwind text class for color
  subLabel?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'gradient';
}

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon: Icon,
  color = "text-primary",
  subLabel,
  onClick,
  className = '',
  variant = 'default'
}) => {
  const isGradient = variant === 'gradient';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300',
        onClick && 'cursor-pointer hover:-translate-y-1 hover:shadow-lg',
        isGradient
          ? 'bg-gradient-to-br from-primary to-secondary text-white border-transparent'
          : 'bg-card text-card-foreground border-border hover:border-primary/20',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          'rounded-xl p-3 transition-colors',
          isGradient ? 'bg-white/20 text-white' : `bg-muted/50 ${color} group-hover:bg-muted`
        )}>
          <Icon size={24} />
        </div>
      </div>

      <div>
        <Heading level={2} className={cn("!text-3xl font-bold mb-1", isGradient ? "text-white" : "text-foreground")}>
          {value}
        </Heading>

        <div className="flex items-center gap-2">
          <Text variant="small" className={cn("font-medium uppercase tracking-wider", isGradient ? "text-white/80" : "text-muted-foreground")}>
            {label}
          </Text>
          {subLabel && (
            <span className={cn("text-xs", isGradient ? "text-white/60" : "text-muted-foreground/60")}>
              {subLabel}
            </span>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <Icon
        className={cn(
          "absolute -right-6 -bottom-6 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
          isGradient ? "text-white" : color
        )}
        size={120}
      />
    </div>
  );
};

export default KpiCard;
