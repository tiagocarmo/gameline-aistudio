import React from 'react';
import { PLATFORMS } from '../data';
import { useGames } from '../context/GameContext';
import {
  Play,
  CheckCircle,
  RotateCcw,
  XCircle,
  Calendar,
  PauseCircle,
  Trophy,
  Star
} from 'lucide-react';
import {
  TimelineEvent,
  Achievement,
  TimelineEventType
} from '../types';
import { Typography } from './atoms/Typography';
import PlatformBadge from './molecules/PlatformBadge';
import QuickStats from './molecules/QuickStats';
import StatusBadge from './molecules/StatusBadge';
import { cn } from '../lib/utils';

// Helper for Icon and Color Configuration
const getEventConfig = (type: TimelineEventType) => {
  switch (type) {
    case TimelineEventType.Start:
      return { icon: Play, color: 'text-emerald-400', label: 'Iniciou', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' };
    case TimelineEventType.Finish:
      return { icon: CheckCircle, color: 'text-blue-400', label: 'Concluiu', border: 'border-blue-500/20', bg: 'bg-blue-500/10' };
    case TimelineEventType.Replay:
      return { icon: RotateCcw, color: 'text-orange-400', label: 'Rejogou', border: 'border-orange-500/20', bg: 'bg-orange-500/10' };
    case TimelineEventType.Drop:
      return { icon: XCircle, color: 'text-red-400', label: 'Desistiu', border: 'border-red-500/20', bg: 'bg-red-500/10' };
    case TimelineEventType.Pause:
      return { icon: PauseCircle, color: 'text-yellow-400', label: 'Pausou', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10' };
    case TimelineEventType.Achievement:
      return { icon: Trophy, color: 'text-yellow-500', label: 'Conquista', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10' };
    default:
      return { icon: Calendar, color: 'text-slate-400', label: 'Evento', border: 'border-slate-700', bg: 'bg-slate-800' };
  }
};

// Interface extension for mixed display
interface DisplayEvent extends Omit<Partial<TimelineEvent>, 'type'> {
  id: string;
  date: string;
  type: TimelineEventType;
  achievement?: Achievement;
}

// Priority helper for sorting same-day events
const getEventPriority = (type: TimelineEventType): number => {
  switch (type) {
    case TimelineEventType.Achievement: return 6;
    case TimelineEventType.Finish: return 5;
    case TimelineEventType.Replay: return 4;
    case TimelineEventType.Start: return 3;
    case TimelineEventType.Drop: return 2;
    case TimelineEventType.Pause: return 1;
    default: return 0;
  }
}

const Timeline: React.FC = () => {
  const { events, games, achievements } = useGames();

  // Create Achievement Events
  const achievementEvents: DisplayEvent[] = achievements
    .filter(a => a.unlocked && a.unlockedDate)
    .map(a => ({
      id: `ach-${a.id}`,
      date: a.unlockedDate!.split('T')[0],
      type: TimelineEventType.Achievement,
      achievement: a,
      gameId: ''
    }));

  // Merge and Sort
  const mixedEvents: DisplayEvent[] = [...events, ...achievementEvents].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA !== dateB) return dateB - dateA;
    const priorityDiff = getEventPriority(b.type) - getEventPriority(a.type);
    if (priorityDiff !== 0) return priorityDiff;
    return (b.id || '').localeCompare(a.id || '');
  });

  // Grouping
  const eventsByYear: Record<string, DisplayEvent[]> = {};
  mixedEvents.forEach(event => {
    const year = event.date.split('-')[0];
    if (!eventsByYear[year]) eventsByYear[year] = [];
    eventsByYear[year].push(event);
  });

  const years = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

  if (mixedEvents.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pb-24 pt-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex p-6 rounded-full bg-slate-800/50 mb-6 ring-1 ring-slate-700">
            <Calendar size={48} className="text-slate-600" />
          </div>
          <Typography variant="h2" className="mb-2">Sua timeline está vazia</Typography>
          <Typography variant="body" className="text-muted-foreground">Adicione seu primeiro jogo para começar sua história.</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-6">
      <div className="w-full">
        <div className="max-w-3xl">
          <QuickStats />
        </div>

        <div className="space-y-12 ml-2 md:ml-0">
          {years.map(year => (
            <section key={year} className="relative">
              {/* Year Marker */}
              <div className="sticky top-24 z-20 mb-8 -ml-2 md:-ml-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 shadow-lg shadow-primary/20">
                  <span className="text-lg font-display font-bold text-white">{year}</span>
                  <span className="text-sm text-white/80 font-medium border-l border-white/20 pl-2">
                    {eventsByYear[year].length} eventos
                  </span>
                </div>
              </div>

              <div className="space-y-0">
                {eventsByYear[year].map((event, index) => {
                  const config = getEventConfig(event.type);
                  const Icon = config.icon;
                  const dateObj = new Date(event.date);
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleDateString('pt-BR', { month: 'long' });

                  if (event.type === TimelineEventType.Achievement && event.achievement) {
                    return (
                      <div key={event.id} className="relative flex gap-6 pb-12 group w-full">
                        <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-900 bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                          <Trophy size={20} />
                        </div>
                        <div className="flex-1 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-sm relative overflow-hidden group-hover:border-yellow-500/40 transition-colors w-full">
                          <div className="absolute top-0 right-0 p-3 opacity-5 text-yellow-500 transform rotate-12">
                            <Trophy size={80} />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-yellow-500">Conquista Desbloqueada</span>
                              <span className="text-xs text-slate-500">• {day} de {month}</span>
                            </div>
                            <Typography variant="h4" className="text-yellow-100 mb-1">{event.achievement.title}</Typography>
                            <Typography variant="body-sm" className="text-slate-400">{event.achievement.description}</Typography>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const game = games.find(g => g.id === event.gameId);
                  const platform = event.platformId ? PLATFORMS[event.platformId] : null;

                  if (!game) return null;

                  return (
                    <div key={event.id} className="relative flex gap-6 pb-12 group w-full">
                      <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
                      <div className={cn(
                        "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-card shadow-lg transition-all group-hover:scale-110",
                        config.color
                      )}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-4 md:p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:bg-card/60 w-full">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="relative shrink-0 group/cover">
                            <img
                              src={game.cover}
                              alt={game.title}
                              className="h-24 w-16 md:h-28 md:w-20 rounded-lg object-cover shadow-md bg-slate-900 ring-1 ring-white/5 transition-transform group-hover/cover:scale-105"
                            />
                            {game.completionType === '100%' && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 rounded-full p-1 shadow-lg">
                                <Star size={12} fill="currentColor" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 py-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                              <span className={cn("text-xs font-bold uppercase tracking-wide", config.color)}>
                                {config.label}
                              </span>

                              {platform && (
                                <PlatformBadge platformId={platform.id} size="sm" />
                              )}

                              <span className="text-xs text-muted-foreground ml-auto">
                                {day} de {month}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-4 mb-2">
                              <Typography variant="h4" className="truncate leading-tight">
                                {game.title}
                              </Typography>

                              {game.rating && (
                                <div className="flex items-center gap-0.5 shrink-0">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={12}
                                      className={cn(
                                        i < game.rating! ? "fill-indigo-500 text-indigo-500" : "text-slate-700 fill-transparent"
                                      )}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {event.note ? (
                              <div className="relative pl-3 border-l-2 border-primary/30 mt-3">
                                <Typography variant="body-sm" className="text-muted-foreground italic">
                                  "{event.note}"
                                </Typography>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <StatusBadge status={game.status} size="sm" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
          <div className="flex flex-col items-center justify-center opacity-30 pt-8">
            <div className="w-0.5 h-16 bg-gradient-to-b from-border to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-border mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
