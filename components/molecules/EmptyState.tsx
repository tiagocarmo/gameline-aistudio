import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Heading, Text } from '../atoms/Typography';
import Button from '../atoms/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 bg-slate-800/30 rounded-3xl border border-slate-800 border-dashed text-center animate-fade-in ${className}`}>
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-600 shadow-sm">
        <Icon size={32} />
      </div>
      <Heading level={2} className="text-slate-300 mb-2 !text-xl">{title}</Heading>
      <Text variant="muted" className="max-w-md mx-auto mb-6">{description}</Text>

      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
