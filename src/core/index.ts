import AuthService from './auth'
import BucketService from './bucket'
import { ValidSignResult, Gateways } from './type'
import { BucketApiError } from '../utils/errors'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'
import PinningService from './pinning'
class Forever {
  auth: AuthService
  bucket?: BucketService
  validSignResult?: ValidSignResult
  gateways: Gateways
  pinningService: PinningService
  constructor(gateways: Gateways) {
    this.gateways = gateways
    this.auth = new AuthService(this.gateways.authServiceUrl)
    this.pinningService = new PinningService(this.gateways.pinningServiceUrl)
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
          const { accessKeyId, secretAccessKey, sessionToken, token } = this.validSignResult
          this.bucket = new BucketService(
            {
              accessKeyId,
              secretAccessKey,
              sessionToken
            },
            token,
            this.gateways.endpoint
          )
          resolve({
            expiration: this.validSignResult.expiration
          })
        })
        .catch(reject)
    })
  }
  upload(body: StreamingBlobPayloadInputTypes, fileName: string, contentType?: string) {
    if (!this.validSignResult) {
      throw new BucketApiError('Operation Error', 'You must execution validaSign function')
    }
    return this.bucket!.uploadObject({
      Bucket: this.validSignResult.accessBucket,
      Key: this.validSignResult.folderPath
        ? this.validSignResult.folderPath + '/' + fileName
        : fileName,
      Body: body,
      ContentType: contentType
    })
  }
  pinning(cid: string, name: string) {
    if (!this.validSignResult) {
      throw new Error('execution error')
    }
    return this.pinningService.pinning(cid, name, this.validSignResult!.token)
  }
}

export default Forever
