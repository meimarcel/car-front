import axios from 'axios';

const DOMAIN_API = "http://localhost:8000"

const api = axios.create({
    baseURL: '',
})
export const PREDICT = DOMAIN_API + "/image/predictGif"
export default api;