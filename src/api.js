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
    const response = await api.get('/api/data'); // Adjust endpoint based on your backend routes
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

// Example API function to update data
export const updateData = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/data/${id}`, updatedData); // Adjust endpoint and payload as needed
    return response.data;
  } catch (error) {
    console.error(`Error updating data with ID ${id}`, error);
    throw error;
  }
};

// Example API function to delete data
export const deleteData = async (id) => {
  try {
    const response = await api.delete(`/api/data/${id}`); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    console.error(`Error deleting data with ID ${id}`, error);
    throw error;
  }
};

// Example API function for user authentication (login, logout, etc.)
export const authenticateUser = async (credentials) => {
  try {
    const response = await api.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Error authenticating user", error);
    throw error;
  }
};

// Example API function for user logout
export const logoutUser = async () => {
  try {
    const response = await api.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error("Error logging out user", error);
    throw error;
  }
};

// Export api instance for custom usage if needed
export default api;
