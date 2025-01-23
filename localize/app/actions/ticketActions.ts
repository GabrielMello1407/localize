export async function buyTicket(
  userId: number,
  eventId: number,
  ticketType: string,
  token: string,
) {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, eventId, ticketType }),
  });

  if (!response.ok) {
    throw new Error('Erro ao comprar ingresso.');
  }

  return response.json();
}

export async function fetchUserTickets(token: string) {
  const response = await fetch('/api/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar ingressos.');
  }

  return response.json();
}
