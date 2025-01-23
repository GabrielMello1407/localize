'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast, { ToastOptions } from 'react-hot-toast';
import { getLoginCookies } from '@/app/actions/action';
import { buyTicket } from '@/app/actions/ticketActions';
import { fetchEvent } from '@/app/actions/eventActions';
import { useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketType {
  id: number;
  type: string;
  price: number;
  capacity: number;
}

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  imageUrl?: string;
  ticketTypes: TicketType[];
  creatorId: number;
}

// Estender o tipo ToastOptions para incluir a nova classe de opções
interface CustomToast extends ToastOptions {
  warning?: {
    style: {
      background: string;
      color: string;
    };
  };
}

const EventPage: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId && typeof eventId === 'string') {
        setLoading(true);
        try {
          const data: Event = await fetchEvent(eventId);
          setEvent(data);
          setLoading(false);
        } catch (err: any) {
          setError('Erro ao carregar evento.');
          setLoading(false);
        }
      } else {
        setError('ID do evento não fornecido.');
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleBuyTicket = async () => {
    if (!selectedTicketType) {
      toast('Por favor, selecione um tipo de ingresso.', {
        style: {
          background: '#F68933',
          color: 'white',
        },
      } as CustomToast);
      return;
    }

    const { token, user } = await getLoginCookies();
    if (!token || !user.id) {
      toast.error('Usuário não autenticado.');
      return;
    }

    if (event?.creatorId === user.id) {
      toast.error(
        'O dono do evento não pode comprar ingressos para seu próprio evento.',
      );
      return;
    }

    try {
      await buyTicket(user.id, Number(eventId), selectedTicketType, token);
      toast.success('Ingresso comprado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao comprar ingresso:', error);
      if (
        error.response?.data?.error ===
        'O dono do evento não pode comprar ingressos para seu próprio evento.'
      ) {
        toast.error(
          'O dono do evento não pode comprar ingressos para seu próprio evento.',
        );
      } else {
        toast.error('Erro ao comprar ingresso.');
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Evento não encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Image
        src={event.imageUrl || '/default-image.jpg'}
        alt={event.name}
        width={600}
        height={300}
        className="w-full max-w-full object-contain mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-700 mb-2">
        Data: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-2">
        Horário:{' '}
        {new Date(event.date).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className="text-gray-700 mb-4">Local: {event.location}</p>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tipo de Ingresso:</label>
        <Select onValueChange={(value) => setSelectedTicketType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um tipo de ingresso" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de Ingresso</SelectLabel>
              {event.ticketTypes.map((ticketType) => (
                <SelectItem key={ticketType.id} value={ticketType.type}>
                  {ticketType.type} - R$ {ticketType.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={handleBuyTicket}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Comprar Ingresso
      </button>
    </div>
  );
};

export default EventPage;
