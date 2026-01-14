export enum GameStatus {
  Playing = 'Em Andamento',
  Paused = 'Pausado',
  Dropped = 'Desistiu',
  Completed = 'Concluído'
}

export enum GamePerception {
  Like = 'Gostei',
  Neutral = 'Neutro',
  Dislike = 'Não Gostei'
}

export enum PlatformCategory {
  Console = 'Console',
  Handheld = 'Portátil',
  PC = 'Computador',
  Mobile = 'Mobile',
  Arcade = 'Arcade/Outros'
}

export enum TimelineEventType {
  Start = 'start',
  Finish = 'finish',
  Replay = 'replay',
  Pause = 'pause',
  Drop = 'drop',
  // Achievement is a virtual event type for the timeline view, but useful to have in the enum context
  Achievement = 'achievement'
}

export interface Platform {
  id: string;
  name: string;
  category: PlatformCategory;
  color: string; // Tailwind color class or hex
  icon?: string;
  brand?: 'sony' | 'microsoft' | 'nintendo' | 'sega' | 'pc' | 'mobile' | 'other';
}

export interface Series {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface Game {
  id: string;
  title: string;
  cover: string;
  genres: string[];
  platformIds: string[]; // IDs of platforms played on
  seriesId?: string;
  status: GameStatus;
  perception: GamePerception;
  rating?: number; // 0-5
  generalComment?: string;
  playAgain: boolean;
  completionType?: 'Normal' | '100%';
}

export interface TimelineEvent {
  id: string;
  // ISO string with date or date-time. Examples:
  // - date only: 2024-01-14
  // - date + time: 2024-01-14T18:25:43.511Z
  // The app will use the full ISO datetime for ordering, but render only the localized date for display.
  date: string;
  type: TimelineEventType;
  gameId: string;
  platformId?: string; // Specific platform for this event
  note?: string;
}

export interface Achievement {
  id: string; // Matches 'key' from requirements
  title: string;
  description: string;
  icon: string; // Lucide icon name
  unlocked: boolean;
  unlockedDate?: string;
  isSecret: boolean;
  type: 'boolean' | 'progressive';
  metric?: number; // Target for progressive
  currentValue?: number; // Current progress
}

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'info';
  icon?: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
}

export interface AppSettings {
  theme: 'dark'; // Forced dark
  enableNotifications: boolean; // Forced true
  activePlatforms: string[]; // List of platform IDs enabled
  rawgApiKey?: string;
}
