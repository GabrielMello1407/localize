/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prismadb from '@/lib/prismadb';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

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
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export async function POST(req: Request) {
  const { name, description, date, location, price, capacity } =
    await req.json();

  const dateNow = new Date();
  const dateEvent = new Date(date);

  // Check if the event date is before the current date
  if (dateEvent < dateNow) {
    return NextResponse.json(
      { error: 'A data do evento não pode ser anterior a hoje.' },
      { status: 400 },
    );
  }

  if (!name || !description || !date || !location || !price || !capacity) {
    return NextResponse.json(
      { error: 'Todos os campos são obrigatórios.' },
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
    return NextResponse.json(
      { error: 'Já existe um evento com esse nome em andamento.' },
      { status: 400 },
    );
  }

  // Get the ID of the authenticated user
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json(
      { error: 'Usuário não autenticado.' },
      { status: 401 },
    );
  }

  // Create the event and associate it with the logged in user
  const event = await prismadb.event.create({
    data: {
      name,
      description,
      date: new Date(date),
      location,
      price,
      capacity,
      creatorId: userId,
    },
  });

  return NextResponse.json(event, { status: 201 });
}

// Get all events
export async function GET() {
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

  // Search for all events that are still ongoing

  const events = await prismadb.event.findMany({
    where: { finished: false },
    include: {
      tickets: true,
    },
  });

  return NextResponse.json(events);
}
