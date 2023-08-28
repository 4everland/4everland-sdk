import { authRequest } from '../api'
class AuthApi {
  constructor() {}
  async getSignMessage(address: string) {
    return authRequest.get<string>({
      url: `/auth/${address}`
    })
  }
  async validSign<T>(address: string, signature: string) {
    return authRequest.post<T>({
      url: `/auth/${address}`,
      data: { signature }
    })
  }
}

export default AuthApi
