
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../context/GameContext';
import { Trophy, Award } from 'lucide-react';
import { GameStatus } from '../../types';
import KpiCard from './KpiCard';

const QuickStats: React.FC = () => {
  const { games, achievements } = useGames();
  const navigate = useNavigate();
  
  // 1. Total Finalizados (Global)
  const gamesFinishedCount = games.filter(g => g.status === GameStatus.Completed).length;

  // 2. Total Conquistas Desbloqueadas (Global)
  const achievementsUnlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="grid grid-cols-2 gap-4 w-full mb-10 fade-in-up">
        <KpiCard 
            label="Finalizados" 
            value={gamesFinishedCount} 
            icon={Trophy} 
            color="text-emerald-400"
            onClick={() => navigate('/library?status=Completed')}
        />
        <KpiCard 
            label="Conquistas" 
            value={achievementsUnlockedCount} 
            icon={Award} 
            color="text-yellow-400"
            onClick={() => navigate('/achievements')}
        />
    </div>
  );
};

export default QuickStats;
