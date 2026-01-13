
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { PLATFORMS } from '../data';
import { GameStatus, GamePerception, Game, TimelineEventType } from '../types';
import { Save, Search, Loader2, Sparkles, ChevronRight, Library, DownloadCloud, AlertCircle, Edit3, ArrowLeft } from 'lucide-react';
import { Heading, Text } from './atoms/Typography';
import Button from './atoms/Button';
import Card from './atoms/Card';
import Input from './atoms/Input';
import Label from './atoms/Label';
import Textarea from './atoms/TextArea';
import { searchGames, ApiGameResult } from '../services/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './atoms/Select';

const AddGame: React.FC = () => {
  const navigate = useNavigate();
  const { addGame, addEvent, settings, games } = useGames();

  // Step Control: 'search' | 'edit'
  const [step, setStep] = useState<'search' | 'edit'>('search');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ApiGameResult[]>([]);
  const [localResults, setLocalResults] = useState<Game[]>([]); // New state for local matches
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.Playing);
  const [perception, setPerception] = useState<GamePerception>(GamePerception.Neutral);
  const [comment, setComment] = useState('');
  
  // Handlers
  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      
      setIsSearching(true);
      setHasSearched(true);
      setApiError(null);
      setSearchResults([]);
      
      try {
          // 1. Search Local Library
          const localMatches = games.filter(g => 
              g.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setLocalResults(localMatches);

          // 2. Search API
          const results = await searchGames(searchQuery, settings.rawgApiKey);
          setSearchResults(results);
      } catch (error) {
          console.error("API Search Error:", error);
          setApiError("Falha na comunicação com a API (Chave Inválida ou Erro de Rede). Use o cadastro manual abaixo.");
      } finally {
          setIsSearching(false);
      }
  };

  const handleSelectGame = (apiGame: ApiGameResult) => {
      setTitle(apiGame.name);
      setCover(apiGame.background_image);
      setGenres(apiGame.genres.map(g => g.name));
      
      // Smart Platform Matching - Only match active platforms
      const detectedIds: string[] = [];
      apiGame.platforms.forEach(p => {
          const slug = p.platform.slug.toLowerCase();
          // Heuristics for mapping RAWG slugs to our IDs
          if (slug.includes('playstation5')) detectedIds.push('ps5');
          else if (slug.includes('playstation4')) detectedIds.push('ps4');
          else if (slug.includes('playstation3')) detectedIds.push('ps3');
          else if (slug.includes('playstation2')) detectedIds.push('ps2');
          else if (slug === 'playstation') detectedIds.push('ps1');
          
          if (slug.includes('xbox-series')) detectedIds.push('xbox_series');
          else if (slug.includes('xbox-one')) detectedIds.push('xbox_one');
          else if (slug.includes('xbox360')) detectedIds.push('xbox_360');
          
          if (slug.includes('switch')) detectedIds.push('switch');
          if (slug.includes('wii-u')) detectedIds.push('wiiu');
          if (slug.includes('wii')) detectedIds.push('wii');
          
          if (slug.includes('pc')) detectedIds.push('pc_windows');
      });
      
      // Filter out platforms disabled in settings
      const validDetectedIds = detectedIds.filter(id => settings.activePlatforms.includes(id));

      if (validDetectedIds.length > 0) setSelectedPlatforms([...new Set(validDetectedIds)]);

      setStep('edit');
  };

  const handleSkipToManual = () => {
      setTitle(searchQuery);
      setCover('https://picsum.photos/400/600?random=' + Math.floor(Math.random() * 100));
      setStep('edit');
  };

  const handleGoToLibrary = (gameName: string) => {
      navigate('/library'); 
  }

  const canSubmit = title.length > 0 && selectedPlatforms.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newGameId = `g${Date.now()}`;
    const newGame: Game = {
      id: newGameId,
      title,
      cover,
      genres, 
      platformIds: selectedPlatforms,
      status,
      perception,
      generalComment: comment,
      playAgain: perception === GamePerception.Like,
    };

    // 1. Save Game
    addGame(newGame);

    // 2. Determine Initial Event based on Status
    let eventType = TimelineEventType.Start;
    
    switch (status) {
        case GameStatus.Completed:
            eventType = TimelineEventType.Finish;
            break;
        case GameStatus.Dropped:
            eventType = TimelineEventType.Drop;
            break;
        case GameStatus.Paused:
            eventType = TimelineEventType.Pause;
            break;
        case GameStatus.Playing:
        default:
            eventType = TimelineEventType.Start;
            break;
    }

    // 3. Create Timeline Event
    addEvent({
        id: `e${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: eventType,
        gameId: newGameId,
        platformId: selectedPlatforms[0]
    });

    navigate('/');
  };

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(prev => prev.filter(p => p !== id));
    } else {
      setSelectedPlatforms(prev => [...prev, id]);
    }
  };

  // --- RENDER: STEP 1 (SEARCH) ---
  if (step === 'search') {
      return (
        <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
            <div className="w-full">
                {/* Cancel Button Removed */}
                
                <div className="text-left mb-8">
                    <Heading>Novo Jogo</Heading>
                    <Text variant="muted">Busque o jogo para verificar na biblioteca ou preencher automaticamente.</Text>
                </div>

                <Card className="mb-8">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Digite o nome do jogo..." 
                            autoFocus
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all text-lg"
                        />
                        <div className="absolute right-2 top-2 bottom-2">
                            <Button type="submit" variant="primary" disabled={isSearching} className="h-full px-4 py-0 text-sm">
                                {isSearching ? <Loader2 className="animate-spin" size={16} /> : 'Buscar'}
                            </Button>
                        </div>
                    </form>
                    {!settings.rawgApiKey && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 p-2 rounded-lg">
                            <AlertCircle size={14} />
                            <span>Para melhores resultados de capa e dados, adicione sua chave RAWG nas Configurações.</span>
                        </div>
                    )}
                </Card>

                {/* API Error Alert */}
                {apiError && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 animate-fade-in">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <div className="flex-1 text-sm font-medium">
                            {apiError}
                        </div>
                    </div>
                )}

                {/* Local Library Matches */}
                {localResults.length > 0 && (
                    <div className="mb-8 animate-fade-in">
                        <div className="flex items-center gap-2 mb-3 text-indigo-400">
                            <Library size={18} />
                            <h3 className="text-sm font-bold uppercase tracking-wider">Na sua Biblioteca</h3>
                        </div>
                        <div className="space-y-3">
                             {localResults.map(game => (
                                <div 
                                    key={game.id} 
                                    onClick={() => handleGoToLibrary(game.title)}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 cursor-pointer transition-all hover:bg-indigo-500/20 group"
                                >
                                    <img src={game.cover} alt={game.title} className="w-12 h-16 object-cover rounded-lg bg-slate-900 shadow-sm" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-indigo-200 text-lg">{game.title}</h3>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wide bg-indigo-500 text-white px-2 py-1 rounded-md">JÁ CADASTRADO</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* API / Search Results */}
                {hasSearched && !apiError && searchResults.length > 0 && (
                     <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                            {settings.rawgApiKey ? <DownloadCloud size={18} /> : <Edit3 size={18} />}
                            <h3 className="text-sm font-bold uppercase tracking-wider">
                                {settings.rawgApiKey ? 'Sugestões da Web' : 'Cadastro Manual'}
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {searchResults.map(game => (
                                <div 
                                    key={game.id} 
                                    onClick={() => handleSelectGame(game)}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-slate-700/50 cursor-pointer transition-all group"
                                >
                                    <img src={game.background_image} alt={game.name} className="w-12 h-16 object-cover rounded-lg bg-slate-900 shadow-sm" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 text-lg">{game.name}</h3>
                                        <div className="flex gap-2 mt-1 flex-wrap">
                                            {game.genres.slice(0, 3).map(g => (
                                                <span key={g.name} className="text-[10px] uppercase font-bold tracking-wide bg-slate-900 text-slate-500 px-2 py-1 rounded-md">{g.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State / Fallback / Error Fallback */}
                {hasSearched && !isSearching && (searchResults.length === 0 && localResults.length === 0) && (
                    <div className="mt-8 text-left animate-fade-in bg-slate-800/50 p-6 rounded-xl border border-slate-700 border-dashed">
                        <Text variant="small" className="mb-2">
                            {apiError ? 'Deseja prosseguir mesmo assim?' : 'Não encontrou o que procurava?'}
                        </Text>
                        <Button variant="ghost" onClick={handleSkipToManual} className="pl-0 text-white hover:underline">
                            Cadastrar "{searchQuery}" manualmente
                        </Button>
                    </div>
                )}
            </div>
        </div>
      );
  }

  // --- RENDER: STEP 2 (EDIT) ---
  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8 animate-fade-in">
      <div className="w-full">
          <Button 
            variant="ghost" 
            onClick={() => setStep('search')} 
            className="mb-6 pl-0"
            icon={ArrowLeft}
          >
            Voltar para busca
          </Button>

          <div className="flex items-center justify-between mb-8">
              <Heading level={2}>Confirmar Dados</Heading>
              {searchResults.length > 0 && !apiError && (
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <Sparkles size={14} />
                      <span>DADOS SUGERIDOS</span>
                  </div>
              )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Title & Cover */}
            <Card className="flex flex-col md:flex-row gap-6">
               <div className="w-full md:w-32 h-48 md:h-44 shrink-0 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-lg group relative mx-auto md:mx-0">
                   <img src={cover} alt="Cover Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
                   <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Editar Capa</span>
                   </div>
               </div>
               <div className="flex-1 space-y-5">
                   <div>
                       <Label required>Nome do Jogo</Label>
                       <Input 
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          placeholder="Ex: Elden Ring"
                       />
                   </div>
                   <div>
                       <Label>URL da Capa</Label>
                       <Input 
                          value={cover}
                          onChange={e => setCover(e.target.value)}
                          placeholder="https://..."
                       />
                   </div>
               </div>
            </Card>

            {/* Platforms - Filtered by Settings */}
            <Card>
                <Label required className="mb-4">Plataformas Jogadas</Label>
                <div className="flex flex-wrap gap-2">
                    {Object.values(PLATFORMS)
                        .filter(platform => settings.activePlatforms.includes(platform.id))
                        .map(platform => {
                            const isSelected = selectedPlatforms.includes(platform.id);
                            return (
                                <button
                                   key={platform.id}
                                   type="button"
                                   onClick={() => togglePlatform(platform.id)}
                                   className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 flex items-center gap-2
                                      ${isSelected 
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}
                                   `}
                                >
                                    {platform.name}
                                </button>
                            )
                        })
                    }
                    {settings.activePlatforms.length === 0 && (
                         <div className="text-center w-full py-4 text-slate-500 text-sm">
                             Você desativou todas as plataformas nas configurações.
                         </div>
                    )}
                </div>
                {selectedPlatforms.length === 0 && settings.activePlatforms.length > 0 && (
                    <Text variant="small" className="text-red-400 mt-2">Selecione pelo menos uma plataforma.</Text>
                )}
            </Card>

            {/* Status & Perception */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <Label>Status Inicial</Label>
                    <Select 
                        value={status} 
                        onValueChange={(v) => setStatus(v as GameStatus)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(GameStatus).map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Card>
                <Card>
                    <Label>Expectativa / Percepção</Label>
                    <Select 
                        value={perception} 
                        onValueChange={(v) => setPerception(v as GamePerception)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(GamePerception).map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Card>
            </div>

            {/* Comment */}
            <Card>
                <Label>Comentário (Opcional)</Label>
                <Textarea 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Ex: Começando a jogar por indicação de um amigo..."
                />
            </Card>

            <div className="mt-12 mb-8 flex flex-col items-center">
                <Button 
                    type="submit" 
                    disabled={!canSubmit}
                    icon={Save}
                    className="w-full md:w-[340px] h-auto py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Salvar Jogo
                </Button>
            </div>

          </form>
      </div>
    </div>
  );
};

export default AddGame;
