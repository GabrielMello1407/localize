import axios from 'axios';

export const fetchEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching event:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Erro ao carregar evento.');
  }
};

export const fetchEventsByName = async (txtName: string) => {
  if (!txtName) {
    throw new Error('Nome do evento não fornecido.');
  }

  try {
    const response = await axios.get(`/api/events/${txtName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Erro ao carregar eventos.');
  }
};
