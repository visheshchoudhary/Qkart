import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

const api = axios.create({
  baseURL: `${BACKEND_URL}/verse`,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export const getProducts = async () => {
  const response = await api.get('/products')
  return response.data
}

export const getCart = async () => {
  const response = await api.get('/cart')
  return response.data
}

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/cart', { productId, quantity })
  return response.data
}

export const updateCart = async (productId: string, quantity: number) => {
  const response = await api.put('/cart', { productId, quantity })
  return response.data
}

export const checkout = async () => {
  const response = await api.put('/cart/checkout')
  return response.data
}

export const updateAddress = async (userId: string, address: string) => {
  const response = await api.put(`/users/${userId}`, { address })
  return response.data
} 