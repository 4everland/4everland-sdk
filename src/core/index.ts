import AuthApi from './auth'
import BucketApi from './bucket'
import { ValidSignResult } from './type'
import { BucketApiError } from '../utils/errors'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'

class Forever {
  private auth: AuthApi
  private bucket: BucketApi | null
  validSignResult: ValidSignResult | null
  constructor() {
    this.auth = new AuthApi()
    this.bucket = null
    this.validSignResult = null
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
          this.bucket = new BucketApi(
            {
              accessKeyId,
              secretAccessKey,
              sessionToken
            },
            token
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
}

export default Forever
