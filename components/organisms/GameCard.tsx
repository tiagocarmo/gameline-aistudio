import React from 'react';
import { Game, GamePerception } from '../../types';
import { PLATFORMS } from '../../data';
import StatusBadge from '../molecules/StatusBadge';
import { Trophy, Heart, Gamepad2, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import Badge from '../atoms/Badge';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, variant = 'default' }) => {
  const is100Percent = game.status === 'Concluído' && game.completionType === '100%';
  const isFavorite = game.perception === GamePerception.Like;
  const platformObjects = game.platformIds.map(id => PLATFORMS[id]).filter(Boolean);

  // --- Compact Variant ---
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={cn(
          'group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary/30 hover:shadow-md',
          onClick && 'cursor-pointer'
        )}
      >
        <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-muted relative">
          {game.cover ? (
            <img
              src={game.cover}
              alt={game.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Gamepad2 className="text-muted-foreground/50" size={20} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate text-foreground group-hover:text-primary transition-colors">{game.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={game.status} size="sm" />
            {is100Percent && <Badge size="sm" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-1 py-0"><Trophy size={10} /></Badge>}
            {game.rating && (
              <div className="flex items-center text-[10px] font-bold text-indigo-400">
                <Star size={10} className="fill-current mr-0.5" />
                {game.rating}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Default Variant ---
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 h-full',
        onClick && 'cursor-pointer'
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {game.cover ? (
          <img
            src={game.cover}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <Gamepad2 className="text-muted-foreground/20" size={48} />
          </div>
        )}

        {/* Gradient overlay - Always present for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Status badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={game.status} showIcon className="backdrop-blur-md bg-black/40 border-white/10 text-white shadow-lg" />
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
          {/* Rating Indicator */}
          {game.rating && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 text-indigo-400 px-2 py-1 rounded-full shadow-lg">
              <Star size={12} className="fill-indigo-500" />
              <span className="text-xs font-black">{game.rating}</span>
            </div>
          )}

          {/* Favorite badge */}
          {isFavorite && (
            <div className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-red-500 border border-white/10 shadow-lg">
              <Heart size={14} fill="currentColor" />
            </div>
          )}

          {/* 100% Badge */}
          {is100Percent && (
            <div className="flex items-center gap-1 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded shadow-lg">
              <Trophy size={10} className="fill-black" />
              <span>100%</span>
            </div>
          )}
        </div>

        {/* Bottom info on cover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-display font-bold text-white text-lg leading-tight mb-3 line-clamp-2 drop-shadow-md group-hover:text-primary-foreground transition-colors">
            {game.title}
          </h3>

          {/* Platforms */}
          <div className="flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            {platformObjects.slice(0, 3).map((platform) => (
              <Badge
                key={platform.id}
                color={platform.color}
                size="sm"
                className="backdrop-blur-sm shadow-sm"
              >
                {platform.name}
              </Badge>
            ))}
            {platformObjects.length > 3 && (
              <span className="text-[10px] font-bold text-white/80 bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                +{platformObjects.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
