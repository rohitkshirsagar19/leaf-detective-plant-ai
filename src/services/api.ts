
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    if (response.data.status !== 'API is running') {
      throw new Error('API is not running');
    }
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw new Error('Failed to connect to backend API');
  }
};

export const predictDisease = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000, // 30 second timeout for prediction
    });
    return response.data;
  } catch (error: any) {
    console.error('Prediction failed:', error);
    if (error.response) {
      const errorMessage = error.response.data?.error || 'Prediction failed';
      throw new Error(errorMessage);
    }
    throw new Error('Failed to connect to backend API');
  }
};
