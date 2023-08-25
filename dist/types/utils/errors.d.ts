import { ErrorBase } from './error-base';
type BaseErrorName = 'Service Error';
type AuthApiErrorName = BaseErrorName;
type BucketApiErrorName = BaseErrorName;
export declare class AuthApiError extends ErrorBase<AuthApiErrorName> {
}
export declare class BucketApiError extends ErrorBase<BucketApiErrorName> {
}
export {};
