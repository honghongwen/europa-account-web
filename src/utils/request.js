import axios from "axios";
import store from "../store";

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

service.interceptors.request.use(config => {
  config.headers['token'] = 'TEMP_TOKEN'
  return config
}), error => {
    console.log(error)
    Promise.reject(error)
}


export default service