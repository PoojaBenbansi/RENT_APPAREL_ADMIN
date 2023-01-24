import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllBrands = () => {
  return axios.get(`${BASE_URL}/brand`).then((response) => response.data);
};