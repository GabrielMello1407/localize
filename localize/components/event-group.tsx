'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2 className="text-2xl font-bold">Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg shadow-md">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-2">{event.name}</h3>
            <p className="text-gray-600">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-gray-800 font-bold">
              R$ {event.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGroup;
