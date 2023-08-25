import axios from 'axios'
import { AuthApiError } from '../utils/errors'
import { registerApi } from '../api/index'
class AuthApi {
  constructor() {}
  async getSignMessage(address: string) {
    return new Promise<string>((resolve, reject) => {
      axios
        .get<string>(`${registerApi}/auth/${address}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(new AuthApiError('Service Error', error.data || error.message))
        })
    })
  }
  async validSign<T>(address: string, signature: string) {
    return new Promise<T>((resolve, reject) => {
      axios
        .post<T>(`${registerApi}/auth/${address}`, {
          signature
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log(error)
          reject(new AuthApiError('Service Error', error.data || error.message))
        })
    })
  }
}

export default AuthApi
