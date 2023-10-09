import axios from "axios";

const API = "http://localhost:3000/api/v1";

export const registerRequest = (user) => axios.post(`${API}/users`, user);

export const loginRequest = (user) => axios.post(`${API}/auth/login`, user);

export const changePasswordRequest = (user) => axios.put(`${API}/APICHANGE`, user);//change API URL

export const productsRequest = () => axios.get(`${API}/products`);

export const recoverPasswordRequest = (email) => axios.post(`${API}/auth/recovery`, email);
