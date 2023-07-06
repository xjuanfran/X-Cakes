import axios from "axios";

const API = "http://localhost:3000/api/v1";

export const orderRequest = (body) => axios.post(`${API}/orderDetail`, body);
