'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './event-list';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl?: string;
}

const EventGroup = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center">Eventos</h2>
      <EventList events={events} />
    </div>
  );
};

export default EventGroup;
