import AuthService from './auth'
import BucketService from './bucket'
import { ValidSignResult, ClientConfig, ClientUploadParams, PinParams, AddPinParams } from './type'
import PinningService from './pinning'
class Client {
  auth: AuthService
  bucket?: BucketService
  validSignResult?: ValidSignResult
  config: ClientConfig
  pinningService?: PinningService
  constructor(config: ClientConfig) {
    this.config = config
    this.auth = new AuthService(this.config.authServiceUrl)
  }

  getSignText(address: string) {
    return this.auth.getSignText(address)
  }
  async verifySign(address: string, signature: string) {
    return new Promise<{ expiration: number }>((resolve, reject) => {
      this.auth
        .verifySign<ValidSignResult>(address, signature)
        .then((res) => {
          this.validSignResult = res
          const { accessKeyId, secretAccessKey, sessionToken, token } = this.validSignResult
          this.bucket = new BucketService(
            {
              accessKeyId,
              secretAccessKey,
              sessionToken
            },
            this.config.endpoint
          )
          this.pinningService = new PinningService(this.config.pinningServiceUrl, token)

          resolve({
            expiration: this.validSignResult.expiration
          })
        })
        .catch(reject)
    })
  }
  upload(params: ClientUploadParams) {
    if (!this.validSignResult || !this.bucket) {
      throw new Error('execution error')
    }
    return this.bucket.uploadObject({
      ...params,
      Bucket: this.validSignResult.accessBucket,
      Key: this.validSignResult.folderPath
        ? this.validSignResult.folderPath + '/' + params.Key
        : params.Key
    })
  }
  addPin(addPin: AddPinParams) {
    if (!this.validSignResult || !this.pinningService) {
      throw new Error('execution error')
    }
    return this.pinningService.addPin(addPin)
  }
  getPin(requestid: string) {
    if (!this.validSignResult || !this.pinningService) {
      throw new Error('execution error')
    }
    return this.pinningService.getPin(requestid)
  }
  listPin(params: PinParams) {
    if (!this.validSignResult || !this.pinningService) {
      throw new Error('execution error')
    }
    return this.pinningService.listPin(params)
  }
}

export default Client
