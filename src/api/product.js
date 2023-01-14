import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const createProduct = (data) => {
    return axios.post(`${BASE_URL}/product`, data).then((response) => response.data);
};