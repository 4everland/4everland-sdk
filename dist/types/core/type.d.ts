import { Progress } from '@aws-sdk/lib-storage';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
export interface ValidSignResult extends Credentials {
    expiration: number;
    accessBucket: string;
    folderPath: string;
    token: string;
}
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
}
export interface PutObjectParams {
    Bucket: string;
    Key: string;
    Body: StreamingBlobPayloadInputTypes;
    ContentType?: string;
}
export interface UploadResult {
    abort: () => Promise<void>;
    done: () => Promise<{
        cid: string | undefined;
    }>;
    progress: (cb?: (e: Progress) => void) => void;
}
