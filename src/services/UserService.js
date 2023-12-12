import axios from './myaxios';
const fetAllUser = (id) => {
    return axios.get(`/api/users?page=${id}`)
}
const postCreateUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })
}
export { fetAllUser, postCreateUser };