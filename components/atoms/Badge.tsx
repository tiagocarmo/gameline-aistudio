import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
  // Keeping color prop for platform specific colors (legacy support)
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  color,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  const sizeStyles = size === 'sm' ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-0.5";

  // If a specific color class is passed (legacy/platform), it overrides the variant style
  const computedVariantClass = color ? `border-transparent ${color}` : variants[variant];

  return (
    <div className={cn(baseStyles, sizeStyles, computedVariantClass, className)} {...props}>
      {children}
    </div>
  );
};

export default Badge;
