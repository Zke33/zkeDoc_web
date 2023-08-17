import axios from "axios";
import {Message} from "@arco-design/web-vue";

export const useAxios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

useAxios.interceptors.request.use((config) => {
    config.headers["token"] = "1234"
    return config
})


useAxios.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data
    }
    console.log("接口错误", response.statusText)
    Message.error(response.statusText)
    return Promise.reject(response.statusText)
    return response.data
}, (error) => {
    Message.error(error.message)
    console.log("服务错误", error)
    return Promise.reject(error)
})