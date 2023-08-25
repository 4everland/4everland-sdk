import { ErrorBase } from './error-base'
type BaseErrorName = 'Service Error' | 'NetWord Error'
type AuthApiErrorName = BaseErrorName
type BucketApiErrorName = BaseErrorName | 'Abort Error' | 'Operation Error' | 'Params Error'
export class AuthApiError extends ErrorBase<AuthApiErrorName> {}
export class BucketApiError extends ErrorBase<BucketApiErrorName> {}
