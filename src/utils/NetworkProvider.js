import axios from 'axios';
import { BASE_URL } from '../constants/AppConstants';

const NetworkProvider = axios.create({
	baseURL: BASE_URL,
	timeout:100000
});

NetworkProvider.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default NetworkProvider;