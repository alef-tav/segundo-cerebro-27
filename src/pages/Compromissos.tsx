
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MonthlyCalendar } from "@/components/calendar/MonthlyCalendar";
import { EventsList } from "@/components/calendar/EventsList";
import { NewEventDialog } from "@/components/calendar/NewEventDialog";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
}

const Compromissos = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleNewEventClick = () => {
    if (!selectedDate) {
      // If no date is selected, select today
      setSelectedDate(new Date());
    }
    setIsNewEventDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Calendário</h1>
        <p className="text-muted-foreground">
          Gerencie sua agenda e compromissos.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <MonthlyCalendar
          events={events}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        
        <EventsList events={events} />
      </div>

      <div className="flex justify-start">
        <Button 
          onClick={handleNewEventClick}
          size="lg"
          className="bg-white text-black hover:bg-gray-100"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Evento
        </Button>
      </div>

      <NewEventDialog
        isOpen={isNewEventDialogOpen}
        onClose={() => setIsNewEventDialogOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default Compromissos;
