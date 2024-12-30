import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const secretKey = 'secret_key';

const ticketSchema = z.object({
  userId: z.number(),
  eventId: z.number(),
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

  const { userId, eventId } = result.data;

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

  // Check if tickets are available
  const ticketsSold = await prismadb.ticket.count({
    where: { eventId },
  });

  if (ticketsSold >= event.capacity) {
    return NextResponse.json(
      { error: 'Ingressos esgotados.' },
      { status: 400 },
    );
  }

  // Generate the QR code URL
  const qrData = `QR-${eventId}-${userId}-${Date.now()}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

  // Create the ticket
  const ticket = await prismadb.ticket.create({
    data: {
      userId,
      eventId,
      codeQr: qrData, // Store the QR data
      qrCodeUrl, // Store the QR code URL
    },
  });

  // Decrease the event capacity
  await prismadb.event.update({
    where: { id: eventId },
    data: { capacity: event.capacity - 1 },
  });

  return NextResponse.json(ticket, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codeQr = searchParams.get('codigoQr');

  if (codeQr) {
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
        event: true, // Include event information
      },
    });

    return NextResponse.json(tickets);
  }
}
