import axios from "axios";

const API = "http://localhost:3000/api/v1"; //API URL from backend server

export const registerRequest = (user) => axios.post(`${API}/users`, user);

export const loginRequest = (user) => axios.post(`${API}/auth/login`, user);

export const productsRequest = () => axios.get(`${API}/products`);

export const recoverPasswordRequest = (email) => axios.post(`${API}/auth/recovery`, email);

export const resetPasswordRequest = (data) => axios.post(`${API}/auth/change-password`, data); //Data in this case corresponds to the token and the new password for the user account that is going to be updated
