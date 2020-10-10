import axios from 'axios';

const DOMAIN_API = "https://car-api-supervisely.herokuapp.com"

const api = axios.create({
    baseURL: '',
})
export const PREDICT = DOMAIN_API + "/image/predict"
export default api;