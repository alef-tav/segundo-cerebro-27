import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Heart, Play, Pause, SkipBack, SkipForward, Wind, Timer } from "lucide-react";

const Mindfulness = () => {
  // Estados para meditação
  const [isPlaying, setIsPlaying] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [totalMeditationTime, setTotalMeditationTime] = useState(600); // 10 minutos

  // Estados para respiração
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingRate, setBreathingRate] = useState([6]); // 6 respirações por minuto
  const [breathPhase, setBreathPhase] = useState("inspire");

  // Estados para progresso
  const [dailyGoal] = useState(15); // 15 minutos por dia
  const [dailyProgress] = useState(8); // 8 minutos feitos hoje
  const [weeklyGoal] = useState(7); // 7 dias por semana
  const [weeklyProgress] = useState(4); // 4 dias esta semana
  const [monthlyGoal] = useState(300); // 300 minutos por mês
  const [monthlyProgress] = useState(180); // 180 minutos este mês

  // Timer para meditação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && meditationTime < totalMeditationTime) {
      interval = setInterval(() => {
        setMeditationTime(prev => {
          if (prev >= totalMeditationTime) {
            setIsPlaying(false);
            return totalMeditationTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, meditationTime, totalMeditationTime]);

  // Timer para respiração
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing) {
      const breathDuration = 60000 / breathingRate[0]; // duração em ms por respiração
      const halfDuration = breathDuration / 2; // metade para inspire, metade para expire
      
      interval = setInterval(() => {
        setBreathPhase(prev => prev === "inspire" ? "expire" : "inspire");
      }, halfDuration);
    }
    
    return () => clearInterval(interval);
  }, [isBreathing, breathingRate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBreathingToggle = () => {
    setIsBreathing(!isBreathing);
    if (!isBreathing) {
      setBreathPhase("inspire");
    }
  };

  const handleSkipBack = () => {
    setMeditationTime(Math.max(0, meditationTime - 10));
  };

  const handleSkipForward = () => {
    setMeditationTime(Math.min(totalMeditationTime, meditationTime + 10));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setMeditationTime(0);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Mindfulness</h1>
        <p className="text-muted-foreground">
          Pratique meditação e cultive o bem-estar mental.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meditação Guiada */}
        <Card className="p-6 bg-secondary">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold">Meditação Guiada</h2>
            </div>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="text-6xl font-mono font-bold flex flex-col items-center justify-center p-8 rounded-full bg-primary/10 border-2 border-primary/20">
                  <Timer className="h-8 w-8 text-primary mb-2" />
                  {formatTime(meditationTime)}
                </div>
              </div>
              
              <Progress 
                value={(meditationTime / totalMeditationTime) * 100} 
                className="w-full"
              />
              
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="sm" onClick={handleSkipBack}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handlePlayPause}
                  size="lg"
                  className="rounded-full w-16 h-16 flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSkipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {meditationTime >= totalMeditationTime 
                  ? "Meditação concluída! 🧘‍♀️" 
                  : isPlaying 
                    ? "Meditação em andamento..." 
                    : "Clique no cronômetro ou pressione play para iniciar"
                }
              </p>
            </div>
          </div>
        </Card>

        {/* Exercício de Respiração */}
        <Card className="p-6 bg-secondary">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold">Exercício de Respiração</h2>
            </div>

            <div className="text-center space-y-6">
              <div className="relative">
                <div className={`w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center transition-all duration-1000 ${
                  isBreathing && breathPhase === "inspire" ? 'scale-125 bg-primary/30' : 'scale-100'
                }`}>
                  <Wind className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isBreathing 
                    ? breathPhase === "inspire" 
                      ? "Inspire..." 
                      : "Expire..." 
                    : "Pronto para começar?"
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Taxa de Respiração: {breathingRate[0]} respirações/min
                </p>
              </div>
              
              <div className="space-y-4">
                <Slider
                  value={breathingRate}
                  onValueChange={setBreathingRate}
                  max={12}
                  min={4}
                  step={1}
                  className="w-full"
                />
                
                <Button 
                  onClick={handleBreathingToggle}
                  className="w-full"
                  variant={isBreathing ? "destructive" : "default"}
                >
                  {isBreathing ? "Parar Exercício" : "Iniciar Exercício de Respiração"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Progresso de Mindfulness */}
      <Card className="p-6 bg-secondary">
        <div className="space-y-6">
          <h2 className="font-display text-xl font-semibold">Progresso de Mindfulness</h2>
          
          <div className="space-y-6">
            {/* Meta Diária */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Meta Diária de Meditação</span>
                <span className="text-sm text-muted-foreground">{dailyProgress} / {dailyGoal} minutos</span>
              </div>
              <Progress value={(dailyProgress / dailyGoal) * 100} className="h-2" />
            </div>

            {/* Sessões Semanais */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sessões Semanais de Mindfulness</span>
                <span className="text-sm text-muted-foreground">{weeklyProgress} / {weeklyGoal} dias</span>
              </div>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-2" />
            </div>

            {/* Minutos Mensais */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Minutos Mensais de Mindfulness</span>
                <span className="text-sm text-muted-foreground">{monthlyProgress} / {monthlyGoal} minutos</span>
              </div>
              <Progress value={(monthlyProgress / monthlyGoal) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Mindfulness;
