import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mail-project.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
})

// Add a request interceptor to add the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor to handle CORS errors
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error('CORS or Network Error:', error)
    }
    return Promise.reject(error)
  }
)

export default instance 