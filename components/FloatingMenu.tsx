
import React, { useState } from 'react';
import { Plus, BarChart2, Gamepad2, Award, Home, Trophy, XCircle, Search, Settings as SettingsIcon, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

// --- Atomic Components ---

const MenuLabel = ({ text }: { text: string }) => (
  <span
    className={cn(
      "absolute left-16 whitespace-nowrap py-1",
      "text-sm font-medium text-slate-200", // Standardized font, no background
      "drop-shadow-md select-none", // Shadow for readability against any bg
      "pointer-events-none" // Text shouldn't block clicks
    )}
  >
    {text}
  </span>
);

interface MenuButtonProps {
  icon: React.ElementType;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'default' | 'subitem';
  className?: string;
  iconColorClass?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ 
  icon: Icon, 
  onClick, 
  variant = 'default',
  iconColorClass = "text-slate-400"
}) => {
  const sizeClass = variant === 'subitem' ? "w-10 h-10" : "w-12 h-12";
  const iconSize = variant === 'subitem' ? 18 : 20;

  return (
    <button 
      onClick={onClick} 
      className={cn(
        "flex items-center justify-center rounded-full transition-colors duration-200 z-20 relative",
        "bg-slate-800 border border-slate-700 shadow-lg", // Standard look for all
        "hover:bg-slate-700 hover:border-slate-600", // Subtle hover only
        sizeClass
      )}
    >
      <Icon size={iconSize} className={iconColorClass} />
    </button>
  );
};

// --- Main Component ---

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (!newState) setIsActionsOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setIsActionsOpen(false);
  };

  const toggleActions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActionsOpen(!isActionsOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center font-sans">
      
      {/* Menu Stack Container (Flex Col Reverse = Bottom Up) */}
      <div 
        className={cn(
          "flex flex-col-reverse items-center gap-4 mb-4 transition-all duration-300 relative z-50",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        
        {/* 1. Settings (Bottom-most item) */}
        <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/settings')}>
            <MenuLabel text="Configurações" />
            <MenuButton icon={SettingsIcon} onClick={() => handleNavigate('/settings')} />
        </div>

        {/* 
            2. Actions Sub-items 
            Rendered BEFORE the Actions Trigger in flex-col-reverse so they appear BELOW it visually.
        */}
        <div 
             className={cn(
                 "flex flex-col-reverse items-center gap-3 transition-all duration-300 overflow-hidden",
                 isActionsOpen ? "max-h-[200px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"
             )}
        >
             {/* Sub: Desistir (Bottom) */}
             <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/drop')}>
                <MenuLabel text="Desistir" />
                <MenuButton 
                    icon={XCircle} 
                    onClick={() => handleNavigate('/drop')} 
                    variant="subitem"
                    iconColorClass="text-red-400"
                />
             </div>

             {/* Sub: Concluir (Middle) */}
             <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/finish')}>
                <MenuLabel text="Concluir" />
                <MenuButton 
                    icon={Trophy} 
                    onClick={() => handleNavigate('/finish')} 
                    variant="subitem"
                    iconColorClass="text-yellow-400"
                />
             </div>

             {/* Sub: Novo Jogo (Top) */}
             <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/add')}>
                <MenuLabel text="Novo Jogo" />
                <MenuButton 
                    icon={Search} 
                    onClick={() => handleNavigate('/add')} 
                    variant="subitem"
                    iconColorClass="text-emerald-400"
                />
             </div>
             
             {/* Small Connector Line */}
             <div className="w-px h-3 bg-slate-800"></div>
        </div>

        {/* 3. Actions Trigger */}
        <div className="group flex items-center justify-center relative cursor-pointer z-30" onClick={toggleActions}>
            <MenuLabel text="Ações" />
            <MenuButton 
                icon={Zap} 
                onClick={toggleActions} 
                iconColorClass={isActionsOpen ? "text-indigo-400" : "text-slate-400"}
            />
        </div>

        {/* 4. Achievements */}
        <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/achievements')}>
            <MenuLabel text="Conquistas" />
            <MenuButton icon={Award} onClick={() => handleNavigate('/achievements')} />
        </div>

        {/* 5. Library */}
        <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/library')}>
            <MenuLabel text="Biblioteca" />
            <MenuButton icon={Gamepad2} onClick={() => handleNavigate('/library')} />
        </div>

        {/* 6. Stats */}
        <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/stats')}>
            <MenuLabel text="Estatísticas" />
            <MenuButton icon={BarChart2} onClick={() => handleNavigate('/stats')} />
        </div>

        {/* 7. Timeline (Top-most) */}
        <div className="group flex items-center justify-center relative cursor-pointer" onClick={() => handleNavigate('/')}>
            <MenuLabel text="Timeline" />
            <MenuButton icon={Home} onClick={() => handleNavigate('/')} />
        </div>

      </div>

      {/* Main FAB Toggle */}
      <button
        onClick={toggleMenu}
        className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 border",
            isOpen 
                ? "bg-slate-800 rotate-45 border-slate-600 text-slate-400 hover:text-slate-200" 
                : "bg-indigo-600 hover:bg-indigo-500 rotate-0 border-white/10 text-white"
        )}
      >
        <Plus size={28} />
      </button>
      
      {/* Overlay Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        className={cn(
            "fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-40 transition-opacity duration-300",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />
    </div>
  );
};

export default FloatingMenu;
