'use client';
import React from 'react';

interface TicketType {
  type: string;
  sold: number;
  price: number;
  capacity: number;
}

interface TicketListProps {
  ticketTypes: TicketType[];
}

const TicketList: React.FC<TicketListProps> = ({ ticketTypes }) => (
  <div>
    <h3>Lotes para venda:</h3>
    {ticketTypes.map((ticket, index) => (
      <div key={index}>
        <p>
          {ticket.type}:{' '}
          <span className="font-bold">
            R$ {ticket.price.toFixed(2)} cada e {ticket.capacity} disponíveis
          </span>
        </p>
      </div>
    ))}
  </div>
);

export default TicketList;
