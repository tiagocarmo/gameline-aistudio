
import { Game, Platform, TimelineEvent, Achievement, Series, GameStatus, GamePerception, PlatformCategory, TimelineEventType } from './types';

// --- Platforms ---
// Organized based on the provided PDF and User's specific hardware list
export const PLATFORMS: Record<string, Platform> = {
  // Sony
  'ps1': { id: 'ps1', name: 'PlayStation', category: PlatformCategory.Console, color: 'text-slate-400 bg-slate-500/10', brand: 'sony' },
  'ps2': { id: 'ps2', name: 'PlayStation 2', category: PlatformCategory.Console, color: 'text-blue-400 bg-blue-500/10', brand: 'sony' },
  'ps3': { id: 'ps3', name: 'PlayStation 3', category: PlatformCategory.Console, color: 'text-slate-300 bg-slate-500/10', brand: 'sony' },
  'ps4': { id: 'ps4', name: 'PlayStation 4', category: PlatformCategory.Console, color: 'text-blue-500 bg-blue-600/10', brand: 'sony' },
  'ps5': { id: 'ps5', name: 'PlayStation 5', category: PlatformCategory.Console, color: 'text-blue-500 bg-blue-500/10', brand: 'sony' },
  'psp': { id: 'psp', name: 'PSP', category: PlatformCategory.Handheld, color: 'text-slate-400 bg-slate-500/10', brand: 'sony' },
  'psvita': { id: 'psvita', name: 'PS Vita', category: PlatformCategory.Handheld, color: 'text-blue-400 bg-blue-500/10', brand: 'sony' },

  // Microsoft
  'xbox': { id: 'xbox', name: 'Xbox', category: PlatformCategory.Console, color: 'text-green-600 bg-green-600/10', brand: 'microsoft' },
  'xbox_360': { id: 'xbox_360', name: 'Xbox 360', category: PlatformCategory.Console, color: 'text-green-500 bg-green-500/10', brand: 'microsoft' },
  'xbox_one': { id: 'xbox_one', name: 'Xbox One', category: PlatformCategory.Console, color: 'text-green-500 bg-green-500/10', brand: 'microsoft' },
  'xbox_series': { id: 'xbox_series', name: 'Xbox Series X|S', category: PlatformCategory.Console, color: 'text-emerald-500 bg-emerald-500/10', brand: 'microsoft' },

  // Nintendo
  'nes': { id: 'nes', name: 'NES', category: PlatformCategory.Console, color: 'text-red-600 bg-red-600/10', brand: 'nintendo' },
  'snes': { id: 'snes', name: 'SNES', category: PlatformCategory.Console, color: 'text-purple-400 bg-purple-500/10', brand: 'nintendo' },
  'n64': { id: 'n64', name: 'Nintendo 64', category: PlatformCategory.Console, color: 'text-orange-500 bg-orange-500/10', brand: 'nintendo' },
  'gamecube': { id: 'gamecube', name: 'GameCube', category: PlatformCategory.Console, color: 'text-purple-600 bg-purple-600/10', brand: 'nintendo' },
  'wii': { id: 'wii', name: 'Wii', category: PlatformCategory.Console, color: 'text-sky-400 bg-sky-500/10', brand: 'nintendo' },
  'wiiu': { id: 'wiiu', name: 'Wii U', category: PlatformCategory.Console, color: 'text-sky-600 bg-sky-600/10', brand: 'nintendo' },
  'switch': { id: 'switch', name: 'Nintendo Switch', category: PlatformCategory.Handheld, color: 'text-red-500 bg-red-500/10', brand: 'nintendo' },
  'gb': { id: 'gb', name: 'Game Boy', category: PlatformCategory.Handheld, color: 'text-slate-400 bg-slate-500/10', brand: 'nintendo' },
  'gbc': { id: 'gbc', name: 'Game Boy Color', category: PlatformCategory.Handheld, color: 'text-purple-400 bg-purple-500/10', brand: 'nintendo' },
  'gba': { id: 'gba', name: 'Game Boy Advance', category: PlatformCategory.Handheld, color: 'text-indigo-400 bg-indigo-500/10', brand: 'nintendo' },
  'ds': { id: 'ds', name: 'Nintendo DS', category: PlatformCategory.Handheld, color: 'text-slate-400 bg-slate-500/10', brand: 'nintendo' },
  '3ds': { id: '3ds', name: 'Nintendo 3DS', category: PlatformCategory.Handheld, color: 'text-red-500 bg-red-500/10', brand: 'nintendo' },

  // Computers
  'pc_windows': { id: 'pc_windows', name: 'PC (Windows)', category: PlatformCategory.PC, color: 'text-cyan-400 bg-cyan-500/10', brand: 'pc' },
  'mac': { id: 'mac', name: 'Mac', category: PlatformCategory.PC, color: 'text-slate-200 bg-slate-500/10', brand: 'pc' },
  'linux': { id: 'linux', name: 'Linux', category: PlatformCategory.PC, color: 'text-yellow-500 bg-yellow-500/10', brand: 'pc' },

  // Mobile
  'ios': { id: 'ios', name: 'iOS', category: PlatformCategory.Mobile, color: 'text-slate-100 bg-slate-500/10', brand: 'mobile' },
  'android': { id: 'android', name: 'Android', category: PlatformCategory.Mobile, color: 'text-green-400 bg-green-500/10', brand: 'mobile' },

  // Retro / Arcade / Sega
  'arcade': { id: 'arcade', name: 'Arcade', category: PlatformCategory.Arcade, color: 'text-pink-500 bg-pink-500/10', brand: 'other' },
  'megadrive': { id: 'megadrive', name: 'Mega Drive', category: PlatformCategory.Console, color: 'text-slate-400 bg-slate-900', brand: 'sega' },
  'dreamcast': { id: 'dreamcast', name: 'Dreamcast', category: PlatformCategory.Console, color: 'text-orange-400 bg-orange-500/10', brand: 'sega' },
};

export const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/adventurer/svg?seed=Eden&backgroundType=gradientLinear&earrings=variant01&earringsProbability=0&eyebrows=variant02&eyes=variant12&features[]&featuresProbability=0&glasses=variant02&glassesProbability=100&hair=short16,short14,short11&hairColor=0e0e0e,6a4e35,796a45,ac6511,b9a05f&mouth=variant23&skinColor=ecad80&backgroundColor=ffdfbf,ffd5dc";

// --- Series ---
export const SERIES: Record<string, Series> = {
  'zelda': { id: 'zelda', name: 'The Legend of Zelda', description: 'Uma série de fantasia épica.' },
  'souls': { id: 'souls', name: 'Dark Souls', description: 'Action RPG desafiador.' },
};

// --- Games ---
export const GAMES: Game[] = [
  {
    id: 'g1',
    title: 'Elden Ring',
    cover: 'https://picsum.photos/400/600?random=1',
    genres: ['RPG', 'Open World'],
    platformIds: ['ps5', 'pc_windows'],
    seriesId: 'souls',
    status: GameStatus.Completed,
    perception: GamePerception.Like,
    generalComment: 'Uma obra prima absoluta. O mundo aberto redefine o gênero.',
    playAgain: true,
    completionType: '100%'
  },
  {
    id: 'g2',
    title: 'The Legend of Zelda: Breath of the Wild',
    cover: 'https://picsum.photos/400/600?random=2',
    genres: ['Adventure', 'Open World'],
    platformIds: ['switch'],
    seriesId: 'zelda',
    status: GameStatus.Completed,
    perception: GamePerception.Like,
    playAgain: true,
    completionType: 'Normal'
  },
  {
    id: 'g3',
    title: 'Hollow Knight',
    cover: 'https://picsum.photos/400/600?random=3',
    genres: ['Metroidvania', 'Platformer'],
    platformIds: ['pc_windows', 'switch'],
    status: GameStatus.Playing,
    perception: GamePerception.Like,
    generalComment: 'Difícil, mas a arte é linda.',
    playAgain: true
  },
  {
    id: 'g5',
    title: 'Metroid Fusion',
    cover: 'https://picsum.photos/400/600?random=5',
    genres: ['Metroidvania'],
    platformIds: ['gba'],
    status: GameStatus.Completed,
    perception: GamePerception.Like,
    playAgain: true,
    completionType: 'Normal'
  }
];

// --- Timeline Events ---
export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 'e1', date: '2024-05-20', type: TimelineEventType.Start, gameId: 'g3', platformId: 'pc_windows' },
  { id: 'e2', date: '2024-04-15', type: TimelineEventType.Finish, gameId: 'g1', platformId: 'ps5', note: 'Platina conquistada! Malenia foi difícil.' },
  { id: 'e3', date: '2024-02-10', type: TimelineEventType.Start, gameId: 'g1', platformId: 'ps5' },
  { id: 'e6', date: '2023-08-15', type: TimelineEventType.Replay, gameId: 'g2', platformId: 'switch', note: 'Rejogando antes do lançamento do novo.' },
  { id: 'e7', date: '2023-01-20', type: TimelineEventType.Finish, gameId: 'g5', platformId: 'gba', note: 'Clássico absoluto no emulador.' },
  { id: 'e8', date: '2017-04-03', type: TimelineEventType.Finish, gameId: 'g2', platformId: 'switch' },
  { id: 'e9', date: '2017-03-03', type: TimelineEventType.Start, gameId: 'g2', platformId: 'switch' },
];

// --- Achievements ---
export const ACHIEVEMENTS: Achievement[] = [
    {
      id: "first_access",
      type: "boolean",
      title: "Bem-vindo à GameLine",
      description: "Acessou a GameLine pela primeira vez.",
      isSecret: false,
      icon: "Sparkles",
      unlocked: false
    },
    {
      id: "first_platform_added",
      type: "boolean",
      title: "Onde tudo começa",
      description: "Cadastrou a primeira plataforma.",
      isSecret: false,
      icon: "Monitor", 
      unlocked: false
    },
    {
      id: "first_game_added",
      type: "boolean",
      title: "Primeira entrada na linha do tempo",
      description: "Cadastrou o primeiro jogo na GameLine.",
      isSecret: false,
      icon: "Gamepad2",
      unlocked: false
    },
    {
      id: "first_game_started",
      type: "boolean",
      title: "Aperte Start",
      description: "Iniciou o primeiro jogo.",
      isSecret: false,
      icon: "Play",
      unlocked: false
    },
    {
      id: "first_game_completed",
      type: "boolean",
      title: "Até os créditos finais",
      description: "Concluiu um jogo pela primeira vez.",
      isSecret: false,
      icon: "Flag",
      unlocked: false
    },
    {
      id: "first_game_completed_100",
      type: "boolean",
      title: "A primeira platina a gente nunca esquece",
      description: "Concluiu um jogo em 100% pela primeira vez.",
      isSecret: false,
      icon: "Trophy",
      unlocked: false
    },
    {
      id: "first_replay_completed",
      type: "boolean",
      title: "Mais uma vez, com gosto",
      description: "Concluiu um jogo pela segunda vez.",
      isSecret: false,
      icon: "Repeat",
      unlocked: false
    },
    {
      id: "complete_3_games",
      type: "progressive",
      metric: 3,
      currentValue: 0,
      title: "Embalando",
      description: "Concluiu 3 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_5_games",
      type: "progressive",
      metric: 5,
      currentValue: 0,
      title: "Ritmo constante",
      description: "Concluiu 5 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_10_games",
      type: "progressive",
      metric: 10,
      currentValue: 0,
      title: "Linha do tempo em movimento",
      description: "Concluiu 10 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_20_games",
      type: "progressive",
      metric: 20,
      currentValue: 0,
      title: "Já virou hábito",
      description: "Concluiu 20 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_50_games",
      type: "progressive",
      metric: 50,
      currentValue: 0,
      title: "Coleção respeitável",
      description: "Concluiu 50 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_100_games",
      type: "progressive",
      metric: 100,
      currentValue: 0,
      title: "Linha do tempo extensa",
      description: "Concluiu 100 jogos no total.",
      isSecret: false,
      icon: "Layers",
      unlocked: false
    },
    {
      id: "complete_365_games",
      type: "progressive",
      metric: 365,
      currentValue: 0,
      title: "Um por dia",
      description: "Concluiu 365 jogos no total.",
      isSecret: true,
      icon: "Calendar",
      unlocked: false
    },
    {
      id: "complete_1000_games",
      type: "progressive",
      metric: 1000,
      currentValue: 0,
      title: "Lenda da GameLine",
      description: "Concluiu 1000 jogos no total.",
      isSecret: true,
      icon: "Crown",
      unlocked: false
    },
    {
      id: "complete_3_games_month",
      type: "boolean",
      title: "Mês produtivo",
      description: "Concluiu 3 jogos em um mesmo mês.",
      isSecret: false,
      icon: "CalendarCheck",
      unlocked: false
    },
    {
      id: "complete_10_games_month",
      type: "boolean",
      title: "Maratona mensal",
      description: "Concluiu 10 jogos em um mesmo mês.",
      isSecret: false,
      icon: "Calendar",
      unlocked: false
    },
    {
      id: "complete_30_games_month",
      type: "boolean",
      title: "Esse mês entrou pra história",
      description: "Concluiu 30 jogos em um único mês.",
      isSecret: true,
      icon: "Calendar",
      unlocked: false
    },
    {
      id: "complete_10_games_year",
      type: "boolean",
      title: "Ano consistente",
      description: "Concluiu 10 jogos em um mesmo ano.",
      isSecret: false,
      icon: "Calendar",
      unlocked: false
    },
    {
      id: "complete_25_games_year",
      type: "boolean",
      title: "Ano produtivo",
      description: "Concluiu 25 jogos em um mesmo ano.",
      isSecret: false,
      icon: "Calendar",
      unlocked: false
    },
    {
      id: "complete_50_games_year",
      type: "boolean",
      title: "Ano lendário",
      description: "Concluiu 50 jogos em um mesmo ano.",
      isSecret: true,
      icon: "Crown",
      unlocked: false
    },
    {
      id: "first_series_registered",
      type: "boolean",
      title: "Isso é só o começo da saga",
      description: "Cadastrou a primeira série de jogos.",
      isSecret: false,
      icon: "Library", 
      unlocked: false
    },
    {
      id: "complete_3_games_same_series",
      type: "progressive",
      metric: 3,
      currentValue: 0,
      title: "Maratona de saga",
      description: "Concluiu 3 jogos da mesma série.",
      isSecret: false,
      icon: "Library",
      unlocked: false
    },
    {
      id: "complete_10_games_same_series",
      type: "progressive",
      metric: 10,
      currentValue: 0,
      title: "Fã declarado",
      description: "Concluiu 10 jogos da mesma série.",
      isSecret: true,
      icon: "Heart",
      unlocked: false
    },
    {
      id: "play_on_5_platforms",
      type: "progressive",
      metric: 5,
      currentValue: 0,
      title: "Sem preconceito de hardware",
      description: "Jogou em 5 plataformas diferentes.",
      isSecret: false,
      icon: "Shuffle",
      unlocked: false
    },
    {
      id: "first_game_abandoned",
      type: "boolean",
      title: "Nem todo jogo é pra todo mundo",
      description: "Desistiu de um jogo pela primeira vez.",
      isSecret: false,
      icon: "XCircle",
      unlocked: false
    },
    {
      id: "replay_same_game_5_times",
      type: "boolean",
      title: "Esse mora no coração",
      description: "Concluiu o mesmo jogo 5 vezes.",
      isSecret: true,
      icon: "Heart",
      unlocked: false
    },
    {
      id: "unlock_100_achievements",
      type: "boolean",
      title: "Completista da GameLine",
      description: "Desbloqueou todas as conquistas da GameLine.",
      isSecret: true,
      icon: "Crown",
      unlocked: false
    },
    {
      id: "gimeline_master",
      type: "boolean",
      title: "Mestre da GameLine",
      description: "Construiu uma linha do tempo completa da sua vida gamer.",
      isSecret: true,
      icon: "Infinity",
      unlocked: false
    }
];
