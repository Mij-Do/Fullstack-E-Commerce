import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_API_URL_DEVE
        : import.meta.env.VITE_API_URL_PROD;

console.log(import.meta.env.VITE_API_URL_DEVE);
console.log(import.meta.env.VITE_API_URL_PROD);
console.log(import.meta.env.MODE);


export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
});