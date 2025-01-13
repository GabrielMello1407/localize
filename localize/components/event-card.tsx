'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import EventContent from './event-content';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl?: string;
  time?: string; // Add time property
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg h-80">
      {event.imageUrl && (
        <Image
          src={event.imageUrl}
          alt={event.name}
          className="max-w-300 h-full object-contain rounded-md"
          width={400}
          height={300}
        />
      )}
      <EventContent event={event} />
      <Button variant={'localizeTwo'} className="mt-4 hover:bg-blue-700">
        <Link href={`/eventos/${event.id}`}>Ver mais detalhes</Link>
      </Button>
    </div>
  );
};

export default EventCard;
