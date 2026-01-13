
import { Achievement } from '../types';

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
