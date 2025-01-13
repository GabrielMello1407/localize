'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast, { ToastOptions } from 'react-hot-toast';
import { getLoginCookies } from '@/app/actions/action';
import { buyTicket } from '@/app/actions/ticketActions';
import { fetchEvent } from '@/app/actions/eventActions';
import { useParams } from 'next/navigation';

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
  const [selectedTicketType, setSelectedTicketType] = useState<number | null>(
    null,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId && typeof eventId === 'string') {
        setLoading(true);
        try {
          const data: Event = await fetchEvent(eventId);
          console.log('Event data:', data);
          setEvent(data);
          setLoading(false);
        } catch (err: any) {
          console.error('Error fetching event:', err);
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

    const { token } = await getLoginCookies();
    if (!token) {
      toast.error('Usuário não autenticado.');
      return;
    }

    try {
      await buyTicket(Number(eventId), selectedTicketType, quantity, token);
      toast.success('Ingresso comprado com sucesso!');
    } catch {
      toast.error('Erro ao comprar ingresso.');
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
        width={200}
        height={200}
        className="w-full h-64 object-cover mb-4"
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
        <select
          value={selectedTicketType || ''}
          onChange={(e) => setSelectedTicketType(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Selecione um tipo de ingresso
          </option>
          {event.ticketTypes.map((ticketType) => (
            <option key={ticketType.id} value={ticketType.id}>
              {ticketType.type} - R$ {ticketType.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Quantidade:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="block w-full p-2 border border-gray-300 rounded"
        />
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
