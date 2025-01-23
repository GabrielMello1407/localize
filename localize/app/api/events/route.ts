import prismadb from '@/lib/prismadb';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const eventSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  ticketTypes: z
    .array(
      z.object({
        type: z.string(),
        price: z.number(),
        capacity: z.number(),
      }),
    )
    .optional(),
});

async function getUserIdFromRequest(req: Request): Promise<number | null> {
  const secretKey = process.env.JWT_SECRET as string;
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log('Dados recebidos para criação de evento:', body);
  const result = eventSchema.safeParse(body);

  if (!result.success) {
    console.log('Erro de validação:', result.error.errors);
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { name, description, date, location, price, imageUrl, ticketTypes } =
    result.data;

  const dateNow = new Date();
  const dateEvent = new Date(date);

  // Check if the event date is before the current date
  if (dateEvent < dateNow) {
    console.log('Erro: A data do evento não pode ser anterior a hoje.');
    return NextResponse.json(
      { error: 'A data do evento não pode ser anterior a hoje.' },
      { status: 400 },
    );
  }

  // Check if an event with the same name already exists
  const existingEvent = await prismadb.event.findFirst({
    where: {
      name,
      finished: false,
    },
  });

  if (existingEvent) {
    console.log('Erro: Já existe um evento com esse nome em andamento.');
    return NextResponse.json(
      { error: 'Já existe um evento com esse nome em andamento.' },
      { status: 400 },
    );
  }

  // Get the ID of the authenticated user
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    console.log('Erro: Usuário não autenticado. Ou token expirado');
    return NextResponse.json(
      { error: 'Usuário não autenticado. Ou token expirado' },
      { status: 401 },
    );
  }

  // Calculate total event capacity
  const totalCapacity =
    ticketTypes?.reduce((sum, ticketType) => sum + ticketType.capacity, 0) || 0;

  try {
    // Create the event and associate it with the logged in user
    const event = await prismadb.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        price,
        capacity: totalCapacity,
        imageUrl,
        creatorId: userId,
      },
    });

    // Create ticket types for the event
    if (ticketTypes) {
      for (const ticketType of ticketTypes) {
        await prismadb.eventTicketType.create({
          data: {
            eventId: event.id,
            type: ticketType.type,
            price: ticketType.price,
            capacity: ticketType.capacity,
          },
        });
      }
    }

    console.log('Evento criado com sucesso:', event);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar evento. Verifique os dados e tente novamente.' },
      { status: 500 },
    );
  }
}

// Get all events or events created by the authenticated user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userEvents = searchParams.get('userEvents') === 'true';
  const searchQuery = searchParams.get('txt_busca') || '';

  // Update the 'finished' field to true in events with a date before the current date
  await prismadb.event.updateMany({
    where: {
      date: {
        lt: new Date(),
      },
      finished: false,
    },
    data: {
      finished: true,
    },
  });

  const whereClause: any = {
    finished: false,
  };

  if (searchQuery) {
    whereClause.name = {
      contains: searchQuery,
      mode: 'insensitive' as const,
    };
  }

  if (userEvents) {
    // Authentication token validation
    const authenticatedUserId = await getUserIdFromRequest(req);
    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado.' },
        { status: 401 },
      );
    }

    // Search for all events created by the authenticated user
    const events = await prismadb.event.findMany({
      where: { ...whereClause, creatorId: authenticatedUserId },
      include: {
        ticketTypes: true,
      },
    });

    return NextResponse.json(events);
  } else {
    // Search for all events that are still ongoing without including tickets
    const events = await prismadb.event.findMany({
      where: whereClause,
      include: {
        ticketTypes: true,
      },
    });

    return NextResponse.json(events);
  }
}
