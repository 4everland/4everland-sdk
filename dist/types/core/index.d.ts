import AuthService from './auth';
import BucketService from './bucket';
import { ValidSignResult, ClientConfig, ClientUploadParams, PinParams, AddPinParams } from './type';
import PinningService from './pinning';
declare class Client {
    auth: AuthService;
    bucket?: BucketService;
    validSignResult?: ValidSignResult;
    config: ClientConfig;
    pinningService?: PinningService;
    constructor(config: ClientConfig);
    getSignText(address: string): Promise<string>;
    verifySign(address: string, signature: string): Promise<{
        expiration: number;
    }>;
    upload(params: ClientUploadParams): import("./type").UploadResult;
    addPin(addPin: AddPinParams): Promise<import("./type").PinInfo>;
    getPin(requestid: string): Promise<import("./type").PinInfo>;
    listPin(params: PinParams): Promise<import("./type").ListPin>;
}
export default Client;
