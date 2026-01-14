import React, { useState } from 'react';
import { useGames } from '../context/GameContext';
import { PLATFORMS, DEFAULT_AVATAR } from '../data';
import { PlatformCategory } from '../types';
import { Heading, Text } from './atoms/Typography';
import Button from './atoms/Button';
import Label from './atoms/Label';
import Input from './atoms/Input';
import {
  User,
  Monitor,
  Gamepad2,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Laptop,
  Tv,
  Gamepad,
  Ghost,
  Save,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border bg-slate-800/50 border-slate-700/50 transition-all duration-300 overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Icon size={20} />
          </div>
          <h3 className="font-bold text-lg text-slate-100">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 border-t border-white/5">
          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to group platforms
const getCategoryIcon = (cat: PlatformCategory) => {
  switch (cat) {
    case PlatformCategory.Console: return Tv;
    case PlatformCategory.Handheld: return Gamepad;
    case PlatformCategory.PC: return Laptop;
    case PlatformCategory.Mobile: return Smartphone;
    default: return Ghost;
  }
}

const Settings: React.FC = () => {
  const { userProfile, settings, updateUserProfile, updateSettings } = useGames();
  const navigate = useNavigate();

  // Determine if it is first run (empty name initially)
  const isFirstRun = !userProfile.name;

  // Local state
  const [name, setName] = useState(userProfile.name);
  const [avatar, setAvatar] = useState(userProfile.avatar || DEFAULT_AVATAR);
  const [apiKey, setApiKey] = useState(settings.rawgApiKey || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Platform Toggle Handler
  const togglePlatform = (platformId: string) => {
    const current = settings.activePlatforms;
    let updated;
    if (current.includes(platformId)) {
      updated = current.filter(id => id !== platformId);
    } else {
      updated = [...current, platformId];
    }
    updateSettings({ ...settings, activePlatforms: updated });
  };

  // Main Save Handler
  const handleSaveAll = () => {
    if (!name.trim()) return;

    setIsSaving(true);

    // Save Profile
    updateUserProfile({ name, avatar });

    // Save API Key (Platforms are saved instantly via toggle)
    updateSettings({ ...settings, rawgApiKey: apiKey });

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      if (isFirstRun) {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    }, 800);
  };

  // Group platforms for display
  const platformsByCategory = Object.values(PLATFORMS).reduce((acc, platform) => {
    if (!acc[platform.category]) acc[platform.category] = [];
    acc[platform.category].push(platform);
    return acc;
  }, {} as Record<PlatformCategory, typeof PLATFORMS['ps5'][]>);

  // Define Category Order
  const categoryOrder = [
    PlatformCategory.Console,
    PlatformCategory.Handheld,
    PlatformCategory.PC,
    PlatformCategory.Mobile,
    PlatformCategory.Arcade
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32 pt-10 animate-fade-in">
      <div className="w-full">
        <div className="mb-10">
          <Heading>Configurações</Heading>
          <Text variant="muted">
            {isFirstRun ? "Vamos configurar seu perfil para começar." : "Gerencie seu perfil e plataformas."}
          </Text>
        </div>

        {/* 1. Perfil do Usuário */}
        <CollapsibleSection title="Perfil do Usuário" icon={User} defaultOpen>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-auto flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden shadow-xl bg-slate-900 relative">
                <img
                  src={avatar}
                  onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 w-full space-y-5">
              <div>
                <Label required>Nome de Exibição</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Como quer ser chamado?"
                />
              </div>
              <div>
                <Label>URL do Avatar</Label>
                <Input
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  placeholder="https://..."
                />
                <Text variant="small" className="mt-1">Deixe em branco para usar o avatar padrão.</Text>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* 2. Plataformas Ativas (Segmentadas) */}
        <CollapsibleSection title="Plataformas Ativas" icon={Gamepad2} defaultOpen={isFirstRun}>
          <div className="mb-6">
            <Text>Selecione os sistemas que você possui. Apenas os marcados aparecerão na hora de cadastrar jogos.</Text>
          </div>

          <div className="space-y-8">
            {categoryOrder.map(cat => {
              const catPlatforms = platformsByCategory[cat];
              if (!catPlatforms) return null;
              const CatIcon = getCategoryIcon(cat);

              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3 text-slate-400 border-b border-slate-800 pb-2">
                    <CatIcon size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">{cat}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {catPlatforms.map(p => {
                      const isActive = settings.activePlatforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all ${isActive ? 'bg-indigo-600/20 border-indigo-500/50 text-white' : 'bg-slate-900 border-slate-700 text-slate-500 grayscale opacity-60 hover:opacity-100'}`}
                        >
                          <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-700'}`}></div>
                          <span className="text-xs font-bold uppercase truncate">{p.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CollapsibleSection>

        {/* 3. Integrações Externas */}
        <CollapsibleSection title="Integrações Externas" icon={Monitor}>
          <div className="space-y-4">
            <div>
              <Label>Chave da API RAWG (Opcional)</Label>
              <Input
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Insira sua chave API..."
                type="password"
              />
              <Text variant="small" className="mt-2">
                Utilizada para buscar capas e dados de jogos automaticamente.
                <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline ml-1">Obter chave gratuita</a>.
              </Text>
            </div>
          </div>
        </CollapsibleSection>

        {/* Big Save Button */}
        <div className="mt-12 mb-8 flex flex-col items-center">
          <Button
            onClick={handleSaveAll}
            disabled={!name.trim() || isSaving}
            icon={isSaving ? Loader2 : Save}
            className={`
                        w-full md:w-[340px] h-auto
                        py-6 text-lg font-bold shadow-xl
                        transition-all hover:scale-[1.02] active:scale-[0.98]
                        ${saveSuccess ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500' : ''}
                    `}
          >
            {isSaving ? 'Salvando...' : saveSuccess ? 'Salvo!' : 'Salvar'}
          </Button>

          {saveSuccess && isFirstRun && (
            <div className="text-center mt-4 animate-fade-in text-emerald-400 font-bold">
              Redirecionando para a Timeline em 3 segundos...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
