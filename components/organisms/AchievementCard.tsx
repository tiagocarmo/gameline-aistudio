import React from 'react';
import { Achievement } from '../../types';
import * as Icons from 'lucide-react';
import { LucideIcon, Lock, HelpCircle } from 'lucide-react';
import { Text } from '../atoms/Typography';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  // Dynamic Icon import (assuming icons are PascalCase in JSON now)
  // @ts-ignore
  const IconComponent = (Icons[achievement.icon] || Icons.Trophy) as LucideIcon;

  const isLocked = !achievement.unlocked;
  const isSecret = achievement.isSecret && isLocked;

  return (
    <div
      className={`relative p-5 rounded-2xl border flex items-center gap-5 transition-all duration-300
        ${!isLocked
          ? 'bg-slate-800 border-indigo-500/20 shadow-lg shadow-black/20'
          : 'bg-slate-900/50 border-slate-800'
        }
      `}
    >
      {/* Icon Container */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner
          ${!isLocked
          ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400'
          : 'bg-slate-800 border-slate-700 text-slate-600 grayscale'}
      `}>
        {isSecret ? <Lock size={24} /> : <IconComponent size={24} />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-base truncate ${!isLocked ? 'text-slate-100' : 'text-slate-500'}`}>
          {isSecret ? '???' : achievement.title}
        </h3>
        <Text variant="small" className={`line-clamp-2 leading-relaxed mt-1 ${isSecret ? 'text-slate-600' : 'text-slate-400'}`}>
          {isSecret ? 'Continue jogando para descobrir.' : achievement.description}
        </Text>

        {/* Progress Bar for Progressive Types */}
        {achievement.type === 'progressive' && !isLocked && achievement.metric && (
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1.5 uppercase font-bold tracking-wider">
              <span>Progresso</span>
              <span>{Math.min(achievement.currentValue || 0, achievement.metric)} / {achievement.metric}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${Math.min(100, ((achievement.currentValue || 0) / achievement.metric) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Date Badge */}
      {achievement.unlockedDate && (
        <div className="absolute top-4 right-4 text-[10px] font-bold text-indigo-400/60 bg-indigo-500/5 px-2 py-1 rounded border border-indigo-500/10">
          {new Date(achievement.unlockedDate).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
