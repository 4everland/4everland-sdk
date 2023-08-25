import axios from 'axios'
import { CompleteMultipartUploadCommandOutput, S3 } from '@aws-sdk/client-s3'
import { Upload, Progress } from '@aws-sdk/lib-storage'
import { pinningServiceApi, endpoint } from '../api/index'
import { AuthApiError, BucketApiError } from '../utils/errors'
import type { Credentials, PutObjectParams, UploadResult } from './type'

class BucketApi {
  private instance: S3
  accessToken: string
  credentials: Credentials
  endpoint = endpoint
  forcePathStyle = false
  region = 'eu-west-2'
  constructor(credentials: Credentials, accessToken: string) {
    this.instance = new S3({
      endpoint: this.endpoint,
      credentials,
      forcePathStyle: this.forcePathStyle,
      region: this.region
    })
    this.credentials = credentials
    this.accessToken = accessToken
  }
  uploadObject(params: PutObjectParams): UploadResult
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
          await this.pinning(cid, cid, this.accessToken)
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

  private async pinning(cid: string, name: string, accessToken: string) {
    try {
      await axios({
        method: 'POST',
        url: pinningServiceApi + '/pins',
        data: {
          cid,
          name
        },
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })
    } catch (error) {
      console.log(error)
      throw new AuthApiError('Service Error', 'Service Error')
    }
  }
}
export default BucketApi
