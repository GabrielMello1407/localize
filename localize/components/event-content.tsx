import React from 'react';
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl?: string;
}

interface EventContentProps {
  event: Event;
}

const EventContent: React.FC<EventContentProps> = ({ event }) => {
  return (
    <>
      <h3 className="text-xl font-semibold mt-2 text-left">{event.name}</h3>
      <p className="text-gray-600 flex items-center">
        <Calendar className="mr-2" />
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 flex items-center">
        <Clock className="mr-2" />
        {new Date(event.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className="text-gray-600 flex items-center">
        <MapPin className="mr-2" />
        {event.location}
      </p>
      <p className="text-gray-800 font-bold flex items-center">
        <DollarSign className="mr-2" />
        R$ {event.price.toFixed(2)}
      </p>
    </>
  );
};

export default EventContent;
