import { ErrorBase } from './error-base'
type BaseErrorName = 'Service Error'
type AuthApiErrorName = BaseErrorName
type BucketApiErrorName = BaseErrorName
export class AuthApiError extends ErrorBase<AuthApiErrorName> {}
export class BucketApiError extends ErrorBase<BucketApiErrorName> {}
