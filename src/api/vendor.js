import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllVendor = () => {
  return axios.get(`${BASE_URL}/vendor`).then((response) => response.data);
};
