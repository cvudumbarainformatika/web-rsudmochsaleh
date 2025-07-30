import { boot } from 'quasar/wrappers'
import axios from 'axios'
// import { getLocalToken } from 'src/modules/storage'
import { useAuthStore } from 'src/stores/auth'
import { notifErr } from 'src/modules/utils'
import { setCssVar } from 'quasar'


const SERV = 'https://rsudmochsaleh.my.id'
const SERVER = SERV + '/api'

const api = axios.create({ baseURL: SERVER })
const api2 = axios.create({ baseURL: 'https://xenter.my.id' })
// const api2 = axios.create({ baseURL: 'http://36.89.103.117:3555' });
api.defaults.headers.get.Accepts = 'application/json'
api2.defaults.headers.get.Accepts = 'application/json'

// Inisialisasi Authorization hanya di klien
if (!process.env.SERVER) {
  const auth = useAuthStore()
  const token = auth.token || null
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

/* Response Interceptors */
const interceptResErrors = (err) => {
  // Hanya panggil notifErr di klien
  if (!process.env.SERVER) {
    try {
      console.log('interceptorResponse :', err)
      notifErr(err.response)
    } catch (e) {
      console.log('1. catch', e)
    }
  }
  return Promise.reject(err)
}

const interceptResponse = (res) => {
  try {
    return Promise.resolve(res)
  } catch (e) {
    console.log('2. catch interceptResponse', res)
    return Promise.resolve(res)
  }
}

api.interceptors.response.use(interceptResponse, interceptResErrors)
api2.interceptors.response.use(interceptResponse, interceptResErrors)

/* Request Interceptors */
const interceptReqErrors = (err) => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

const pathImg = SERV + '/storage/'
const pathFotoSimrs = 'http://36.89.103.114:4542/simpeg/foto/'

const getApp = async () => {
  try {
    const resp = await api.get('/v1/header')
    const themes = resp.data.themes
    for (let i = 0; i < themes.length; i++) {
      setCssVar(themes[i].name, themes[i].value)
    }
  } catch (err) {
    console.error('getApp error:', err)
  }
}

export default boot(({ app }) => {
  // Jalankan getApp hanya di klien
  if (!process.env.SERVER) {
    getApp()
  }

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$SERV = SERVER
  app.config.globalProperties.$api = api
  app.config.globalProperties.$api2 = api2
  app.config.globalProperties.$pathImg = pathImg
  app.config.globalProperties.$pathFotoSimrs = pathFotoSimrs
})

const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

const deleteToken = () => {
  delete api.defaults.headers.common.Authorization
}

export { axios, api, pathImg, setToken, deleteToken, SERVER, SERV, api2, pathFotoSimrs }
