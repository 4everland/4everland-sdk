import { HeadObjectCommandOutput } from '@aws-sdk/client-s3';
import { Configuration, Progress } from '@aws-sdk/lib-storage';
interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
}
interface PutObjectParams {
    Bucket: string;
    Key: string;
    Body: File;
    ContentType?: string;
}
interface UploadResult {
    abort: () => Promise<void>;
    done: () => Promise<HeadObjectCommandOutput | undefined>;
    progress: ((cb?: (e: Progress) => void) => void) | undefined;
}
declare class Forever {
    endpoint: string;
    forcePathStyle: boolean;
    private instance;
    region: string;
    constructor(credentials: Credentials);
    listBuckets(): Promise<import("@aws-sdk/client-s3").ListBucketsCommandOutput>;
    uploadObject(params: PutObjectParams, configura?: Configuration): UploadResult;
}
export default Forever;
