import axios from "axios";

const API = "http://localhost:3000/api/v1";
const APICLOUDINARY = "https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload"

export const orderRequest = (body) => axios.post(`${API}/orderDetail`, body);
export const createCakeRequest = (body) => axios.post(`${API}/products`, body);
export const reqCloudinary= (FormData) => axios.post(`${APICLOUDINARY}`, FormData)
