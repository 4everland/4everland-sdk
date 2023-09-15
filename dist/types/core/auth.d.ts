import Request from '../api';
declare class AuthService {
    baseUrl: string;
    request: Request;
    constructor(baseUrl: string);
    getSignText(address: string): Promise<string>;
    verifySign<T>(address: string, signature: string): Promise<T>;
}
export default AuthService;
