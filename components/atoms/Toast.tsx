
import React, { useEffect, useState } from 'react';
import { Trophy, Info, X } from 'lucide-react';
import { NotificationToast } from '../../types';

interface ToastProps {
  notification: NotificationToast;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(notification.id), 300); // Wait for exit animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const isAchievement = notification.type === 'achievement';
  
  return (
    <div 
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5 transition-all duration-300 transform
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isAchievement ? 'bg-slate-800 border-l-4 border-yellow-500' : 'bg-slate-800 border-l-4 border-blue-500'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
             {isAchievement ? (
                 <div className="p-2 bg-yellow-500/10 rounded-full">
                    <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" aria-hidden="true" />
                 </div>
             ) : (
                 <Info className="h-6 w-6 text-blue-400" aria-hidden="true" />
             )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className={`text-sm font-bold uppercase tracking-wide ${isAchievement ? 'text-yellow-500' : 'text-blue-400'}`}>
              {isAchievement ? 'Conquista Desbloqueada!' : notification.title}
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              {isAchievement ? notification.title : notification.message}
            </p>
            {isAchievement && (
                <p className="mt-1 text-xs text-slate-400">{notification.message}</p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-slate-800 text-slate-400 hover:text-slate-500 focus:outline-none"
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(notification.id), 300);
              }}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
