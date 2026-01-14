import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
      h2: 'font-display text-3xl md:text-4xl font-bold tracking-tight',
      h3: 'font-display text-2xl md:text-3xl font-semibold tracking-tight',
      h4: 'font-display text-xl md:text-2xl font-semibold',
      h5: 'font-display text-lg md:text-xl font-medium',
      h6: 'font-display text-base md:text-lg font-medium',
      body: 'text-base leading-relaxed',
      'body-sm': 'text-sm leading-relaxed',
      caption: 'text-xs text-muted-foreground',
      label: 'text-sm font-medium uppercase tracking-wide',
    },
    gradient: {
      true: 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    gradient: false,
  },
});

// Explicitly adding className and children to TypographyProps to resolve property access errors
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'label' | null;
  gradient?: boolean | null;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div';
  className?: string;
  children?: React.ReactNode;
}

export const Typography = ({
  className,
  variant,
  gradient,
  as,
  children,
  ...props
}: TypographyProps) => {
  const Component = as ||
    (variant?.startsWith('h') ? (variant as any) : 'p');

  return (
    <Component className={cn(typographyVariants({ variant, gradient }), className)} {...props}>
      {children}
    </Component>
  );
};

// --- Backward Compatibility Adapters ---

export const Heading: React.FC<{ children: React.ReactNode; className?: string; level?: 1 | 2 | 3 }> = ({
  children,
  className = '',
  level = 1
}) => {
  const variantMap = { 1: 'h1', 2: 'h2', 3: 'h3' } as const;
  const variant = variantMap[level] || 'h1';

  return (
    <Typography
      as={`h${level}` as any}
      variant={variant}
      gradient={level === 1}
      className={className}
    >
      {children}
    </Typography>
  );
};

export const Text: React.FC<{ children: React.ReactNode; className?: string; variant?: 'body' | 'muted' | 'small' }> = ({
  children,
  className = '',
  variant = 'body'
}) => {
  let typoVariant: TypographyProps['variant'] = 'body';
  let extraClasses = '';

  if (variant === 'muted') {
    extraClasses = 'text-muted-foreground';
  } else if (variant === 'small') {
    typoVariant = 'caption';
  }

  return (
    <Typography
      variant={typoVariant}
      className={cn(extraClasses, className)}
    >
      {children}
    </Typography>
  );
};
