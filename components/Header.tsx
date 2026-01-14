import React from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { DEFAULT_AVATAR } from '../data';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { userProfile } = useGames();
  const hasProfile = !!userProfile.name;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {hasProfile && (
            <button
              onClick={onMenuToggle}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Logo */}
          <Link to="/" className="group select-none">
            <span className="font-['Orbitron'] text-xl md:text-2xl font-black tracking-[0.2em] text-white group-hover:text-indigo-400 transition-colors drop-shadow-lg">
              GAMELINE
            </span>
          </Link>
        </div>

        {/* User Profile */}
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
