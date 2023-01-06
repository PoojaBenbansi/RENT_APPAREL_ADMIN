import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllCategories = () => {
  return axios.get(`${BASE_URL}/category`).then((response) => response.data);
};

export const updateCateroryStatus = (id, status) => {
  return axios.put(`${BASE_URL}/category/update_status/${id}`, { status }).then((response) => response.data);
};

export const deleteCategory = (id) => {
  return axios.delete(`${BASE_URL}/category/${id}`).then((response) => response.data);
};

export const addNewCategory = (data) => {
  return axios.post(`${BASE_URL}/category`, data).then((response) => response.data);
};
export const updateCategory = (data, id) => {
  return axios.put(`${BASE_URL}/category/${id}`, data).then((response) => response.data);
};
