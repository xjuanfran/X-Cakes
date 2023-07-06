import axios from "axios";

const API = "https://pastelito-backend.onrender.com/api/v1";

export const registerRequest = (user) => axios.post(`${API}/users`, user);

export const loginRequest = (user) => axios.post(`${API}/auth/login`, user);

export const productsRequest = () => axios.get(`${API}/products`);
