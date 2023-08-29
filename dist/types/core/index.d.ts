import AuthService from './auth';
import BucketService from './bucket';
import { ValidSignResult, Gateways } from './type';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import PinningService from './pinning';
declare class Forever {
    auth: AuthService;
    bucket?: BucketService;
    validSignResult?: ValidSignResult;
    gateways: Gateways;
    pinningService: PinningService;
    constructor(gateways: Gateways);
    getSignMessage(address: string): Promise<string>;
    validSign(address: string, signature: string): Promise<{
        expiration: number;
    }>;
    upload(body: StreamingBlobPayloadInputTypes, fileName: string, contentType?: string): import("./type").UploadResult;
    pinning(cid: string, name: string): Promise<void>;
}
export default Forever;
