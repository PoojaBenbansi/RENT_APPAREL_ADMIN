import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getAllVendor = () => {
  return axios.get(`${BASE_URL}/vendor`).then((response) => response.data);
};

export const vendorLogin = (payload) => {
  return axios.post(`${BASE_URL}/auth/login`, payload).then((response) => response.data);
};

export const createNewVendor = (payload) => {
  return axios.post(`${BASE_URL}/vendor`, payload).then((response) => response.data);
};

export const updateVendorStatus = (id, status) => {
  return axios.post(`${BASE_URL}/vendor/update_status/${id}`, { status }).then((response) => response.data);
};

export const deleteVendor = (id) => {
  return axios.delete(`${BASE_URL}/vendor/${id}`).then((response) => response.data);
};

export const getVendorDetails = (id) => {
  return axios.get(`${BASE_URL}/vendor/${id}`).then((response) => response.data);
};
