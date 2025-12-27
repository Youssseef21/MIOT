import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1880',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
})

export async function getSensors(){
  const res = await api.get('/api/sensors')
  return res.data
}

export async function getDevices(){
  const res = await api.get('/api/devices')
  return res.data
}

export async function controlDevice(device, action){
  const res = await api.post('/api/control', { device, action })
  return res.data
}

export async function getHistory(){
  const res = await api.get('/api/history')
  return res.data
}

export async function sendIrCode(command){
  const res = await api.post('/api/ir', { command })
  return res.data
}

export default api
