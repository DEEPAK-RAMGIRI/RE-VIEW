import axios from 'axios';

const PORT = process.env.PORT;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
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