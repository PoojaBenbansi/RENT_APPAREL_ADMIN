import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllVendor = () => {
  return axios.get(`${BASE_URL}/vendor`).then((response) => response.data);
};

export const createNewVendor = (payload) => {
  return axios.post(`${BASE_URL}/vendor`, payload).then((response) => response.data);
};
