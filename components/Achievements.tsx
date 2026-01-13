
import React from 'react';
import { useGames } from '../context/GameContext';
import AchievementCard from './organisms/AchievementCard';
import { Heading, Text } from './atoms/Typography';
import { Award, Lock, Trophy } from 'lucide-react';
import EmptyState from './molecules/EmptyState';

const Achievements: React.FC = () => {
  const { achievements } = useGames();

  // Categories
  const unlocked = achievements.filter(a => a.unlocked).sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime());
  const locked = achievements.filter(a => !a.unlocked && !a.isSecret);
  const secret = achievements.filter(a => !a.unlocked && a.isSecret);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-10">
      
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
        <div>
            <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Trophy size={24} /></div>
                 <Heading>Conquistas</Heading>
            </div>
            <Text variant="muted">Sua jornada gamer imortalizada em marcos.</Text>
        </div>
        <div className="bg-slate-800 px-6 py-4 rounded-2xl border border-slate-700 flex items-center gap-4">
             <div>
                <span className="block text-3xl font-bold text-white text-right">{unlocked.length}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Desbloqueadas</span>
             </div>
             <div className="h-10 w-px bg-slate-700 mx-2"></div>
             <div>
                <span className="block text-3xl font-bold text-slate-500 text-right">{achievements.length}</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Total</span>
             </div>
        </div>
      </div>

      <div className="space-y-16 animate-fade-in">
        
        {/* 1. Conquistadas */}
        <section>
             <div className="flex items-center gap-2 mb-6">
                <Award size={20} className="text-yellow-500" />
                <h2 className="text-lg font-bold text-slate-200">Conquistadas</h2>
             </div>
             
             {unlocked.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {unlocked.map(ach => (
                        <AchievementCard key={ach.id} achievement={ach} />
                    ))}
                 </div>
             ) : (
                 <EmptyState 
                    icon={Trophy}
                    title="Ainda sem troféus"
                    description="Jogue e registre suas atividades para começar a desbloquear conquistas."
                    className="max-w-xl mx-auto"
                 />
             )}
        </section>

        {/* 2. A Conquistar */}
        {locked.length > 0 && (
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Trophy size={20} className="text-slate-500" />
                    <h2 className="text-lg font-bold text-slate-200">Disponíveis</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {locked.map(ach => (
                        <AchievementCard key={ach.id} achievement={ach} />
                    ))}
                </div>
            </section>
        )}

        {/* 3. Secretas */}
        {secret.length > 0 && (
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Lock size={20} className="text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-200">Secretas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {secret.map(ach => (
                        <AchievementCard key={ach.id} achievement={ach} />
                    ))}
                </div>
            </section>
        )}

      </div>
    </div>
  );
};

export default Achievements;
