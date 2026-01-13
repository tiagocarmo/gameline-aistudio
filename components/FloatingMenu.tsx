
import React, { useEffect } from 'react';
import { 
  BarChart2, Gamepad2, Award, Home, Trophy, 
  XCircle, Plus, Settings as SettingsIcon, X, Zap 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active = false,
  variant = 'default' 
}: { 
  icon: any, 
  label: string, 
  onClick: () => void, 
  active?: boolean,
  variant?: 'default' | 'action'
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
        : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent",
      variant === 'action' && !active && "text-slate-300"
    )}
  >
    <Icon 
      size={20} 
      className={cn(
        "transition-colors", 
        active ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"
      )} 
    />
    <span className="font-bold text-sm tracking-wide">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />}
  </button>
);

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Close drawer on navigation
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[280px] bg-slate-900 border-r border-slate-800 z-[70] transition-transform duration-300 ease-out flex flex-col shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50">
          <span className="font-['Orbitron'] text-xl font-black tracking-widest text-indigo-500">
            MENU
          </span>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          
          {/* Main Section */}
          <div className="space-y-1">
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Navegação</h3>
            <NavItem 
              icon={Home} 
              label="Timeline" 
              onClick={() => handleNavigate('/')} 
              active={location.pathname === '/'} 
            />
            <NavItem 
              icon={BarChart2} 
              label="Estatísticas" 
              onClick={() => handleNavigate('/stats')} 
              active={location.pathname === '/stats'} 
            />
            <NavItem 
              icon={Gamepad2} 
              label="Biblioteca" 
              onClick={() => handleNavigate('/library')} 
              active={location.pathname === '/library'} 
            />
            <NavItem 
              icon={Award} 
              label="Conquistas" 
              onClick={() => handleNavigate('/achievements')} 
              active={location.pathname === '/achievements'} 
            />
          </div>

          {/* Actions Section */}
          <div className="space-y-1">
            <h3 className="px-4 flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
              <Zap size={10} className="text-indigo-400" /> Ações Rápidas
            </h3>
            <NavItem 
              icon={Plus} 
              label="Novo Jogo" 
              onClick={() => handleNavigate('/add')} 
              active={location.pathname === '/add'} 
              variant="action"
            />
            <NavItem 
              icon={Trophy} 
              label="Concluir Jogo" 
              onClick={() => handleNavigate('/finish')} 
              active={location.pathname === '/finish'} 
              variant="action"
            />
            <NavItem 
              icon={XCircle} 
              label="Desistir" 
              onClick={() => handleNavigate('/drop')} 
              active={location.pathname === '/drop'} 
              variant="action"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/50">
          <NavItem 
            icon={SettingsIcon} 
            label="Configurações" 
            onClick={() => handleNavigate('/settings')} 
            active={location.pathname === '/settings'} 
          />
          <div className="mt-4 px-4 text-[10px] text-slate-600 font-medium text-center italic">
            GameLine v1.0 • Sua história gamer
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideDrawer;
