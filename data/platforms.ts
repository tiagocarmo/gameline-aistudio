
import { Platform, PlatformCategory } from '../types';

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
