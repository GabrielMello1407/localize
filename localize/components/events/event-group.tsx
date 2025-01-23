'use client';
import React from 'react';
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

interface EventGroupProps {
  events: Event[];
}

const EventGroup: React.FC<EventGroupProps> = ({ events }) => {
  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default EventGroup;
