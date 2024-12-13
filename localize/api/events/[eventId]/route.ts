import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const eventId = parseInt(params.id);

  // Find events
  const event = await prismadb.event.findUnique({
    where: { id: eventId },
    include: { tikets: true },
  });

  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado.' },
      { status: 404 },
    );
  }

  // Check if event have tickets sell.
  if (event.tikets.length > 0) {
    return NextResponse.json(
      { error: 'Não é possível encerrar um evento com ingressos vendidos.' },
      { status: 400 },
    );
  }

  // Finish Event
  const eventFinished = await prismadb.event.update({
    where: { id: eventId },
    data: { finished: true },
  });

  return NextResponse.json({
    message: 'Evento encerrado com sucesso.',
    event: eventFinished,
  });
}
