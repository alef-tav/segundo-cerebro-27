
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MonthlyCalendar } from "@/components/calendar/MonthlyCalendar";
import { EventsList } from "@/components/calendar/EventsList";
import { NewEventDialog } from "@/components/calendar/NewEventDialog";
import { useEvents } from "@/hooks/useEvents";

const Compromissos = () => {
  const { events, addEvent, deleteEvent, isLoading } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);

  const handleAddEvent = async (eventData: { title: string; date: Date; time: string; description?: string }) => {
    try {
      await addEvent(eventData);
      setIsNewEventDialogOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleNewEventClick = () => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
    setIsNewEventDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold">Calendário</h1>
          <p className="text-muted-foreground">
            Carregando sua agenda...
          </p>
        </div>
      </div>
    );
  }

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
        
        <EventsList 
          events={events} 
          onDeleteEvent={deleteEvent}
        />
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
