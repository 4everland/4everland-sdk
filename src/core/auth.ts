import Request from '../api'
class AuthService {
  baseUrl: string
  request: Request
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.request = new Request({
      baseURL: baseUrl
    })
  }
  async getSignMessage(address: string) {
    return this.request.get<string>({
      url: `/auth/${address}`
    })
  }
  async validSign<T>(address: string, signature: string) {
    return this.request.post<T>({
      url: `/auth/${address}`,
      data: { signature }
    })
  }
}

export default AuthService
