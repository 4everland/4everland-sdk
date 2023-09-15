import Request from '../api'
import { ListPin, PinParams, AddPinParams, PinInfo } from './type'

class PinningService {
  baseUrl: string
  accessToken: string
  request: Request
  constructor(baseUrl: string, accessToken: string) {
    this.baseUrl = baseUrl
    this.accessToken = accessToken
    this.request = new Request({
      baseURL: baseUrl
    })
  }

  async addPin(addPin: AddPinParams) {
    return this.request.post<PinInfo>({
      url: '/pins',
      data: addPin,
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    })
  }
  async getPin(requestid: string) {
    return this.request.get<PinInfo>({
      url: '/pins/' + requestid,
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    })
  }

  async listPin(params: PinParams) {
    return this.request.get<ListPin>({
      url: '/pins',
      params: {
        match: 'partial',
        status: 'queued,pinned,pinning,failed',
        ...params
      },
      headers: {
        Authorization: 'Bearer ' + this.accessToken
      }
    })
  }
}

export default PinningService
