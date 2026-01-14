import React from 'react';
import { GameStatus } from '../../types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: GameStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = false,
  className,
  ...props
}) => {
  const styles = {
    [GameStatus.Playing]: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
    [GameStatus.Completed]: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    [GameStatus.Paused]: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
    [GameStatus.Dropped]: 'bg-red-500/10 text-red-500 border border-red-500/20',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  const getIcon = (s: GameStatus) => {
    switch (s) {
      case GameStatus.Playing: return '▶';
      case GameStatus.Completed: return '✓';
      case GameStatus.Paused: return '⏸';
      case GameStatus.Dropped: return '✗';
      default: return '';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors border',
      styles[status] || 'bg-muted text-muted-foreground border-border',
      sizes[size],
      className
    )} {...props}>
      {showIcon && <span className="text-current leading-none font-bold">{getIcon(status)}</span>}
      {status}
    </span>
  );
};

export default StatusBadge;
