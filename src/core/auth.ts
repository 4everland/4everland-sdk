import { verifySignResult } from './type'
import Request from '../api'
class AuthClient {
  baseURL: string
  request: Request
  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.request = new Request({
      baseURL: baseURL
    })
  }
  async getSignText(address: string) {
    return this.request.get<string>({
      url: `/auth/${address}`
    })
  }
  async verifySign(address: string, signature: string) {
    return this.request.post<verifySignResult>({
      url: `/auth/${address}`,
      data: { signature }
    })
  }
}

export default AuthClient
