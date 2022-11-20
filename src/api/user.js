import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/user`).then((response) => response.data);
};

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/user/${id}`).then((response) => response.data);
};
