'use client';
import React from 'react';
import EventImage from './EventImage';

interface TicketType {
  type: string;
  sold: number;
  price: number;
  capacity: number;
}

interface Event {
  id: number;
  name: string;
  ticketsSold: number;
  ticketTypes: TicketType[];
  imageUrl: string;
  date: string;
}

interface EventDetailsProps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => (
  <>
    <h2 className="text-2xl font-bold">Nome do evento: {event.name}</h2>
    <EventImage imageUrl={event.imageUrl} name={event.name} />
    <p className="text-xl font-semibold">
      Ingressos Vendidos:{' '}
      <span className="font-bold">{event.ticketsSold || 0}</span>
    </p>
    <p>Data de Início: {new Date(event.date).toLocaleDateString('pt-br')}</p>
    <p>
      Horário de Início:{' '}
      {new Date(event.date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      })}
    </p>
  </>
);

export default EventDetails;
