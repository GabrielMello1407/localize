/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EventGroup from '@/components/events/event-group';
import axios from 'axios';
import EventFilter from '@/components/events/event-filter';

const Events = () => {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();
  const filter = searchParams.get('txt_busca') || '';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?txt_busca=${filter}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, [filter]);

  return (
    <div className="container mx-auto px-4 py-8 cursor-pointer">
      <EventGroup events={events} />
    </div>
  );
};

export default Events;
