'use client';
import React from 'react';
import Image from 'next/image';

interface Ticket {
  id: number;
  eventId: number;
  ticketType: string;
  codeQr: string;
  qrCodeUrl: string;
  createdAt: string;
  event: {
    name: string;
    date: string;
  };
}

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <div className="mb-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-2">{ticket.event.name}</h2>
      <p className="text-gray-700 mb-1">
        Data do Evento: {new Date(ticket.event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-1">
        Horário do Evento:{' '}
        {new Date(ticket.event.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className="text-gray-700 mb-1">
        Tipo de Ingresso: {ticket.ticketType}
      </p>
      <p className="text-gray-700 mb-1">
        Data da Compra: {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">
        Horário da Compra:{' '}
        {new Date(ticket.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <div className="flex justify-center">
        <Image src={ticket.qrCodeUrl} alt="QR Code" width={300} height={300} />
      </div>
    </div>
  );
};

export default TicketCard;
