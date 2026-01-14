import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { PLATFORMS } from '../data';
import { useGames } from '../context/GameContext';
import { Heading, Text } from './atoms/Typography';
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  PieChart as PieIcon,
  Trophy,
  Gamepad2,
  XCircle,
  Star
} from 'lucide-react';
import Card from './atoms/Card';
import KpiCard from './molecules/KpiCard';
import EmptyState from './molecules/EmptyState';
import { TimelineEventType } from '../types';

const COLORS = {
  primary: '#818cf8',   // Indigo 400 (Iniciados)
  secondary: '#34d399', // Emerald 400 (Finalizados)
  accent: '#facc15',    // Yellow 400 (Platinas)
  danger: '#f87171',    // Red 400 (Desistências)
  neutral: '#94a3b8',   // Slate 400
  background: '#1e293b' // Slate 800
};

type ViewMode = 'monthly' | 'yearly' | 'global';

const Stats: React.FC = () => {
  const { games, events } = useGames();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. STATE DERIVATION FROM URL ---

  const viewMode = (searchParams.get('mode') as ViewMode) || 'monthly';
  const paramYear = searchParams.get('year');
  const paramMonth = searchParams.get('month'); // 1-12

  // Current Active Date Calculation
  const currentDate = useMemo(() => {
    if (paramYear) {
      const y = parseInt(paramYear);
      const m = paramMonth ? parseInt(paramMonth) - 1 : 0; // Convert 1-12 to 0-11 for Date
      return new Date(y, m, 1);
    }
    // Default to NOW (Current System Date) instead of latest activity
    return new Date();
  }, [paramYear, paramMonth]);

  // --- 2. URL SYNC (INITIAL LOAD) ---

  useEffect(() => {
    // If no params are present, set defaults based on CURRENT DATE
    if (!searchParams.get('mode')) {
      const now = new Date();
      const y = now.getFullYear().toString();
      const m = (now.getMonth() + 1).toString();
      setSearchParams({ mode: 'monthly', year: y, month: m }, { replace: true });
    }
  }, []);

  // --- 3. NAVIGATION HANDLERS ---

  const handleSetViewMode = (mode: ViewMode) => {
    const newParams: Record<string, string> = { mode };

    if (mode !== 'global') {
      newParams.year = currentDate.getFullYear().toString();
      if (mode === 'monthly') {
        newParams.month = (currentDate.getMonth() + 1).toString();
      }
    }
    setSearchParams(newParams);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'yearly') {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }

    const newParams: Record<string, string> = {
      mode: viewMode,
      year: newDate.getFullYear().toString()
    };

    if (viewMode === 'monthly') {
      newParams.month = (newDate.getMonth() + 1).toString();
    }

    setSearchParams(newParams);
  };

  const getTitleLabel = () => {
    if (viewMode === 'global') return 'Visão Global';

    const locale = 'pt-BR';
    if (viewMode === 'yearly') {
      return currentDate.getFullYear().toString();
    }

    const dateStr = currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  };

  // --- 4. DATA PROCESSING & HIERARCHY LOGIC ---

  const filteredEvents = useMemo(() => {
    if (viewMode === 'global') return events;

    const targetMonth = currentDate.getMonth();
    const targetYear = currentDate.getFullYear();

    return events.filter(e => {
      const parts = e.date.split('-');
      const eDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      if (viewMode === 'yearly') {
        return eDate.getFullYear() === targetYear;
      }
      return eDate.getMonth() === targetMonth && eDate.getFullYear() === targetYear;
    });
  }, [events, viewMode, currentDate]);

  // CALCULATION LOGIC: Enforce hierarchy (Platinum > Finish > Drop > Start)
  const statsDistribution = useMemo(() => {
    const uniqueGameIds = Array.from(new Set(filteredEvents.map(e => e.gameId)));

    let platinum = 0;
    let finished = 0;
    let dropped = 0;
    let started = 0;

    uniqueGameIds.forEach(gameId => {
      // Get all events for this specific game WITHIN the filtered period
      const periodEvents = filteredEvents.filter(e => e.gameId === gameId);
      const eventTypes = new Set(periodEvents.map(e => e.type));
      const gameObj = games.find(g => g.id === gameId);

      // Priority Hierarchy
      if (eventTypes.has(TimelineEventType.Finish)) {
        // Priority 1: Platinum/100%
        // Note: If the game is marked 100% globally and finished in this period, we count it.
        if (gameObj?.completionType === '100%') {
          platinum++;
        } else {
          // Priority 2: Finished (Standard)
          finished++;
        }
      } else if (eventTypes.has(TimelineEventType.Drop)) {
        // Priority 3: Dropped (Only if not finished in the same period)
        dropped++;
      } else {
        // Priority 4: Started/Active (Start, Pause, Replay present, but no finish/drop)
        started++;
      }
    });

    return { platinum, finished, dropped, started, totalUnique: uniqueGameIds.length };
  }, [filteredEvents, games]);

  // --- 5. CHART DATA ---

  const statusData = [
    { name: 'Platinas', value: statsDistribution.platinum, color: COLORS.accent },
    { name: 'Finalizados', value: statsDistribution.finished, color: COLORS.secondary },
    { name: 'Iniciados', value: statsDistribution.started, color: COLORS.primary },
    { name: 'Desistências', value: statsDistribution.dropped, color: COLORS.danger },
  ].filter(d => d.value > 0);

  const platformCounts: Record<string, number> = {};
  filteredEvents.forEach(e => {
    if (e.platformId) {
      const pName = PLATFORMS[e.platformId]?.name || 'Outro';
      platformCounts[pName] = (platformCounts[pName] || 0) + 1;
    }
  });
  const platformData = Object.entries(platformCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // GENRE CALCULATION: Use unique games only (Mathematical Distribution Logic)
  const genreCounts: Record<string, number> = {};
  // 1. Get Unique Game IDs involved in this period
  const uniqueGenreGameIds = new Set(filteredEvents.map(e => e.gameId));

  // 2. Iterate only unique games to increment genres
  uniqueGenreGameIds.forEach(gameId => {
    const game = games.find(g => g.id === gameId);
    if (game && game.genres) {
      game.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  });

  const genreData = Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const hasData = filteredEvents.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32 pt-8">

      {/* Header Structure */}
      <div className="flex flex-col items-center gap-6 mb-12">

        {/* View Mode Tabs */}
        <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700/50 flex gap-1">
          {(['monthly', 'yearly', 'global'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleSetViewMode(mode)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === mode
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {mode === 'monthly' ? 'Mensal' : mode === 'yearly' ? 'Anual' : 'Global'}
            </button>
          ))}
        </div>

        {/* Navigation Title */}
        <div className="flex items-center gap-6">
          {viewMode !== 'global' && (
            <button
              onClick={() => navigateDate('prev')}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="flex flex-col items-center min-w-[200px]">
            <Text variant="small" className="uppercase font-bold tracking-widest text-indigo-400 mb-1">
              {viewMode === 'monthly' ? 'Relatório do Mês' : viewMode === 'yearly' ? 'Relatório do Ano' : 'Histórico Completo'}
            </Text>
            <Heading level={2} className="!text-3xl text-center leading-none">
              {getTitleLabel()}
            </Heading>
          </div>

          {viewMode !== 'global' && (
            <button
              onClick={() => navigateDate('next')}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors shadow-sm"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {!hasData ? (
        <EmptyState
          icon={BarChart2}
          title="Sem dados neste período"
          description={`Nenhum registro encontrado em ${getTitleLabel()}. Utilize as setas acima para navegar para um período com atividades ou adicione novos jogos.`}
          className="max-w-xl mx-auto"
        />
      ) : (
        <div className="space-y-6 animate-fade-in">

          {/* KPIs - Using the Unique Distribution Counts for consistency */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Interações"
              value={statsDistribution.totalUnique}
              icon={Gamepad2}
              color="text-indigo-400"
              subLabel={viewMode === 'global' ? 'jogos totais' : 'jogos ativos'}
            />
            <KpiCard
              label="Finalizados"
              value={statsDistribution.finished + statsDistribution.platinum}
              icon={Trophy}
              color="text-emerald-400"
            />
            <KpiCard
              label="Platinas / 100%"
              value={statsDistribution.platinum}
              icon={Star}
              color="text-yellow-400"
            />
            <KpiCard
              label="Desistências"
              value={statsDistribution.dropped}
              icon={XCircle}
              color="text-red-400"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Distribution */}
            <Card className="flex flex-col md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <PieIcon size={18} className="text-slate-400" />
                <h3 className="font-bold text-slate-200">Distribuição</h3>
              </div>
              <div className="flex-1 min-h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                  <span className="text-2xl font-bold text-slate-500">{statsDistribution.totalUnique}</span>
                </div>
              </div>
            </Card>

            {/* Platform Rank */}
            <Card className="flex flex-col md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart2 size={18} className="text-slate-400" />
                  <h3 className="font-bold text-slate-200">Top Plataformas</h3>
                </div>
              </div>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: '#334155', opacity: 0.2 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Genre Rank */}
            <Card className="flex flex-col md:col-span-3">
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 size={18} className="text-slate-400" />
                <h3 className="font-bold text-slate-200">Gêneros Mais Jogados</h3>
              </div>
              <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genreData} margin={{ top: 10 }}>
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: '#334155', opacity: 0.2 }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" fill={COLORS.secondary} radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
