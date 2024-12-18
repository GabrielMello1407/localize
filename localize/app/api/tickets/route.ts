import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, eventId } = await req.json();

  // Validação de dados
  if (!userId || !eventId) {
    return NextResponse.json(
      { error: 'Usuário e evento são obrigatórios.' },
      { status: 400 },
    );
  }

  // Verificar se o evento existe
  const event = await prismadb.event.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado.' },
      { status: 404 },
    );
  }

  // Verificar se há ingressos disponíveis
  const ticketsSold = await prismadb.ticket.count({
    where: { eventId },
  });

  if (ticketsSold >= event.capacity) {
    return NextResponse.json(
      { error: 'Ingressos esgotados.' },
      { status: 400 },
    );
  }

  // Criar o ingresso
  const ticket = await prismadb.ticket.create({
    data: {
      userId,
      eventId,
      codeQr: `QR-${eventId}-${userId}-${Date.now()}`, // Código QR único
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codeQr = searchParams.get('codigoQr');

  if (!codeQr) {
    return NextResponse.json(
      { error: 'Código QR é obrigatório.' },
      { status: 400 },
    );
  }

  // Verificar se o ingresso existe
  const ticket = await prismadb.ticket.findUnique({
    where: { codeQr },
    include: {
      event: true, // Inclui informações do evento para validação adicional
    },
  });

  if (!ticket) {
    return NextResponse.json(
      { error: 'Ticket não encontrado.' },
      { status: 404 },
    );
  }

  // Verificar se o ingresso já foi usado
  if (ticket.used) {
    return NextResponse.json(
      { error: 'Ticket já utilizado.' },
      { status: 400 },
    );
  }

  // Atualizar o status para utilizado
  await prismadb.ticket.update({
    where: { id: ticket.id },
    data: { used: true },
  });

  return NextResponse.json({
    message: 'Entrada autorizada!',
    event: ticket.event,
  });
}
