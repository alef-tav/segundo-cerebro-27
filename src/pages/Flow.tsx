
import { PomodoroTimer } from "@/components/flow/PomodoroTimer";
import { TaskList } from "@/components/flow/TaskList";
import { MusicPlayer } from "@/components/flow/MusicPlayer";
import { ProductivityTracker } from "@/components/flow/ProductivityTracker";

const Flow = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Ferramentas de Foco</h1>
        <p className="text-muted-foreground">
          Mantenha o foco e aumente sua produtividade com essas ferramentas.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Timer Pomodoro */}
        <PomodoroTimer />
        
        {/* Lista de Tarefas */}
        <TaskList />
        
        {/* Playlist Integrada */}
        <MusicPlayer />
        
        {/* Acompanhamento de Produtividade */}
        <ProductivityTracker />
      </div>
    </div>
  );
};

export default Flow;
