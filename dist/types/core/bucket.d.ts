import type { Credentials, PutObjectParams, UploadResult } from './type';
declare class BucketApi {
    private instance;
    accessToken: string;
    credentials: Credentials;
    endpoint: string;
    forcePathStyle: boolean;
    region: string;
    constructor(credentials: Credentials, accessToken: string);
    uploadObject(params: PutObjectParams): UploadResult;
    private pinning;
}
export default BucketApi;
