import { Progress } from '@aws-sdk/lib-storage'
import { StreamingBlobPayloadInputTypes } from '@smithy/types'

export interface ValidSignResult extends Credentials {
  expiration: number
  accessBucket: string
  folderPath: string
  token: string
}

export interface Credentials {
  accessKeyId: string
  secretAccessKey: string
  sessionToken: string
}

export interface ForeverUploadParams {
  Key: string
  Body: StreamingBlobPayloadInputTypes
  ContentType?: string
}
export interface PutObjectParams extends ForeverUploadParams {
  Bucket: string
}

export interface UploadResult {
  abort: () => Promise<void>
  done: () => Promise<{ cid: string }>
  progress: (cb?: (e: Progress) => void) => void
}

export interface ForeverConfig {
  pinningServiceUrl: string
  authServiceUrl: string
  endpoint: string
  storageType: 'IPFS' | 'AR'
}
