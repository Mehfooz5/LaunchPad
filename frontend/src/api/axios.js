import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth', // adjust if needed
  withCredentials: true, // for sending/receiving cookies (like jwt)
});

export default API;
