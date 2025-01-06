'use client';
import Image from 'next/image';
import React from 'react';

interface EventUserProps {
  events: {
    id: number;
    name: string;
    formattedDate: string;
    formattedTime: string;
    price: number;
    imageUrl: string;
  }[];
  onEventClick: (eventId: number) => void;
}

const EventUser: React.FC<EventUserProps> = ({ events, onEventClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={200}
            height={150}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p>Data de Início: {event.formattedDate}</p>
            <p>Horário de Início: {event.formattedTime}</p>
            <p>Valor: R$ {event.price.toFixed(2)}</p>
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
              onClick={() => onEventClick(event.id)}
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventUser;
