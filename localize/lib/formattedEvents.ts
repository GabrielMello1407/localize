export const formatEvents = (events: any[]) => {
  return events.map((event) => ({
    ...event,
    formattedDate: new Date(event.date).toLocaleDateString(),
    formattedTime: new Date(event.date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
};
