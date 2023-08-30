import AuthService from './auth';
import BucketService from './bucket';
import { ValidSignResult, ForeverConfig, ForeverUploadParams } from './type';
import PinningService from './pinning';
declare class Forever {
    auth: AuthService;
    bucket?: BucketService;
    validSignResult?: ValidSignResult;
    config: ForeverConfig;
    pinningService: PinningService;
    constructor(config: ForeverConfig);
    getSignMessage(address: string): Promise<string>;
    validSign(address: string, signature: string): Promise<{
        expiration: number;
    }>;
    upload(params: ForeverUploadParams): import("./type").UploadResult;
    pinning(cid: string, name: string): Promise<void>;
}
export default Forever;
