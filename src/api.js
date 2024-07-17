import axios from 'axios';

const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL', // Replace with your API base URL
});

export const fetchData = async () => {
  try {
    const response = await api.get('/data-endpoint'); // Replace with your endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};