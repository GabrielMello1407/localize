import axios from 'axios';

export const signupUser = async (data: any) => {
  try {
    const response = await axios.post('/api/users', {
      action: 'signup',
      ...data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await axios.post('/api/users', {
      action: 'login',
      ...data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response;
  } catch (error) {
    throw error;
  }
};
