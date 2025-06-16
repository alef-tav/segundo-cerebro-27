
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";

export const UpcomingEventsCard = () => {
  const navigate = useNavigate();
  const { events, isLoading } = useEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-secondary border-0">
        <h2 className="font-display text-xl font-semibold mb-4 text-primary">Próximos Eventos</h2>
        <div className="text-center py-4 text-muted-foreground">
          <p className="text-sm">Carregando eventos...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-secondary border-0">
      <h2 className="font-display text-xl font-semibold mb-4 text-primary">Próximos Eventos</h2>
      
      {upcomingEvents.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhum evento agendado</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => navigate('/compromissos')}
          >
            Adicionar evento
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-sm">{event.title}</h3>
                {event.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.description}
                  </p>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {formatDate(event.date)}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/compromissos')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ver todos os eventos
          </Button>
        </div>
      )}
    </Card>
  );
};
