
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { PLATFORMS } from '../data';
import { GameStatus, TimelineEventType } from '../types';
import { ArrowLeft, CheckCircle, Trophy, Check } from 'lucide-react';
import { Heading, Text } from './atoms/Typography';
import Button from './atoms/Button';
import Card from './atoms/Card';
import Label from './atoms/Label';
import Input from './atoms/Input';
import Textarea from './atoms/TextArea';
import StarRating from './atoms/StarRating';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './atoms/Select';

const FinishGame: React.FC = () => {
  const navigate = useNavigate();
  const { games, addEvent, settings } = useGames();

  // Filter games that can be finished (Playing, Paused OR Dropped)
  const availableGames = games.filter(g => 
      g.status === GameStatus.Playing || 
      g.status === GameStatus.Paused || 
      g.status === GameStatus.Dropped
  );

  const [selectedGameId, setSelectedGameId] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [is100Percent, setIs100Percent] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  // Handle Game Selection
  const handleGameSelect = (id: string) => {
      setSelectedGameId(id);
      const game = games.find(g => g.id === id);
      if (game) {
          if (game.platformIds.length > 0) {
              const activePlatform = game.platformIds.find(pid => settings.activePlatforms.includes(pid));
              setPlatformId(activePlatform || game.platformIds[0]); 
          }
          if (game.rating !== undefined) {
              setRating(game.rating);
          }
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGameId || !date) return;

    const game = games.find(g => g.id === selectedGameId);
    if (!game) return;

    game.status = GameStatus.Completed;
    if (is100Percent) game.completionType = '100%';
    if (rating !== null) game.rating = rating;
    
    addEvent({
        id: `e${Date.now()}`,
        date: date,
        type: TimelineEventType.Finish,
        gameId: selectedGameId,
        platformId: platformId,
        note: comment
    });

    navigate('/');
  };

  if (availableGames.length === 0) {
      return (
          <div className="max-w-7xl mx-auto px-6 pt-24 text-center">
              <div className="max-w-2xl mx-auto">
                  <Card className="py-12 flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-6 text-slate-500">
                          <Trophy size={32} />
                      </div>
                      <Heading level={2} className="mb-2">Nenhum jogo disponível</Heading>
                      <Text className="mb-8 max-w-md mx-auto">Você não tem jogos em andamento, pausados ou desistidos para concluir.</Text>
                      <Button onClick={() => navigate('/add')}>Cadastrar Novo Jogo</Button>
                  </Card>
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
      <div className="w-full">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0" icon={ArrowLeft}>Cancelar</Button>
          
          <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center text-white">
                <Trophy size={24} />
              </div>
              <div>
                <Heading level={2} className="leading-none">Registrar Conclusão</Heading>
                <Text variant="small">Parabéns! Vamos registrar essa conquista.</Text>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <Card>
                <Label>Qual jogo você zerou?</Label>
                <Select 
                    value={selectedGameId}
                    onValueChange={handleGameSelect}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione um jogo..." />
                    </SelectTrigger>
                    <SelectContent>
                         {availableGames.map(g => (
                            <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Card>

            {selectedGameId && (
                <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <Label>Plataforma</Label>
                            <div className="flex flex-wrap gap-2">
                                {games.find(g => g.id === selectedGameId)?.platformIds.map(pid => (
                                    <button
                                        key={pid}
                                        type="button"
                                        onClick={() => setPlatformId(pid)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all ${platformId === pid ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                                    >
                                        {PLATFORMS[pid]?.name}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <Label>Data da Conclusão</Label>
                            <Input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Card>
                    </div>

                    <Card>
                        <Label>Sua Avaliação (1-5)</Label>
                        <StarRating value={rating} onChange={setRating} className="py-2" />
                    </Card>

                    {/* Type (100%) */}
                    <div 
                        onClick={() => setIs100Percent(!is100Percent)}
                        className={`
                            cursor-pointer group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300
                            ${is100Percent 
                                ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]' 
                                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${is100Percent ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700 text-slate-500'}`}>
                                <Check size={18} strokeWidth={4} />
                            </div>
                            <div className="flex-1">
                                <span className={`text-lg font-bold block ${is100Percent ? 'text-yellow-400' : 'text-slate-300'}`}>100% / Platina</span>
                                <Text variant="small">Marque se você completou todas as conquistas.</Text>
                            </div>
                        </div>
                    </div>

                     <Card>
                        <Label>Considerações Finais</Label>
                        <Textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="O que achou do final? Valeu a pena?"
                        />
                    </Card>

                    <div className="mt-12 mb-8 flex flex-col items-center">
                        <Button 
                            type="submit" 
                            icon={CheckCircle} 
                            className="w-full md:w-[340px] h-auto py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Confirmar Conclusão
                        </Button>
                    </div>
                </div>
            )}

          </form>
      </div>
    </div>
  );
};

export default FinishGame;
