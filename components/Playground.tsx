
import React, { useState } from 'react';
import { 
  Play, Plus, Save, Trash2, Search, Bell, Check, 
  ChevronRight, Gamepad2, Trophy, Star, Lock, LayoutTemplate 
} from 'lucide-react';

// Atoms
import Button from './atoms/Button';
import Badge from './atoms/Badge';
import Card from './atoms/Card';
import Input from './atoms/Input';
import Label from './atoms/Label';
import Textarea from './atoms/TextArea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './atoms/Select';
import { Heading, Text } from './atoms/Typography';

// Molecules
import EmptyState from './molecules/EmptyState';
import KpiCard from './molecules/KpiCard';
import MetricCard from './molecules/MetricCard';
import PlatformBadge from './molecules/PlatformBadge';
import SearchInput from './molecules/SearchInput';

// Organisms
import GameCard from './organisms/GameCard';
import AchievementCard from './organisms/AchievementCard';

// Hooks
import { useToast } from '../hooks/use-toast';

// Types & Mock Data
import { Game, GameStatus, GamePerception, Achievement, NotificationToast } from '../types';

// --- Helper Components for Documentation ---

const DocSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-20">
    <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-4">
      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
        <LayoutTemplate size={24} />
      </div>
      <Heading level={2} className="uppercase tracking-widest !text-xl text-indigo-400">{title}</Heading>
    </div>
    <div className="space-y-12">
      {children}
    </div>
  </section>
);

const ComponentDoc: React.FC<{ 
  name: string; 
  description: string; 
  usage: string; 
  children: React.ReactNode 
}> = ({ name, description, usage, children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div className="lg:col-span-4 space-y-4">
      <h3 className="text-2xl font-bold text-white">{name}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
      
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 font-mono text-xs text-slate-500 overflow-x-auto">
        <div className="uppercase text-[10px] font-bold text-slate-600 mb-2">Onde usar:</div>
        {usage}
      </div>
    </div>
    
    <div className="lg:col-span-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
      <div className="w-full flex flex-wrap gap-6 items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

// --- Mock Data ---

const MOCK_GAME: Game = {
  id: 'mock-1',
  title: 'The Legend of Zelda: Breath of the Wild',
  cover: 'https://picsum.photos/seed/zelda/400/600',
  genres: ['Adventure', 'Open World'],
  platformIds: ['switch'],
  status: GameStatus.Completed,
  perception: GamePerception.Like,
  playAgain: true,
  completionType: '100%'
};

const MOCK_ACHIEVEMENT_UNLOCKED: Achievement = {
  id: 'ach-1',
  title: 'Primeiros Passos',
  description: 'Cadastrou o primeiro jogo na biblioteca.',
  icon: 'Gamepad2',
  unlocked: true,
  unlockedDate: '2023-10-15',
  isSecret: false,
  type: 'boolean'
};

const MOCK_ACHIEVEMENT_LOCKED: Achievement = {
  id: 'ach-2',
  title: 'Colecionador Master',
  description: 'Tenha 100 jogos cadastrados.',
  icon: 'Trophy',
  unlocked: false,
  isSecret: false,
  type: 'progressive',
  metric: 100,
  currentValue: 45
};

const MOCK_ACHIEVEMENT_SECRET: Achievement = {
  id: 'ach-3',
  title: 'Segredo Obscuro',
  description: '???',
  icon: 'Lock',
  unlocked: false,
  isSecret: true,
  type: 'boolean'
};

// --- Main Playground Component ---

const Playground: React.FC = () => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32 pt-10 animate-fade-in">
      
      {/* Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-2xl mb-6 shadow-xl border border-slate-700">
           <LayoutTemplate size={32} className="text-indigo-400" />
        </div>
        <Heading className="mb-4">GameLine Design System</Heading>
        <Text variant="muted" className="text-lg">
          Documentação visual dos componentes atômicos, moléculas e organismos utilizados na construção da aplicação.
        </Text>
      </div>

      {/* --- ATOMS --- */}
      <DocSection title="Átomos">
        
        <ComponentDoc 
          name="Typography" 
          description="Sistema tipográfico baseado na família Inter. Define hierarquia visual clara." 
          usage="Heading para títulos de página e seções. Text para parágrafos, legendas e metadados."
        >
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="border-b border-white/5 w-full pb-2"><Heading level={1}>Heading Level 1</Heading></div>
            <div className="border-b border-white/5 w-full pb-2"><Heading level={2}>Heading Level 2</Heading></div>
            <div className="border-b border-white/5 w-full pb-2"><Heading level={3}>Heading Level 3</Heading></div>
            <div className="border-b border-white/5 w-full pb-2"><Text variant="body">Body Text (Default) - Slate 300</Text></div>
            <div className="border-b border-white/5 w-full pb-2"><Text variant="muted">Muted Text - Slate 500</Text></div>
            <div className="border-b border-white/5 w-full pb-2"><Text variant="small">Small Text - Slate 400 (Metadata)</Text></div>
          </div>
        </ComponentDoc>

        <ComponentDoc 
          name="Button" 
          description="Componente de interação principal. Suporta variantes de estilo, ícones e estados de largura total." 
          usage="Ações primárias (Salvar), secundárias (Navegar), perigosas (Excluir) e botões apenas de ícone."
        >
          <div className="flex flex-col gap-4">
             <div className="flex flex-wrap gap-4 items-center justify-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
             </div>
             <div className="flex flex-wrap gap-4 items-center justify-center">
                <Button variant="primary" icon={Plus}>With Icon</Button>
                <Button variant="secondary" icon={Save}>Save</Button>
                <Button variant="icon" icon={Bell} title="Notification" />
             </div>
             <div className="w-full">
                <Button fullWidth variant="primary">Full Width Button</Button>
             </div>
             {/* Primary Action Button Example */}
             <div className="w-full mt-4 p-4 border border-slate-700/50 rounded-xl bg-slate-900/50">
                <Text variant="small" className="mb-4 text-slate-500 uppercase font-bold text-center">Botão de Ação Principal (Formulários)</Text>
                <div className="flex justify-center">
                    <Button 
                        variant="primary" 
                        icon={Check}
                        className="w-full md:w-[340px] h-auto py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Confirmar Ação
                    </Button>
                </div>
             </div>
          </div>
        </ComponentDoc>

        <ComponentDoc 
          name="Badge" 
          description="Pequenos rótulos para metadados, categorias e status." 
          usage="Cards de jogos (Plataforma), Status de conclusão, Tabelas."
        >
           <Badge>Default</Badge>
           <Badge color="bg-indigo-500 text-white">Indigo</Badge>
           <Badge color="bg-emerald-500/10 text-emerald-500">Emerald Tint</Badge>
           <Badge color="bg-red-500 text-white" size="sm">Small Red</Badge>
           <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Gradient</Badge>
        </ComponentDoc>

        <ComponentDoc 
          name="Inputs" 
          description="Campos de formulário estilizados para entrada de dados." 
          usage="Formulários de cadastro de jogos, configurações, filtros."
        >
           <div className="w-full max-w-md space-y-4">
              <div>
                 <Label>Default Input</Label>
                 <Input placeholder="Digite algo..." />
              </div>
              <div>
                 <Label required>Required Input with Error</Label>
                 <Input placeholder="Campo obrigatório" error />
              </div>
              <div>
                 <Label>Select Input</Label>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="opt1">Option 1</SelectItem>
                        <SelectItem value="opt2">Option 2</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div>
                 <Label>Text Area</Label>
                 <Textarea placeholder="Digite uma descrição longa..." />
              </div>
           </div>
        </ComponentDoc>

         <ComponentDoc 
          name="Toast" 
          description="Notificação temporária flutuante para feedback do sistema." 
          usage="Ao desbloquear uma conquista ou concluir uma ação com sucesso."
        >
           <div className="flex flex-col items-center gap-4 w-full">
              <Button onClick={() => toast({ title: "Demo Toast", description: "Este é um exemplo de notificação." })}>
                 Disparar Toast Info
              </Button>
              <Button variant="secondary" onClick={() => toast({ title: "Conquista Desbloqueada!", description: "Você clicou no botão.", variant: "achievement" })}>
                 Disparar Toast Conquista
              </Button>
           </div>
        </ComponentDoc>

      </DocSection>


      {/* --- MOLECULES --- */}
      <DocSection title="Moléculas">
         
         <ComponentDoc 
          name="KPI Card" 
          description="Cartão de indicador chave de desempenho. Exibe um número grande com ícone e rótulo." 
          usage="Dashboard, Página de Relatórios."
        >
           <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <KpiCard label="Jogos" value={125} icon={Gamepad2} color="text-indigo-400" />
              <KpiCard label="Platinas" value={12} icon={Trophy} color="text-yellow-400" subLabel="100%" />
           </div>
        </ComponentDoc>

        <ComponentDoc 
          name="Empty State" 
          description="Componente visual para quando não há dados a serem exibidos." 
          usage="Listas vazias, resultados de busca sem retorno, estados iniciais."
        >
           <EmptyState 
              icon={Search} 
              title="Nada encontrado" 
              description="Tente ajustar os filtros ou buscar por outro termo."
              actionLabel="Limpar Filtros"
              onAction={() => {}}
              className="w-full max-w-md"
           />
        </ComponentDoc>

        <ComponentDoc 
          name="Search Input" 
          description="Campo de entrada especializado para busca com ícone integrado." 
          usage="Header da Biblioteca, Modal de adicionar jogo."
        >
           <div className="w-full max-w-md">
              <SearchInput 
                value={searchValue} 
                onChange={setSearchValue}
                placeholder="Buscar jogos, séries ou plataformas..." 
              />
           </div>
        </ComponentDoc>

         <ComponentDoc 
          name="Platform Badge" 
          description="Variação específica do Badge para exibir plataformas de jogos." 
          usage="Cards de jogos, Listas de detalhes."
        >
           <div className="flex gap-2">
              <PlatformBadge platformId="ps5" />
              <PlatformBadge platformId="switch" />
              <PlatformBadge platformId="pc" />
              <PlatformBadge platformId="gba" />
           </div>
        </ComponentDoc>

      </DocSection>


      {/* --- ORGANISMS --- */}
      <DocSection title="Organismos">

        <ComponentDoc 
          name="Game Card" 
          description="O cartão principal da biblioteca. Exibe capa (com efeito hover), título, status e plataformas." 
          usage="Grid da Biblioteca, Resultados de busca."
        >
           <div className="w-48 h-80">
              <GameCard game={MOCK_GAME} />
           </div>
           <div className="w-48 h-80">
              <GameCard game={{...MOCK_GAME, id: 'mock-2', status: GameStatus.Playing, completionType: 'Normal', title: 'Hollow Knight: Silksong (Hypothetical)'}} />
           </div>
        </ComponentDoc>

        <ComponentDoc 
          name="Achievement Card" 
          description="Card complexo que exibe o estado de uma conquista: bloqueada, desbloqueada (com data) ou secreta." 
          usage="Página de Conquistas, Feed de atividades."
        >
           <div className="flex flex-col gap-4 w-full max-w-lg">
              <AchievementCard achievement={MOCK_ACHIEVEMENT_UNLOCKED} />
              <AchievementCard achievement={MOCK_ACHIEVEMENT_LOCKED} />
              <AchievementCard achievement={MOCK_ACHIEVEMENT_SECRET} />
           </div>
        </ComponentDoc>

      </DocSection>

    </div>
  );
};

export default Playground;
