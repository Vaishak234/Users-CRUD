import axios from 'axios'


export default axios.create({
    baseURL: 'https://users-crud-backend-xaaj.onrender.com/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials:true
})
