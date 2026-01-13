
import React from 'react';
import Badge from '../atoms/Badge';
import { PLATFORMS } from '../../data';
import { cn } from '../../lib/utils';

interface PlatformBadgeProps {
  platformId: string;
  size?: 'sm' | 'md';
  className?: string;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platformId, size = 'md', className }) => {
  const platform = PLATFORMS[platformId];
  
  if (!platform) return <Badge variant="outline" size={size} className={className}>Unknown</Badge>;

  return (
    <Badge 
      color={platform.color} 
      size={size}
      className={cn("font-bold tracking-wide", className)}
    >
      {platform.name}
    </Badge>
  );
};

export default PlatformBadge;
