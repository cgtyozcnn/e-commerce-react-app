import axios from 'axios'


const instance = axios.create({
    baseURL:"http://localhost:5001/e-commerce-fe731/us-central1/api"
})

export default instance