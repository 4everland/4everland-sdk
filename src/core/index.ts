import AuthService from './auth'
import BucketService from './bucket'
import { ValidSignResult, ForeverConfig, ForeverUploadParams } from './type'
import PinningService from './pinning'
class Forever {
  auth: AuthService
  bucket?: BucketService
  validSignResult?: ValidSignResult
  config: ForeverConfig
  pinningService: PinningService
  constructor(config: ForeverConfig) {
    this.config = config
    this.auth = new AuthService(this.config.authServiceUrl)
    this.pinningService = new PinningService(this.config.pinningServiceUrl)
  }

  getSignMessage(address: string) {
    return this.auth.getSignMessage(address)
  }
  async validSign(address: string, signature: string) {
    return new Promise<{ expiration: number }>((resolve, reject) => {
      this.auth
        .validSign<ValidSignResult>(address, signature)
        .then((res) => {
          this.validSignResult = res
          const { accessKeyId, secretAccessKey, sessionToken } = this.validSignResult
          this.bucket = new BucketService(
            {
              accessKeyId,
              secretAccessKey,
              sessionToken
            },
            this.config.endpoint
          )
          resolve({
            expiration: this.validSignResult.expiration
          })
        })
        .catch(reject)
    })
  }
  upload(params: ForeverUploadParams) {
    if (!this.validSignResult) {
      throw new Error('execution error')
    }
    return this.bucket!.uploadObject({
      ...params,
      Bucket: this.validSignResult.accessBucket,
      Key: this.validSignResult.folderPath
        ? this.validSignResult.folderPath + '/' + params.Key
        : params.Key
    })
  }
  pinning(cid: string) {
    if (!this.validSignResult) {
      throw new Error('execution error')
    }
    return this.pinningService.pinning(cid, '4EVERLAND', this.validSignResult!.token)
  }
}

export default Forever
