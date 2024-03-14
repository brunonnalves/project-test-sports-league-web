import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const Rest = {
  get: async (url, config) => {
    const response = await axiosInstance.get(url, config);

    return handleResponse(response);
  },
  setToken: (token) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

const handleResponse = (response) => ({
  data: response.data,
  status: response.status,
});

export default Rest;
