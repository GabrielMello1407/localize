'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SpecificEvent from '../components/specific-event';
import { formatEvents } from '@/lib/formattedEvents';
import { getLoginCookies } from '@/app/actions/action';

const EventDetails: React.FC<{ event: any }> = ({ event }) => (
  <>
    <h1 className="text-3xl font-bold mb-4 text-center">Detalhes do Evento</h1>
    <SpecificEvent event={event} />
  </>
);

const EventDetailsPage: React.FC = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const { token } = await getLoginCookies();
      const response = await fetch(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const formattedEvent = formatEvents([data])[0];
      setEvent(formattedEvent);
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
};

export default EventDetailsPage;
