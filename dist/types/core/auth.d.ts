import Request from '../api';
declare class AuthService {
    baseUrl: string;
    request: Request;
    constructor(baseUrl: string);
    getSignMessage(address: string): Promise<string>;
    validSign<T>(address: string, signature: string): Promise<T>;
}
export default AuthService;
