export const calculateTotalRevenue = (ticketTypes: any[]) => {
  return ticketTypes.reduce((sum, ticket) => {
    return sum + (ticket.sold || 0) * (ticket.price || 0);
  }, 0);
};

export const calculateTotalExpectedRevenue = (ticketTypes: any[]) => {
  return ticketTypes.reduce((sum, ticket) => {
    return sum + (ticket.capacity || 0) * (ticket.price || 0);
  }, 0);
};
