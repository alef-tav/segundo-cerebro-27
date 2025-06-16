
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      const formattedEvents = data.map(event => ({
        ...event,
        date: new Date(event.date + 'T00:00:00') // Force local timezone
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar eventos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async (eventData: Omit<Event, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Format date as YYYY-MM-DD in local timezone
      const year = eventData.date.getFullYear();
      const month = String(eventData.date.getMonth() + 1).padStart(2, '0');
      const day = String(eventData.date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      console.log('Original date:', eventData.date);
      console.log('Formatted date:', formattedDate);

      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: eventData.title,
          date: formattedDate,
          time: eventData.time,
          description: eventData.description,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      const newEvent = {
        ...data,
        date: new Date(data.date + 'T00:00:00') // Force local timezone
      };

      setEvents(prev => [...prev, newEvent]);
      
      toast({
        title: "Sucesso",
        description: "Evento criado com sucesso!",
      });

      return newEvent;
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar evento",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setEvents(prev => prev.filter(event => event.id !== eventId));
      
      toast({
        title: "Sucesso",
        description: "Evento removido com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover evento",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    isLoading,
    addEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};
