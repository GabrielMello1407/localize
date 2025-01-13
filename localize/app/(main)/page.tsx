'use client';
import EventGroup from '@/components/event-group';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);

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
    <div className="flex justify-center">
      <main className="justify-center container text-center">
        <h1 className="text-4xl font-bold">Bem vindo a Localize</h1>
        <p className="mt-4">Procure eventos para você!</p>
        <EventGroup events={events} />
      </main>
    </div>
  );
}
