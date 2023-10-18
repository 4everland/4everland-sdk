import { CompleteMultipartUploadCommandOutput, S3 } from '@aws-sdk/client-s3'
import { Upload, Progress } from '@4everland/s3-lib-storage'

import type { PutObjectParams, UploadResult } from './type'

interface BucketClientParams {
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
  endpoint: string
}
class BucketClient {
  private instance: S3
  constructor(params: BucketClientParams) {
    this.instance = new S3({
      endpoint: params.endpoint,
      credentials: {
        accessKeyId: params.accessKeyId,
        secretAccessKey: params.secretAccessKey,
        sessionToken: params.sessionToken
      },
      forcePathStyle: false,
      region: 'eu-west-2'
    })
  }
  uploadObject(params: PutObjectParams): UploadResult {
    let task: Upload
    try {
      task = new Upload({
        client: this.instance,
        params
      })
    } catch (error: any) {
      throw new Error('params error')
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
            throw new Error('network error!')
          }
          if (error.name == 'AbortError') {
            throw new Error('upload aborted!')
          }
          throw error
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
export default BucketClient
