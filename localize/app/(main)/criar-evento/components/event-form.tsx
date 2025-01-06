import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TicketType } from '@/app/(main)/criar-evento/components/event-schema';

interface EventFormProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  date: Date | null;
  setDate: (date: Date | null) => void;
  location: string;
  setLocation: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  imageUrl: string;
  handleImageUpload: (url: string) => void;
  ticketTypes: TicketType[];
  setTicketTypes: (ticketTypes: TicketType[]) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const EventForm: React.FC<EventFormProps> = ({
  name,
  setName,
  description,
  setDescription,
  date,
  setDate,
  location,
  setLocation,
  price,
  setPrice,
  imageUrl,
  handleImageUpload,
  ticketTypes,
  setTicketTypes,
  handleSubmit,
}) => {
  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { type: '', price: 0, capacity: 0 }]);
  };

  const handleRemoveTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const handleTicketTypeChange = (
    index: number,
    field: keyof TicketType,
    value: string,
  ) => {
    const updatedTicketTypes = [...ticketTypes];
    const updatedTicketType = {
      ...updatedTicketTypes[index],
      [field]:
        field === 'price' || field === 'capacity' ? parseFloat(value) : value,
    };
    updatedTicketTypes[index] = updatedTicketType;
    setTicketTypes(updatedTicketTypes);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <Label className="block text-[#111827] font-semibold">
            Nome do Evento
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="block text-[#111827] font-semibold">
            Data e Hora
          </Label>
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
      </div>
      <div className="mb-4">
        <Label className="block text-[#111827] font-semibold">
          Localização
        </Label>
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <Label className="block text-[#111827] font-semibold">Descrição</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <Label className="block text-[#111827] font-semibold">Preço</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
            placeholder="0.00"
          />
        </div>
        <div className="mb-4">
          <Label className="block text-[#111827] font-semibold">
            URL da Imagem
          </Label>
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
      </div>
      <div className="mb-4">
        <h3 className="block text-[#111827] font-semibold text-xl mb-3">
          Lotes
        </h3>
        {ticketTypes.map((ticketType, index) => (
          <div
            key={index}
            className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
          >
            <div>
              <Label className="block text-[#111827] font-semibold">
                Tipo {index + 1}
              </Label>
              <Input
                type="text"
                placeholder="Tipo"
                value={ticketType.type}
                onChange={(e) =>
                  handleTicketTypeChange(index, 'type', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2 "
                required
              />
            </div>
            <div>
              <Label className="block text-[#111827] font-semibold">
                Preço
              </Label>
              <Input
                type="number"
                placeholder="Preço"
                value={ticketType.price.toString()}
                onChange={(e) =>
                  handleTicketTypeChange(index, 'price', e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div>
              <Label className="block text-[#111827] font-semibold">
                Capacidade
              </Label>
              <Input
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
            {index > 0 && (
              <Button
                variant={'destructive'}
                type="button"
                onClick={() => handleRemoveTicketType(index)}
                className="ml-2 p-2 bg-red-500 text-white rounded"
              >
                Apagar
              </Button>
            )}
          </div>
        ))}
        <Button
          variant={'localize'}
          onClick={handleAddTicketType}
          className="mt-2 p-2 bg-[#F68633] text-white rounded"
        >
          Adicionar Tipo de Ingresso
        </Button>
      </div>
      <Button type="submit" className="p-2 bg-[#03A8F0] text-white rounded">
        Criar Evento
      </Button>
    </form>
  );
};

export default EventForm;
