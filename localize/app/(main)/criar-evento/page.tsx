/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { getLoginCookies } from '@/app/actions/action';
import toast, { Toaster } from 'react-hot-toast';
import {
  eventSchema,
  TicketType,
} from '@/app/(main)/criar-evento/components/event-schema';
import EventForm from '@/app/(main)/criar-evento/components/event-form';

const CriarEvento = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { type: '', price: 0, capacity: 0 },
  ]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const totalCapacity = ticketTypes.reduce(
      (sum, ticketType) => sum + ticketType.capacity,
      0,
    );

    const eventData = {
      name,
      description,
      date: date?.toISOString() || '',
      location,
      price: parseFloat(price),
      capacity: totalCapacity,
      imageUrl,
      ticketTypes,
    };

    const result = eventSchema.safeParse(eventData);

    if (!result.success) {
      const errorMessage: string = result.error.errors
        .map(
          (error: z.ZodIssue) => `${error.path.join(' -> ')}: ${error.message}`,
        )
        .join(', ');
      setError(`Dados inválidos: ${errorMessage}`);
      console.error('Erro de validação:', result.error.errors);
      toast.error(`Dados inválidos: ${errorMessage}`);
      return;
    }

    try {
      const { token } = await getLoginCookies();
      if (!token) {
        setError('Você precisa estar logado para criar um evento.');
        toast.error('Você precisa estar logado para criar um evento.');
        return;
      }

      const response = await axios.post('/api/events', result.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Evento criado com sucesso!');
        router.push('/eventos');
      } else {
        console.error('Erro ao criar evento:', response.data);
        setError(response.data.error || 'Erro ao criar evento.');
        toast.error(response.data.error || 'Erro ao criar evento.');
      }
    } catch (error: any) {
      console.error('Erro ao criar evento:', error);
      setError('Erro ao criar evento. Verifique os dados e tente novamente.');
      toast.error(
        'Erro ao criar evento. Verifique os dados e tente novamente.',
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster />
      <h1 className="text-4xl font-bold text-[#111827]">Criar Evento</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <EventForm
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        location={location}
        setLocation={setLocation}
        price={price}
        setPrice={setPrice}
        imageUrl={imageUrl}
        handleImageUpload={handleImageUpload}
        ticketTypes={ticketTypes}
        setTicketTypes={setTicketTypes}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CriarEvento;
