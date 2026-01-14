import React from 'react';
import { Text } from '../atoms/Typography';

interface MetricCardProps {
  value: string | number;
  label: string;
  highlightColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, highlightColor = 'text-white' }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center justify-center transition-transform hover:scale-[1.02]">
      <span className={`text-4xl font-bold mb-2 ${highlightColor}`}>{value}</span>
      <Text variant="small" className="uppercase tracking-wider font-bold">{label}</Text>
    </div>
  );
};

export default MetricCard;
