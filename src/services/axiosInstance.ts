import axios from 'axios';

// Update this single variable to switch between local and production server
export const BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
