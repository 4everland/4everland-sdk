import type { PutObjectParams, UploadResult } from './type';
interface BucketClientParams {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    endpoint: string;
}
declare class BucketClient {
    private instance;
    constructor(params: BucketClientParams);
    uploadObject(params: PutObjectParams): UploadResult;
}
export default BucketClient;
