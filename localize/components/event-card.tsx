'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      {event.imageUrl && (
        <Image
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-48 object-cover rounded-md"
          width={400}
          height={300}
        />
      )}
      <h3 className="text-xl font-semibold mt-2">{event.name}</h3>
      <p className="text-gray-600">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-800 font-bold">R$ {event.price.toFixed(2)}</p>
      <Button variant={'localizeTwo'}>
        <Link href={`/eventos/${event.id}`}>Ver mais detalhes</Link>
      </Button>
    </div>
  );
};

export default EventCard;
