import { ValidSignResult } from './type';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
declare class Forever {
    private auth;
    private bucket;
    validSignResult: ValidSignResult | null;
    constructor();
    getSignMessage(address: string): Promise<string>;
    validSign(address: string, signature: string): Promise<{
        expiration: number;
    }>;
    upload(body: StreamingBlobPayloadInputTypes, fileName: string, contentType?: string): import("./type").UploadResult;
}
export default Forever;
