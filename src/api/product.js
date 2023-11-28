import axios from "axios";

const API = "https://pastelito-backend.onrender.com/api/v1";

export const orderRequest = (body) => axios.post(`${API}/orderDetail`, body);
