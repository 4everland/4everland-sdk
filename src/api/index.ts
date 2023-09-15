import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

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
        console.log(error, error.message, error.response)
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data)
        }
        return Promise.reject(new Error(error.message))
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

export default Request
