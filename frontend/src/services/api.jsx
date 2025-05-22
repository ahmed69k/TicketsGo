import axios from 'axios'

const api = axios.create({
    baseURL: `https://se-project-kappa.vercel.app/api/v1`,
    withCredentials: true,
})

export default api