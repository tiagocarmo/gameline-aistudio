
import React from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { DEFAULT_AVATAR } from '../data';

const Header: React.FC = () => {
  const { userProfile } = useGames();
  const hasProfile = !!userProfile.name;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50 transition-all">
       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - New Font, Impactful, No Icon */}
          <Link to="/" className="group select-none">
             <span className="font-['Orbitron'] text-2xl md:text-3xl font-black tracking-[0.2em] text-white group-hover:text-indigo-400 transition-colors drop-shadow-lg">
                GAMELINE
             </span>
          </Link>

          {/* User Profile - Only visible if name is set (User is 'logged in') */}
          {hasProfile && (
             <Link to="/settings" className="flex items-center gap-4 group">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-normal text-slate-300 group-hover:text-white transition-colors">
                        {userProfile.name}
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-600 group-hover:border-indigo-500 transition-all overflow-hidden bg-slate-800 shadow-lg">
                    <img
                        src={userProfile.avatar || DEFAULT_AVATAR}
                        alt={userProfile.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                    />
                </div>
             </Link>
          )}
       </div>
    </header>
  );
};

export default Header;
