import { S3, HeadObjectCommandOutput } from '@aws-sdk/client-s3'
import { Upload, Configuration, Progress } from '@aws-sdk/lib-storage'
import { UploadError } from './errors'
interface Credentials {
  accessKeyId: string
  secretAccessKey: string
  sessionToken?: string
}

interface PutObjectParams {
  Bucket: string
  Key: string
  Body: File
  ContentType?: string
}

interface UploadResult {
  abort: () => Promise<void>
  done: () => Promise<HeadObjectCommandOutput | undefined>
  progress: ((cb?: (e: Progress) => void) => void) | undefined
}

class Forever {
  endpoint = 'https://s3gw.foreverland.xyz'
  forcePathStyle = false
  private instance: S3
  region = 'eu-west-2'
  constructor(credentials: Credentials) {
    this.instance = new S3({
      endpoint: this.endpoint,
      credentials,
      forcePathStyle: this.forcePathStyle,
      region: this.region
    })
  }
  async listBuckets() {
    try {
      const data = await this.instance.listBuckets({})
      return data
    } catch (error: any) {
      throw new UploadError('ACCESSDENIED', 1, error.message)
    }
  }
  uploadObject(params: PutObjectParams, configura?: Configuration): UploadResult {
    let task: Upload
    try {
      task = new Upload({
        client: this.instance,
        params,
        ...configura
      })
    } catch (error: any) {
      return {
        abort: async () => {},
        done: async () => {
          throw error
        },
        progress: undefined
      }
    }
    return {
      abort: async () => {
        await task.abort()
      },
      done: async () => {
        try {
          await task.done()
          return await this.instance.headObject({ Bucket: params.Bucket, Key: params.Key })
        } catch (error: any) {
          console.log(error, '======', error.message)
          if (error) {
            throw new UploadError('ACCESSDENIED', 1, error.message)
          }
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
// new(task, err)
export default Forever
