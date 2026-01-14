import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link' | 'danger' | 'icon';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  icon: Icon,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm", // Alias for backward compatibility
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    icon: "hover:bg-accent hover:text-accent-foreground text-muted-foreground" // Legacy icon variant support
  };

  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };

  // Handle legacy "variant=icon" which might not have "size=icon" set
  const computedSize = variant === 'icon' && size === 'default' ? sizes.icon : sizes[size];

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        computedSize,
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </button>
  );
};

export default Button;
