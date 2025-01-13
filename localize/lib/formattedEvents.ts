export const formatEvents = (events: any[]) => {
  if (!Array.isArray(events)) {
    console.error('Invalid events data:', events);
    throw new TypeError('Expected an array of events');
  }
  return events.map((event) => ({
    ...event,
    formattedDate: new Date(event.date).toLocaleDateString(),
    formattedTime: new Date(event.date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));
};
