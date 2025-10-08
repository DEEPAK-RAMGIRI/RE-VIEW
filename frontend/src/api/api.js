import axios from 'axios';

const API_BASE_URL =  process.env.REACT_APP_API_URL;
const PORT = process.env.PORT;

const api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : `http://localhost:${PORT}`,
});

export default api;

export const getData = () => api.get('/review');

export const postData = (formData, secretKey) => {
    const config = {
    headers: { 'x-admin-key': secretKey }
  };
  return api.post('/review', formData, config);
};

export const deleteData = (dataID, secretKey) => {
  const config = {
    headers: { 'x-admin-key': secretKey }
  };
  return api.delete(`/review/${dataID}`, config);
};