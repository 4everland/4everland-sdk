import { CompleteMultipartUploadCommandOutput, S3 } from '@aws-sdk/client-s3'
import { Upload, Progress } from '@aws-sdk/lib-storage'
// import { endpoint } from '../api/index'
import { BucketApiError } from '../utils/errors'
import type { Credentials, PutObjectParams, UploadResult } from './type'
class BucketService {
  private instance: S3
  accessToken: string
  credentials: Credentials
  forcePathStyle = false
  region = 'eu-west-2'
  constructor(credentials: Credentials, accessToken: string, endpoint?: string) {
    this.instance = new S3({
      endpoint: endpoint,
      credentials,
      forcePathStyle: this.forcePathStyle,
      region: this.region
    })
    this.credentials = credentials
    this.accessToken = accessToken
  }
  uploadObject(params: PutObjectParams): UploadResult {
    let task: Upload
    try {
      task = new Upload({
        client: this.instance,
        params
      })
    } catch (error: any) {
      throw new BucketApiError('Params Error', 'Params Error')
    }
    return {
      abort: async () => {
        await task.abort()
      },
      done: async () => {
        try {
          const { ETag } = (await task.done()) as CompleteMultipartUploadCommandOutput
          const cid = JSON.parse(ETag!)
          return {
            cid
          }
        } catch (error: any) {
          console.log(error)
          if (error.message == 'Failed to fetch') {
            throw new BucketApiError('NetWord Error', error.message)
          }
          if (error.name == 'AbortError') {
            throw new BucketApiError('Abort Error', 'Upload aborted!')
          }
          throw new BucketApiError('Service Error', 'Service Error')
        }
      },
      progress: (cb?: (e: Progress) => void) => {
        task.on('httpUploadProgress', function (e) {
          if (cb) {
            cb(e)
          }
        })
      }
    }
  }
}
export default BucketService
