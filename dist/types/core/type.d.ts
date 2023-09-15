import { Progress } from '@aws-sdk/lib-storage';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
export interface ValidSignResult extends Credentials {
    expiration: number;
    accessBucket: string;
    folderPath: string;
    token: string;
}
export interface Credentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
}
export interface ClientUploadParams {
    Key: string;
    Body: StreamingBlobPayloadInputTypes;
    ContentType?: string;
}
export interface PutObjectParams extends ClientUploadParams {
    Bucket: string;
}
export interface UploadResult {
    abort: () => Promise<void>;
    done: () => Promise<{
        cid: string;
    }>;
    progress: (cb?: (e: Progress) => void) => void;
}
export interface ClientConfig {
    pinningServiceUrl: string;
    authServiceUrl: string;
    endpoint: string;
    storageType: 'IPFS' | 'AR';
}
export interface AddPinParams {
    cid: string;
    name?: string;
    origins?: string[];
    meta?: {
        [K in string]: string;
    };
}
export interface PinInfo {
    requestid: string;
    status: string;
    created: string;
    pin: {
        cid: string;
        name?: string;
        origins?: string[];
        meta?: {
            [K in string]: string;
        };
    };
    delegates: string[];
    info?: {
        [K in string]: string;
    };
}
export interface ListPin {
    count: number;
    results: PinInfo[];
}
export interface PinParams {
    cid?: string;
    name?: string;
    status?: string;
    limit?: number;
    before?: string;
    after?: string;
}
