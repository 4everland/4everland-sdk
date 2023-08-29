import type { Credentials, PutObjectParams, UploadResult } from './type';
declare class BucketService {
    private instance;
    accessToken: string;
    credentials: Credentials;
    forcePathStyle: boolean;
    region: string;
    constructor(credentials: Credentials, accessToken: string, endpoint?: string);
    uploadObject(params: PutObjectParams): UploadResult;
}
export default BucketService;
