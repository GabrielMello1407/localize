/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/image-upload';
import { z } from 'zod';
import { getLoginCookies } from '@/app/actions/action';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css'; // Import custom styles

interface TicketType {
  type: string;
  price: number;
  capacity: number;
}

const eventSchema = z.object({
  name: z.string().nonempty('Nome do evento é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  date: z.string().nonempty('Data é obrigatória'),
  location: z.string().nonempty('Localização é obrigatória'),
  price: z.number().min(0, 'Preço é obrigatório'),
  capacity: z.number().min(1, 'Capacidade é obrigatória'),
  imageUrl: z.string().optional(),
  ticketTypes: z.array(
    z.object({
      type: z.string().nonempty('Tipo é obrigatório'),
      price: z.number().min(0, 'Preço é obrigatório'),
      capacity: z.number().min(1, 'Capacidade é obrigatória'),
    }),
  ),
});

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

  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { type: '', price: 0, capacity: 0 }]);
  };

  const handleTicketTypeChange = (
    index: number,
    field: keyof TicketType,
    value: string,
  ) => {
    setTicketTypes((prevTicketTypes) =>
      prevTicketTypes.map((ticketType, i) =>
        i === index
          ? {
              ...ticketType,
              [field]:
                field === 'price' || field === 'capacity'
                  ? parseFloat(value)
                  : value,
            }
          : ticketType,
      ),
    );
  };

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
      setError('Dados inválidos. Verifique os campos e tente novamente.');
      console.error('Erro de validação:', result.error.errors);
      return;
    }

    try {
      const { token } = await getLoginCookies();
      if (!token) {
        setError('Você precisa estar logado para criar um evento.');
        return;
      }

      const response = await axios.post('/api/events', result.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        router.push('/eventos');
      }
    } catch (error) {
      setError('Erro ao criar evento. Verifique os dados e tente novamente.');
      console.error('Erro ao criar evento:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Criar Evento</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nome do Evento</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data e Hora</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="Pp"
            popperPlacement="right-end"
            popperClassName="custom-datepicker"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Localização</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
            placeholder="0.00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL da Imagem</label>
          <ImageUpload onUpload={handleImageUpload} />
          {imageUrl && (
            <div className="mt-4">
              <Image
                src={imageUrl}
                width={400}
                height={300}
                alt="Imagem do Evento"
                className="w-full h-auto max-w-xs rounded"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipos de Ingressos</label>
          {ticketTypes.map((ticketType, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Tipo"
                value={ticketType.type}
                onChange={(e) =>
                  handleTicketTypeChange(index, 'type', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <input
                type="number"
                placeholder="Preço"
                value={ticketType.price.toString()}
                onChange={(e) =>
                  handleTicketTypeChange(index, 'price', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <input
                type="number"
                placeholder="Capacidade"
                value={ticketType.capacity.toString()}
                onChange={(e) =>
                  handleTicketTypeChange(index, 'capacity', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTicketType}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Adicionar Tipo de Ingresso
          </button>
        </div>
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Criar Evento
        </button>
      </form>
    </div>
  );
};

export default CriarEvento;
