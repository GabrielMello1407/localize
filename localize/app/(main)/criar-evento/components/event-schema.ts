import { z } from 'zod';

export interface TicketType {
  type: string;
  price: number;
  capacity: number;
}

export const eventSchema = z.object({
  name: z.string().nonempty('Nome do evento é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  date: z.string().nonempty('Data é obrigatória'),
  location: z.string().nonempty('Localização é obrigatória'),
  price: z.number().min(0, 'Preço é obrigatório'),
  capacity: z.number().min(1, 'Capacidade é obrigatória'),
  imageUrl: z.string().nonempty('Imagem é obrigatória'),
  ticketTypes: z.array(
    z.object({
      type: z.string().nonempty('Tipo é obrigatório'),
      price: z.number().min(0, 'Preço é obrigatório'),
      capacity: z.number().min(1, 'Capacidade é obrigatória'),
    }),
  ),
});
