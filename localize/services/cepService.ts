import axios from 'axios';

export const fetchCepData = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error('CEP inválido.');
  }
};
