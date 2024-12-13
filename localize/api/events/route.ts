import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

// Create event
export async function POST(req: Request) {
  const { name, description, date, location, price, capacity } =
    await req.json();

  const dateNow = new Date();
  const dateEvent = new Date(date);

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

  const event = await prismadb.event.create({
    data: {
      name,
      description,
      date: new Date(date),
      location,
      price,
      capacity,
    },
  });

  return NextResponse.json(event, { status: 201 });
}

// Get all events
export async function GET() {
  const events = await prismadb.event.findMany({
    where: { finished: false },
    include: {
      tikets: true,
    },
  });
  return NextResponse.json(events);
}
