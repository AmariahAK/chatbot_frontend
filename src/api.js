// chatbot_frontend/src/api/api.js

import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers here if needed
  },
});

// Example API function to fetch data
export const fetchData = async () => {
  try {
    const response = await api.get('/data-endpoint'); // Replace with your actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error; // Rethrow the error to handle it at the component level
  }
};

// Example API function to post data
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}`, error);
    throw error;
  }
};

// Export api instance for custom usage if needed
export default api;
