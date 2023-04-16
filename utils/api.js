import axios from "axios";
import config from '../config/config'

export const publicAPI = axios.create({
    baseURL:config.backendPort
});
