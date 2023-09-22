import { verifySignResult } from './type';
import Request from '../api';
declare class AuthClient {
    baseURL: string;
    request: Request;
    constructor(baseURL: string);
    getSignText(address: string): Promise<string>;
    verifySign(address: string, signature: string): Promise<verifySignResult>;
}
export default AuthClient;
