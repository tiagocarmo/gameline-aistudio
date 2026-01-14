import React, { useState, useMemo, useEffect } from 'react';
import { useGames } from '../context/GameContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Heading, Text } from './atoms/Typography';
import SearchInput from './molecules/SearchInput';
import GameCard from './organisms/GameCard';
import Button from './atoms/Button';
import {
  Plus,
  Filter,
  X,
  Check,
  Trophy
} from 'lucide-react';
import { PLATFORMS } from '../data';
import { GameStatus } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './atoms/Select';

const Library: React.FC = () => {
  const { games } = useGames();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Filters State
  const [filterStatus, setFilterStatus] = useState<GameStatus | 'All'>('All');
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [filterComplete100, setFilterComplete100] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters based on URL params
  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam === 'Completed') {
      setFilterStatus(GameStatus.Completed);
      setShowFilters(true); // Open filters to show user what's happening
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredGames = useMemo(() => {
    return games.filter(g => {
      // 1. Search
      const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Status
      const matchesStatus = filterStatus === 'All' || g.status === filterStatus;

      // 3. Platform
      const matchesPlatform = filterPlatform === 'All' || g.platformIds.includes(filterPlatform);

      // 4. 100% Completion
      const matches100 = !filterComplete100 || (g.completionType === '100%' && g.status === GameStatus.Completed);

      return matchesSearch && matchesStatus && matchesPlatform && matches100;
    });
  }, [games, searchTerm, filterStatus, filterPlatform, filterComplete100]);

  const activeFiltersCount = (filterStatus !== 'All' ? 1 : 0) + (filterPlatform !== 'All' ? 1 : 0) + (filterComplete100 ? 1 : 0);

  const clearFilters = () => {
    setFilterStatus('All');
    setFilterPlatform('All');
    setFilterComplete100(false);
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32 pt-10">

      {/* 4. Header & 4.1 Conteúdo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border pb-6">
        <div>
          <Heading>Biblioteca</Heading>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-bold text-foreground">{games.length}</span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Jogos Cadastrados</span>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-auto gap-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 md:w-72">
              <SearchInput
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <Button
              variant={showFilters || activeFiltersCount > 0 ? 'primary' : 'secondary'}
              onClick={() => setShowFilters(!showFilters)}
              className="px-3"
            >
              <Filter size={20} />
              {activeFiltersCount > 0 && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">{activeFiltersCount}</span>}
            </Button>
            <Link to="/add" className="md:hidden">
              <Button variant="secondary" className="px-3"><Plus size={20} /></Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Filtros e Busca (Expandable Area) */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="bg-card p-5 rounded-2xl border border-border space-y-4">
          <div className="flex items-center justify-between">
            <Text variant="small" className="uppercase font-bold text-primary">Filtros Ativos</Text>
            <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <X size={12} /> Limpar tudo
            </button>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Status</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterStatus === 'All' ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border text-muted-foreground hover:text-foreground'}`}
                >
                  Todos
                </button>
                {Object.values(GameStatus).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterStatus === status ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border text-muted-foreground hover:text-foreground'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div className="space-y-2 min-w-[200px]">
              <label className="text-xs font-bold text-muted-foreground uppercase">Plataforma</label>
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Todas as Plataformas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Todas as Plataformas</SelectItem>
                  {Object.values(PLATFORMS).map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Toggle 100% */}
            <div className="space-y-2 flex flex-col">
              <label className="text-xs font-bold text-muted-foreground uppercase">Extras</label>
              <button
                onClick={() => setFilterComplete100(!filterComplete100)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${filterComplete100 ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-muted border-border text-muted-foreground hover:text-foreground'}`}
              >
                <Trophy size={16} />
                Apenas 100%
                {filterComplete100 && <Check size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Estados da Biblioteca */}
      {games.length === 0 ? (
        // 9.1 Vazia (Sem nenhum cadastro global)
        <div className="flex flex-col items-center justify-center py-32 bg-card/30 rounded-3xl border border-border border-dashed text-center px-4 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Plus size={40} className="text-primary" />
          </div>
          <Heading level={2} className="mb-2">Sua biblioteca está vazia</Heading>
          <Text variant="muted" className="mb-8 max-w-md mx-auto">
            A Biblioteca é o coração da GameLine. Adicione seu primeiro jogo para começar a organizar sua coleção.
          </Text>
          <Link to="/add">
            <Button variant="primary" icon={Plus}>Cadastrar Primeiro Jogo</Button>
          </Link>
        </div>
      ) : filteredGames.length === 0 ? (
        // 9.2 Sem resultados (Filtro não encontrou nada)
        <div className="flex flex-col items-center justify-center py-20 bg-card/30 rounded-2xl border border-border border-dashed">
          <Text variant="muted" className="mb-4">Nenhum jogo encontrado com os filtros atuais.</Text>
          <Button variant="ghost" onClick={clearFilters}>Limpar Filtros</Button>
        </div>
      ) : (
        // 6. Grid (padrão)
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 animate-fade-in">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Text variant="small" className="opacity-50">Mostrando {filteredGames.length} de {games.length} jogos</Text>
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
