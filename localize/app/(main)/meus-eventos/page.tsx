'use client';
import React, { useEffect, useState } from 'react';
import EventUser from './components/event-user';
import { useRouter } from 'next/navigation';
import { formatEvents } from '@/lib/formattedEvents';
import { getLoginCookies } from '@/app/actions/action';

interface Event {
  id: number;
  name: string;
  date: string;
  price: number;
  imageUrl: string;
  formattedDate: string;
  formattedTime: string;
}

const MeusEventosPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const { token } = await getLoginCookies();
      const response = await fetch('/api/events?userEvents=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const formattedEvents: Event[] = formatEvents(data);
      setEvents(formattedEvents);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId: number) => {
    router.push(`/meus-eventos/${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Meus Eventos</h1>
      <EventUser events={events} onEventClick={handleEventClick} />
    </div>
  );
};

export default MeusEventosPage;
