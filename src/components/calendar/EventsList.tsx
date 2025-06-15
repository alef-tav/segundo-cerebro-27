
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
}

interface EventsListProps {
  events: Event[];
  onDeleteEvent: (eventId: string) => void;
}

export const EventsList = ({ events, onDeleteEvent }: EventsListProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for proper comparison
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Reset to start of day for proper comparison
      return eventDate >= today;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="p-6 bg-card">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl">Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {upcomingEvents.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum evento próximo
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors"
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
