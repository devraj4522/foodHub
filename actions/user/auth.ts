import axios, { AxiosError } from 'axios';

export const generateOTP = async (phone: string, email: string) => {
  try {
    const response = await axios.post('/api/user/login/generateOtp', { phone, email });
    if (response.statusText === 'OK') {
      return response.data;
    } else {
      throw new Error(response.data.error || 'Failed to generate OTP');
    }
  } catch (error) {
    if (error instanceof AxiosError) {

      throw new Error(error.response?.data.error || 'Failed to generate OTP');
    }
    throw error;
  }
};

export const verifyOTP = async (phone: string, otp: string) => {
  try {
    const response = await axios.post('/api/user/login/verifyOtp', { phone, otp });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error || 'Failed to verify OTP');
    }
    throw error;
  }
};

export const verifyToken = async () => {
  const response = await axios.get('/api/user/login/verifytoken');
  return response.data;
};

