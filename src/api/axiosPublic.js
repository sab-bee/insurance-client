import axios from 'axios'

export const axiosPublic = axios.create({
  baseURL: 'http://192.168.1.105:3000'
})