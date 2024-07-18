import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Include credentials in all requests
});

// Example API function to fetch data
export const fetchData = async () => {
  try {
    const response = await api.get('/'); // Base URL is already set in axios instance
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error; // Rethrow the error to handle it at the component level
  }
};

// Example API function to post data with credentials
export const postDataWithCredentials = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data); // Credentials included by default in axios instance
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}`, error);
    throw error;
  }
};

// Export api instance for custom usage if needed
export default api;
