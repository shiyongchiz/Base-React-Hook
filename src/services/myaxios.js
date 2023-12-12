import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in',
})
instance.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    return Promise.reject(err);
})

export default instance;