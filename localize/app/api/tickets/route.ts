import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import QRCode from 'qrcode';

const secretKey = process.env.JWT_SECRET as string;

const ticketSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
  ticketType: z.string(),
});

// Extract userId from JWT token
async function getUserIdFromRequest(req: Request): Promise<number | null> {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    interface JwtPayload {
      userId: number;
    }
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded.userId;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = ticketSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { userId, eventId, ticketType } = result.data;

  // Authentication token validation
  const authenticatedUserId = await getUserIdFromRequest(req);
  if (!authenticatedUserId) {
    return NextResponse.json(
      { error: 'Usuário não autenticado.' },
      { status: 401 },
    );
  }

  // Check if the event exists
  const event = await prismadb.event.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    return NextResponse.json(
      { error: 'Evento não encontrado.' },
      { status: 404 },
    );
  }

  // Check if the authenticated user is the creator of the event
  if (event.creatorId === authenticatedUserId) {
    return NextResponse.json(
      {
        error:
          'O dono do evento não pode comprar ingressos para seu próprio evento.',
      },
      { status: 400 },
    );
  }

  // Check if the ticket type is valid for the event
  const eventTicketType = await prismadb.eventTicketType.findFirst({
    where: { eventId, type: ticketType },
  });

  if (!eventTicketType) {
    return NextResponse.json(
      { error: 'Tipo de ingresso inválido para este evento.' },
      { status: 400 },
    );
  }

  // Check if tickets are available for the specific type
  const ticketsSold = await prismadb.ticket.count({
    where: { eventId, ticketType },
  });

  if (ticketsSold >= eventTicketType.capacity) {
    return NextResponse.json(
      { error: 'Ingressos esgotados para este tipo.' },
      { status: 400 },
    );
  }

  // Generate the QR code token
  const qrData = jwt.sign({ eventId, userId, ticketType }, secretKey, {
    expiresIn: '1h',
  });
  const qrCodeUrl = await QRCode.toDataURL(qrData);

  // Create the ticket
  const ticket = await prismadb.ticket.create({
    data: {
      userId,
      eventId,
      ticketType,
      codeQr: qrData,
      qrCodeUrl,
    },
  });

  // Decrease the event capacity using a transaction
  await prismadb.$transaction([
    prismadb.event.update({
      where: { id: eventId },
      data: { capacity: { decrement: 1 } },
    }),
  ]);

  return NextResponse.json(ticket, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codeQr = searchParams.get('codigoQr');

  if (codeQr) {
    try {
      const decoded = jwt.verify(codeQr, secretKey) as {
        eventId: number;
        userId: number;
        ticketType: string;
      };

      // Check if the event exists and is valid
      const event = await prismadb.event.findUnique({
        where: { id: decoded.eventId },
      });

      if (!event) {
        return NextResponse.json(
          { error: 'Evento não encontrado.' },
          { status: 404 },
        );
      }

      // Check if the event has started or ended
      const currentTime = new Date();
      const eventStartTime = new Date(event.date);
      if (currentTime < eventStartTime) {
        return NextResponse.json(
          { error: 'Evento ainda não começou.' },
          { status: 400 },
        );
      }

      // Check if the ticket exists
      const ticket = await prismadb.ticket.findUnique({
        where: { codeQr },
        include: {
          event: true, // Include event information for additional validation
        },
      });

      if (!ticket) {
        return NextResponse.json(
          { error: 'Ticket não encontrado.' },
          { status: 404 },
        );
      }

      // Check if the ticket has already been used
      if (ticket.used) {
        return NextResponse.json(
          { error: 'Ticket já utilizado.' },
          { status: 400 },
        );
      }

      // Update the status to used
      await prismadb.ticket.update({
        where: { id: ticket.id },
        data: { used: true },
      });

      return NextResponse.json({
        message: 'Entrada autorizada!',
        event: ticket.event,
      });
    } catch (error) {
      return NextResponse.json({ error: 'QR Code inválido.' }, { status: 400 });
    }
  } else {
    // Authentication token validation
    const authenticatedUserId = await getUserIdFromRequest(req);
    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado.' },
        { status: 401 },
      );
    }

    // Retrieve all tickets for the authenticated user
    const tickets = await prismadb.ticket.findMany({
      where: { userId: authenticatedUserId },
      include: {
        event: true,
      },
    });

    return NextResponse.json(tickets);
  }
}
