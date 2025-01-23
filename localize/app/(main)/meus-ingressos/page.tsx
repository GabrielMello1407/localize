'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getLoginCookies } from '@/app/actions/action';
import { fetchUserTickets } from '@/app/actions/ticketActions';
import TicketCard from '../../../components/TicketCard';

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

const MyTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const { token, user } = await getLoginCookies();
      if (!token || !user.id) {
        toast.error('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserTickets(token);
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          setError('Erro ao buscar ingressos.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
        setError('Erro ao buscar ingressos.');
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Meus Ingressos</h1>
      <div className="flex flex-col items-center">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default MyTicketsPage;
