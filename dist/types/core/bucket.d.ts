import type { Credentials, PutObjectParams, UploadResult } from './type';
declare class BucketService {
    private instance;
    credentials: Credentials;
    forcePathStyle: boolean;
    region: string;
    constructor(credentials: Credentials, endpoint?: string);
    uploadObject(params: PutObjectParams): UploadResult;
}
export default BucketService;
