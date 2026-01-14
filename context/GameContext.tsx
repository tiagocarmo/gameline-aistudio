import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import {
  Game,
  TimelineEvent,
  Achievement,
  GameStatus,
  UserProfile,
  AppSettings,
  TimelineEventType
} from '../types';
import {
  GAMES,
  TIMELINE_EVENTS,
  ACHIEVEMENTS,
  DEFAULT_AVATAR
} from '../data';
import { toast } from '../hooks/use-toast';

interface GameContextType {
  games: Game[];
  events: TimelineEvent[];
  achievements: Achievement[];
  userProfile: UserProfile;
  settings: AppSettings;
  addGame: (game: Game) => void;
  addEvent: (event: TimelineEvent) => void;
  updateUserProfile: (profile: UserProfile) => void;
  updateSettings: (settings: AppSettings) => void;
  exportData: () => void;
  resetData: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- STATE INITIALIZATION ---

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('gl_profile');
      return saved ? JSON.parse(saved) : { name: '', avatar: DEFAULT_AVATAR };
    } catch {
      return { name: '', avatar: DEFAULT_AVATAR };
    }
  });

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('gl_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, theme: 'dark', enableNotifications: true };
      }

      const defaultActivePlatforms = [
        'ios',
        'mac',
        'pc_windows',
        'ps1', 'ps2', 'ps5', 'psvita',
        'xbox_one', 'xbox_series',
        'switch', 'gba'
      ];

      return {
        theme: 'dark',
        enableNotifications: true,
        activePlatforms: defaultActivePlatforms
      };
    } catch {
      return { theme: 'dark', enableNotifications: true, activePlatforms: [] };
    }
  });

  const [games, setGames] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem('gl_games');
      return saved ? JSON.parse(saved) : GAMES;
    } catch {
      return GAMES;
    }
  });

  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    try {
      const saved = localStorage.getItem('gl_events');
      return saved ? JSON.parse(saved) : TIMELINE_EVENTS;
    } catch {
      return TIMELINE_EVENTS;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('gl_achievements');
      const savedAchievements: Achievement[] = saved ? JSON.parse(saved) : [];
      return ACHIEVEMENTS.map(constantAch => {
        const savedAch = savedAchievements.find(s => s.id === constantAch.id);
        return savedAch ? { ...constantAch, unlocked: savedAch.unlocked, unlockedDate: savedAch.unlockedDate, currentValue: savedAch.currentValue } : constantAch;
      });
    } catch {
      return ACHIEVEMENTS;
    }
  });

  // --- PERSISTENCE ---
  useEffect(() => { localStorage.setItem('gl_games', JSON.stringify(games)); }, [games]);
  useEffect(() => { localStorage.setItem('gl_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('gl_achievements', JSON.stringify(achievements)); }, [achievements]);
  useEffect(() => { localStorage.setItem('gl_profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('gl_settings', JSON.stringify(settings)); }, [settings]);

  // --- ACTIONS ---

  const addGame = (game: Game) => {
    setGames(prev => [game, ...prev]);
  };

  const addEvent = (event: TimelineEvent) => {
    setEvents(prev => [event, ...prev]);
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const exportData = () => {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      userProfile,
      settings,
      games,
      events,
      achievements
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gameline_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  // --- ACHIEVEMENT ENGINE ---
  const checkAchievements = () => {
    const newAchievements = [...achievements];
    let hasChanges = false;

    const unlock = (id: string) => {
      const idx = newAchievements.findIndex(a => a.id === id);
      if (idx !== -1 && !newAchievements[idx].unlocked) {
        newAchievements[idx].unlocked = true;
        newAchievements[idx].unlockedDate = new Date().toISOString();
        hasChanges = true;

        // Notify using new Toast variant
        toast({
          title: "Conquista Desbloqueada!",
          description: newAchievements[idx].title,
          variant: "achievement"
        });
      }
    };

    const updateProgress = (id: string, value: number) => {
      const idx = newAchievements.findIndex(a => a.id === id);
      if (idx !== -1) {
        newAchievements[idx].currentValue = value;
        if (newAchievements[idx].metric && value >= newAchievements[idx].metric!) {
          unlock(id);
        }
      }
    };

    // 1. Basic Counts
    updateProgress('complete_3_games', games.filter(g => g.status === GameStatus.Completed).length);
    updateProgress('complete_5_games', games.filter(g => g.status === GameStatus.Completed).length);
    updateProgress('complete_10_games', games.filter(g => g.status === GameStatus.Completed).length);
    updateProgress('complete_20_games', games.filter(g => g.status === GameStatus.Completed).length);
    updateProgress('complete_50_games', games.filter(g => g.status === GameStatus.Completed).length);
    updateProgress('complete_100_games', games.filter(g => g.status === GameStatus.Completed).length);

    // 2. Firsts
    if (games.length > 0) unlock('first_game_added');
    if (events.some(e => e.type === TimelineEventType.Start)) unlock('first_game_started');
    if (events.some(e => e.type === TimelineEventType.Finish)) unlock('first_game_completed');
    if (events.some(e => e.type === TimelineEventType.Drop)) unlock('first_game_abandoned');
    if (games.some(g => g.status === GameStatus.Completed && g.completionType === '100%')) unlock('first_game_completed_100');

    // Monthly/Yearly logic
    const finishedEvents = events.filter(e => e.type === TimelineEventType.Finish);
    const eventsByMonth: Record<string, number> = {};
    const eventsByYear: Record<string, number> = {};

    finishedEvents.forEach(e => {
      const d = new Date(e.date);
      const monthKey = `${d.getFullYear()}-${d.getMonth()}`;
      const yearKey = `${d.getFullYear()}`;

      eventsByMonth[monthKey] = (eventsByMonth[monthKey] || 0) + 1;
      eventsByYear[yearKey] = (eventsByYear[yearKey] || 0) + 1;
    });

    const maxMonth = Math.max(0, ...Object.values(eventsByMonth));
    const maxYear = Math.max(0, ...Object.values(eventsByYear));

    if (maxMonth >= 3) unlock('complete_3_games_month');
    if (maxMonth >= 10) unlock('complete_10_games_month');
    if (maxMonth >= 30) unlock('complete_30_games_month');

    if (maxYear >= 10) unlock('complete_10_games_year');
    if (maxYear >= 25) unlock('complete_25_games_year');
    if (maxYear >= 50) unlock('complete_50_games_year');

    if (hasChanges) {
      setAchievements(newAchievements);
    }
  };

  useEffect(() => {
    const newAchievements = [...achievements];
    const idx = newAchievements.findIndex(a => a.id === 'first_access');
    if (idx !== -1 && !newAchievements[idx].unlocked) {
      newAchievements[idx].unlocked = true;
      newAchievements[idx].unlockedDate = new Date().toISOString();
      setAchievements(newAchievements);
      toast({
        title: "Bem-vindo à GameLine",
        description: "Acessou a GameLine pela primeira vez.",
        variant: "achievement"
      });
    }
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [games.length, events.length]);

  return (
    <GameContext.Provider value={{ games, events, achievements, userProfile, settings, addGame, addEvent, updateUserProfile, updateSettings, exportData, resetData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGames must be used within a GameProvider');
  return context;
};
