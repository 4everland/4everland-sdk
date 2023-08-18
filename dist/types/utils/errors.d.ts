import { ErrorBase } from './error-base';
type UploadErrorName = 'ACCESSDENIED' | 'RESOURCE_FULL' | 'RESOURCE_EXPIRED';
export declare class UploadError extends ErrorBase<UploadErrorName> {
}
export {};
