import axios from 'axios';
export async function buyTicket(
  eventId: number,
  ticketType: number,
  quantity: number,
  token: string,
) {
  if (!eventId) {
    throw new Error('ID do evento não fornecido.');
  }

  await axios.post(
    '/api/tickets',
    {
      eventId: Number(eventId),
      ticketType,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
