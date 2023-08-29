import Request from '../api'
class PinningService {
  baseUrl: string
  request: Request
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.request = new Request({
      baseURL: baseUrl
    })
  }

  async pinning(cid: string, name: string, accessToken: string) {
    return this.request.post<void>({
      url: '/pins',
      data: {
        cid,
        name
      },
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
  }
}

export default PinningService
