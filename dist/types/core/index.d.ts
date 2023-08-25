import { ValidSignResult } from './type';
declare class Forever {
    private auth;
    private bucket;
    validSignResult: ValidSignResult | null;
    constructor();
    getSignMessage(address: string): Promise<string>;
    validSign(address: string, signature: string): Promise<{
        expiration: number;
    }>;
    upload(Body: File, ContentType?: string): import("./type").UploadResult;
}
export default Forever;
