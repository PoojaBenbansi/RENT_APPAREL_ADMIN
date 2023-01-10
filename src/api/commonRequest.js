import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export function getStates() {
  const requestURL = `${BASE_URL}/states`;
  return axios.get(requestURL).then((response) => response?.data);
}

export function getCities(state_id) {
  const requestURL = `${BASE_URL}/${state_id}/cities`;
  return axios.get(requestURL).then((response) => response?.data);
}
