
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { GameStatus, TimelineEventType } from '../types';
import { ArrowLeft, XCircle, AlertCircle, Check } from 'lucide-react';
import { Heading, Text } from './atoms/Typography';
import Button from './atoms/Button';
import Card from './atoms/Card';
import Label from './atoms/Label';
import Textarea from './atoms/TextArea';
import StarRating from './atoms/StarRating';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './atoms/Select';

const DropGame: React.FC = () => {
  const navigate = useNavigate();
  const { games, addEvent } = useGames();

  // Filter games that can be dropped
  const availableGames = games.filter(g => 
      g.status === GameStatus.Playing || g.status === GameStatus.Paused
  );

  const [selectedGameId, setSelectedGameId] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [reason, setReason] = useState('');

  const handleGameSelect = (id: string) => {
    setSelectedGameId(id);
    const game = games.find(g => g.id === id);
    if (game && game.rating !== undefined) {
        setRating(game.rating);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGameId || !reason) return;

    const game = games.find(g => g.id === selectedGameId);
    if (!game) return;

    // Update Status
    game.status = GameStatus.Dropped;
    if (rating !== null) game.rating = rating;

    // Add Event
    addEvent({
        id: `e${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: TimelineEventType.Drop,
        gameId: selectedGameId,
        platformId: game.platformIds[0],
        note: reason
    });

    navigate('/');
  };

  if (availableGames.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-6 pt-24 text-center">
            <div className="max-w-2xl mx-auto">
                <Card className="py-12 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-6 text-slate-500">
                        <Check size={32} />
                    </div>
                    <Heading level={2} className="mb-2">Tudo em ordem</Heading>
                    <Text className="mb-8">Você não tem jogos ativos para desistir no momento.</Text>
                    <Button onClick={() => navigate('/')}>Voltar</Button>
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
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500">
                <XCircle size={24} />
              </div>
              <div>
                <Heading level={2} className="leading-none text-red-400">Registrar Desistência</Heading>
                <Text variant="small">Acontece. Vamos liberar espaço mental para o próximo.</Text>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <Card>
                <Label>Qual jogo você vai parar?</Label>
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
                     <div className="flex gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl items-start">
                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
                        <Text variant="small" className="text-red-200/80 leading-relaxed">
                            Isso marcará o jogo como "Cancelado" e criará um evento na sua timeline. Você poderá retomá-lo futuramente se desejar.
                        </Text>
                     </div>

                     <Card>
                        <Label>Avaliação até o momento (1-5)</Label>
                        <StarRating value={rating} onChange={setRating} className="py-2" />
                    </Card>

                     <Card>
                        <Label required>Motivo da desistência</Label>
                        <Textarea 
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Ex: O jogo ficou repetitivo, bugs, dificuldade desbalanceada..."
                            className="border-red-900/30 focus:border-red-500 focus:ring-red-500/20"
                        />
                    </Card>

                    <div className="mt-12 mb-8 flex flex-col items-center">
                        <Button 
                            type="submit" 
                            variant="danger" 
                            icon={XCircle} 
                            className="w-full md:w-[340px] h-auto py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Confirmar Desistência
                        </Button>
                    </div>
                 </div>
            )}

          </form>
      </div>
    </div>
  );
};

export default DropGame;
