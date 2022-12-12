import axios from 'axios'

export const axiosPublic = axios.create({
  // baseURL: 'https://insurance-server-production.up.railway.app' || 'http://192.168.1.105:3000'
  baseURL: 'http://192.168.1.105:3000'
})