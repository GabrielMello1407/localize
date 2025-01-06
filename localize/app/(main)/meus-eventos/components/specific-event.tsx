'use client';
import React from 'react';
import {
  calculateTotalRevenue,
  calculateTotalExpectedRevenue,
} from '@/lib/eventRevenue';
import EventDetails from './EventDetails';
import TicketList from './TicketList';
import RevenueDetails from './RevenueDetails';

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

interface SpecificEventProps {
  event: Event;
}

const SpecificEvent: React.FC<SpecificEventProps> = ({ event }) => {
  const totalRevenue = calculateTotalRevenue(event.ticketTypes);
  const totalExpectedRevenue = calculateTotalExpectedRevenue(event.ticketTypes);

  return (
    <div className="p-4 flex justify-center">
      <div className="p-4 border rounded-lg overflow-hidden shadow-lg max-w-3xl">
        <EventDetails event={event} />
        <TicketList ticketTypes={event.ticketTypes} />
        <RevenueDetails
          totalRevenue={totalRevenue}
          totalExpectedRevenue={totalExpectedRevenue}
        />
      </div>
    </div>
  );
};

export default SpecificEvent;
