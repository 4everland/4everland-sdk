import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AuthApiError } from '../utils/errors'
// const isProd = process.env.NODE_ENV === 'production'
// export const pinningServiceApi = isProd
//   ? 'https://api.4everland.dev'
//   : 'https://pinning.foreverland.xyz'
// export const registerApi = isProd ? 'https://b.foreverland.xyz' : 'https://sts-api.foreverland.xyz'
// export const endpoint = isProd ? 'https://endpoint.4everland.co' : 'https://s3gw.foreverland.xyz'

class Request {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (error) => {
        // do something
        if (error.message) {
          return Promise.reject(new Error(error.message))
        }
        return Promise.reject(new AuthApiError('Service Error', error.response))
      }
    )
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }

  get<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  put<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  delete<T>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

// const authRequest = new Request({
//   baseURL: registerApi
// })
// const pinningRequest = new Request({
//   baseURL: pinningServiceApi
// })

// export { authRequest, pinningRequest }
export default Request
