import axios from 'axios'


const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

if(localStorage.getItem('token')) {
    api.defaults.headers.common['authorization'] = 'token'
}


export default api