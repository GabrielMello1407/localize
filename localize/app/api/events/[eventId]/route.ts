/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const eventUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  price: z.number().optional(),
  capacity: z.number().optional(),
});

// Extract userId from the JWT token
async function getUserIdFromRequest(req: Request): Promise<number | null> {
  const secretKey = 'secret_key';
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { eventId: string } },
) {
  const { eventId } = await params;

  const eventIdParsed = parseInt(eventId);

  if (isNaN(eventIdParsed)) {
    return NextResponse.json(
      { error: 'ID do evento inválido.' },
      { status: 400 },
    );
  }

  const body = await req.json();
  const result = eventUpdateSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { description, date, location, price, capacity, name } = result.data;

  // Get the authenticated user's ID
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: 'Usuário não autenticado.' },
      { status: 401 },
    );
  }

  // Fetch the event
  const event = await prismadb.event.findUnique({
    where: { id: eventIdParsed },
    include: { tickets: true },
  });

  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado.' },
      { status: 404 },
    );
  }

  // Check if the user is the creator of the event (using 'creatorId')
  if (event.creatorId !== userId) {
    return NextResponse.json(
      { error: 'Você não tem permissão para editar este evento.' },
      { status: 403 },
    );
  }

  if (name) {
    const existingEvent = await prismadb.event.findFirst({
      where: { name },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: 'Já existe um evento com esse nome.' },
        { status: 400 },
      );
    }
  }

  // Check if the date is valid and not in the past
  const dateNow = new Date();
  const dateEvent = date ? new Date(date) : null;
  if (dateEvent && dateEvent < dateNow) {
    return NextResponse.json(
      { error: 'A data do evento não pode ser anterior a hoje.' },
      { status: 400 },
    );
  }

  // Check if the event has any tickets sold
  if (event.tickets.length > 0) {
    return NextResponse.json(
      { error: 'Não é possível alterar um evento com ingressos vendidos.' },
      { status: 400 },
    );
  }

  // Update the event (keep the original name unless changed)
  const updatedEvent = await prismadb.event.update({
    where: { id: eventIdParsed },
    data: {
      description,
      date: dateEvent ? dateEvent : event.date,
      location,
      price,
      capacity,
      name: name ?? event.name,
    },
  });

  return NextResponse.json({
    message: 'Evento atualizado com sucesso.',
    event: updatedEvent,
  });
}

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } },
) {
  const { eventId } = await params;

  const eventIdParsed = parseInt(eventId);

  if (isNaN(eventIdParsed)) {
    return NextResponse.json(
      { error: 'ID do evento inválido.' },
      { status: 400 },
    );
  }

  // Fetch the event from the database using the ID without including tickets
  const event = await prismadb.event.findUnique({
    where: { id: eventIdParsed },
  });

  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado.' },
      { status: 404 },
    );
  }

  // Return the found event
  return NextResponse.json(event);
}
